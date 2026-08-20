import json
import os
import subprocess

def run():
    print("Generating Low...")
    subprocess.run(["python", "scratch_python_mcq_low.py"], check=True)
    print("Generating Medium...")
    subprocess.run(["python", "scratch_python_mcq_medium.py"], check=True)
    print("Generating High...")
    subprocess.run(["python", "scratch_python_mcq_high.py"], check=True)

    with open("scratch/python_mcq_low.json", "r") as f:
        low = json.load(f)
    with open("scratch/python_mcq_medium.json", "r") as f:
        medium = json.load(f)
    with open("scratch/python_mcq_high.json", "r") as f:
        high = json.load(f)

    all_questions = low + medium + high

    # Validate counts
    print(f"Total questions generated: {len(all_questions)}")
    assert len(all_questions) == 510, f"Expected 510, got {len(all_questions)}"

    # Validate duplicates
    seen_q = set()
    for q in all_questions:
        if q['question'] in seen_q:
            print(f"Duplicate found: {q['question']}")
        seen_q.add(q['question'])

    print(f"Unique questions: {len(seen_q)}")
    assert len(seen_q) == 510, "Duplicates found!"

    # Validate topic counts
    topics = {}
    for q in all_questions:
        topics[q['topic']] = topics.get(q['topic'], 0) + 1
    
    for t, count in topics.items():
        assert count == 30, f"Topic '{t}' has {count} questions, expected 30."

    with open("src/data/pythonQuestions.json", "w") as f:
        json.dump(all_questions, f, indent=2)

    print("Success! Wrote 510 unique Python questions to src/data/pythonQuestions.json.")

if __name__ == "__main__":
    run()
