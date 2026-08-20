from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import time
import os
import json
from worker import run_code_in_sandbox

app = FastAPI(title="SkillBridge Sandbox API")

class RunRequest(BaseModel):
    language: str
    code: str
    customInput: str
    
class SubmitRequest(BaseModel):
    language: str
    code: str
    questionId: str
    userId: str

# Load questions from JSON
QUESTIONS_DB = []
QUESTIONS_DB_DICT = {}

def load_questions():
    global QUESTIONS_DB, QUESTIONS_DB_DICT
    json_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "codingQuestions.json")
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            QUESTIONS_DB = json.load(f)
            QUESTIONS_DB_DICT = {q["id"]: q for q in QUESTIONS_DB}
    except Exception as e:
        print(f"Failed to load questions database: {e}")

load_questions()

@app.get("/api/interview/coding/questions")
def get_questions(language: str = None, difficulty: str = None, category: str = None):
    filtered = QUESTIONS_DB
    if language:
        filtered = [q for q in filtered if q.get("language", "").lower() == language.lower()]
    if difficulty:
        filtered = [q for q in filtered if q.get("difficulty", "").lower() == difficulty.lower()]
    if category:
        filtered = [q for q in filtered if q.get("category", "").lower() == category.lower()]
        
    # Return light versions without test cases and solution
    result = []
    for q in filtered:
        q_copy = {k: v for k, v in q.items() if k not in ("testCases", "solution")}
        result.append(q_copy)
    return {"questions": result}

@app.get("/api/interview/coding/questions/{question_id}")
def get_question(question_id: str):
    q = QUESTIONS_DB_DICT.get(question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    q_copy = {k: v for k, v in q.items() if k not in ("testCases", "solution")}
    return q_copy

@app.post("/api/interview/coding/run")
def run_code(req: RunRequest):
    return run_code_in_sandbox(req.language, req.code, req.customInput)

@app.post("/api/interview/coding/submit")
def submit_code(req: SubmitRequest):
    q = QUESTIONS_DB_DICT.get(req.questionId)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
        
    test_cases = q.get("testCases", [])
    if not test_cases:
        return {
            "status": "ERROR",
            "passedTests": 0,
            "totalTests": 0,
            "score": 0,
            "executionMs": 0,
            "memoryKb": 0,
            "compileError": "",
            "runtimeError": "No test cases configured."
        }
        
    passed_tests = 0
    total_execution_ms = 0
    max_memory_kb = 0
    
    first_failure = None
    
    for i, test in enumerate(test_cases):
        input_data = test.get("input", "")
        expected_output = str(test.get("expectedOutput", "")).strip()
        
        result = run_code_in_sandbox(req.language, req.code, input_data)
        total_execution_ms += result["executionMs"]
        max_memory_kb = max(max_memory_kb, result.get("memoryKb", 0))
        
        if result["exitCode"] != 0:
            return {
                "status": "RUNTIME_ERROR" if not first_failure else "FAILED",
                "passedTests": passed_tests,
                "totalTests": len(test_cases),
                "score": int((passed_tests / len(test_cases)) * 100),
                "executionMs": total_execution_ms,
                "memoryKb": max_memory_kb,
                "compileError": "",
                "runtimeError": result["stderr"],
                "failedTestCase": i
            }
            
        actual_output = str(result["stdout"]).strip()
        if actual_output == expected_output:
            passed_tests += 1
        else:
            if not first_failure:
                first_failure = {
                    "testCase": i,
                    "expected": expected_output,
                    "actual": actual_output
                }
                
    status = "PASSED" if passed_tests == len(test_cases) else "FAILED"
    score = int((passed_tests / len(test_cases)) * 100)
    
    response = {
        "status": status,
        "passedTests": passed_tests,
        "totalTests": len(test_cases),
        "score": score,
        "executionMs": total_execution_ms,
        "memoryKb": max_memory_kb,
        "compileError": "",
        "runtimeError": ""
    }
    
    if first_failure:
        response["failedTestCaseDetails"] = first_failure
        
    return response

@app.get("/api/interview/coding/submissions")
def get_submissions():
    return {"submissions": []}

@app.get("/api/interview/coding/progress")
def get_progress():
    return {"progress": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
