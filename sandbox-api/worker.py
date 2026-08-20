import subprocess
import tempfile
import os
import shutil
import time
from typing import Dict, Any, Tuple

# In production, these images would be pre-built with the necessary environment
DOCKER_IMAGES = {
    "Python": "python:3.10-slim",
    "Java": "openjdk:17-slim",
    "C++": "gcc:12",
    "JavaScript": "node:18-slim"
}

def check_docker() -> bool:
    try:
        subprocess.run(["docker", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def build_docker_cmd(workdir: str, lang: str, file_name: str, input_file: str) -> list[str]:
    """
    Builds a secure docker run command.
    """
    image = DOCKER_IMAGES.get(lang)
    if not image:
        raise ValueError(f"Unsupported language: {lang}")

    # Security flags
    cmd = [
        "docker", "run", "--rm",
        "-i", # Interactive (to pass stdin if needed, though we mount input_file)
        "--network", "none", # Disable network
        "--memory", "256m", # Memory limit
        "--cpus", "1", # CPU limit
        "--pids-limit", "64", # Process limit
        "--read-only", # Read-only root filesystem
        "--tmpfs", "/tmp", # Ephemeral temp space
        "--user", "1000:1000", # Non-root user
        "-v", f"{workdir}:/workspace", # Mount workspace
        "-w", "/workspace", # Set working dir
    ]
    
    cmd.append(image)
    
    # Language-specific execution
    if lang == "Python":
        cmd.extend(["sh", "-c", f"python {file_name} < {input_file}"])
    elif lang == "Java":
        # Assuming the file is named Main.java
        cmd.extend(["sh", "-c", f"javac {file_name} && java Main < {input_file}"])
    elif lang == "C++":
        cmd.extend(["sh", "-c", f"g++ -O2 {file_name} -o program && ./program < {input_file}"])
    elif lang == "JavaScript":
        cmd.extend(["sh", "-c", f"node {file_name} < {input_file}"])
        
    return cmd

def run_code_in_sandbox(language: str, code: str, custom_input: str, timeout_sec: int = 5) -> Dict[str, Any]:
    """
    Executes code inside a secure Docker sandbox.
    """
    if not check_docker():
        # Fallback for development environments without Docker
        return _run_code_local_fallback(language, code, custom_input, timeout_sec)

    # 1. Create ephemeral workspace
    workdir = tempfile.mkdtemp(prefix="sandbox_")
    
    # 2. Write code and input
    file_exts = {"Python": "py", "Java": "java", "C++": "cpp", "JavaScript": "js"}
    ext = file_exts.get(language, "txt")
    
    file_name = f"Main.{ext}" if language == "Java" else f"solution.{ext}"
    code_path = os.path.join(workdir, file_name)
    input_path = os.path.join(workdir, "input.txt")
    
    with open(code_path, "w", encoding="utf-8") as f:
        f.write(code)
    
    with open(input_path, "w", encoding="utf-8") as f:
        f.write(custom_input)

    # 3. Build docker command
    try:
        cmd = build_docker_cmd(workdir, language, file_name, "input.txt")
    except ValueError as e:
        shutil.rmtree(workdir, ignore_errors=True)
        return {"stdout": "", "stderr": str(e), "exitCode": 1, "executionMs": 0, "memoryKb": 0}

    # 4. Execute with timeout
    start_time = time.time()
    stdout = ""
    stderr = ""
    exit_code = -1
    
    try:
        # Use subprocess.run to invoke docker
        process = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout_sec,
            text=True
        )
        stdout = process.stdout
        stderr = process.stderr
        exit_code = process.returncode
    except subprocess.TimeoutExpired:
        stderr = f"Execution timed out after {timeout_sec} seconds."
        exit_code = 124 # Common timeout exit code
    except Exception as e:
        stderr = f"Sandbox execution failed: {str(e)}"
        exit_code = 1
    finally:
        # 5. Cleanup workspace
        shutil.rmtree(workdir, ignore_errors=True)
        
    exec_time_ms = int((time.time() - start_time) * 1000)
    
    return {
        "stdout": stdout,
        "stderr": stderr,
        "exitCode": exit_code,
        "executionMs": exec_time_ms,
        "memoryKb": 0 # Memory tracking requires cgroup analysis not implemented here
    }

def _run_code_local_fallback(language: str, code: str, custom_input: str, timeout_sec: int = 5) -> Dict[str, Any]:
    """
    INSECURE FALLBACK for local testing when Docker is not available.
    Do NOT use in production.
    """
    start_time = time.time()
    workdir = tempfile.mkdtemp(prefix="sandbox_fallback_")
    
    file_exts = {"Python": "py", "Java": "java", "C++": "cpp", "JavaScript": "js"}
    ext = file_exts.get(language, "txt")
    
    file_name = f"Main.{ext}" if language == "Java" else f"solution.{ext}"
    code_path = os.path.join(workdir, file_name)
    input_path = os.path.join(workdir, "input.txt")
    
    with open(code_path, "w", encoding="utf-8") as f:
        f.write(code)
    
    with open(input_path, "w", encoding="utf-8") as f:
        f.write(custom_input)
        
    cmd = []
    if language == "Python":
        cmd = ["python", code_path]
    elif language == "JavaScript":
        cmd = ["node", code_path]
    elif language == "Java":
        # Need to compile first
        comp = subprocess.run(["javac", code_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if comp.returncode != 0:
            shutil.rmtree(workdir, ignore_errors=True)
            return {"stdout": "", "stderr": comp.stderr, "exitCode": comp.returncode, "executionMs": int((time.time() - start_time) * 1000), "memoryKb": 0}
        cmd = ["java", "-cp", workdir, "Main"]
    elif language == "C++":
        out_bin = os.path.join(workdir, "program.exe" if os.name == "nt" else "program")
        comp = subprocess.run(["g++", code_path, "-o", out_bin], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if comp.returncode != 0:
            shutil.rmtree(workdir, ignore_errors=True)
            return {"stdout": "", "stderr": comp.stderr, "exitCode": comp.returncode, "executionMs": int((time.time() - start_time) * 1000), "memoryKb": 0}
        cmd = [out_bin]

    stdout = ""
    stderr = ""
    exit_code = -1
    
    try:
        with open(input_path, "r") as stdin_f:
            process = subprocess.run(
                cmd,
                stdin=stdin_f,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=timeout_sec,
                text=True
            )
        stdout = process.stdout
        stderr = process.stderr
        exit_code = process.returncode
    except subprocess.TimeoutExpired:
        stderr = f"Execution timed out after {timeout_sec} seconds."
        exit_code = 124
    except Exception as e:
        stderr = f"Fallback execution failed: {str(e)}"
        exit_code = 1
    finally:
        shutil.rmtree(workdir, ignore_errors=True)
        
    exec_time_ms = int((time.time() - start_time) * 1000)
    
    return {
        "stdout": stdout,
        "stderr": stderr,
        "exitCode": exit_code,
        "executionMs": exec_time_ms,
        "memoryKb": 0
    }
