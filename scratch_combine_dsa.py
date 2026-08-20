import json
import os

def combine_and_validate():
    files = [
        "scratch/db_python.json",
        "scratch/db_java.json",
        "scratch/db_cpp.json",
        "scratch/db_js.json"
    ]
    
    all_qs = []
    for f in files:
        if os.path.exists(f):
            with open(f, 'r') as file:
                qs = json.load(file)
                all_qs.extend(qs)
        else:
            print(f"Missing file: {f}")
            
    print(f"Total questions generated: {len(all_qs)}")
    
    # Validation
    lang_count = {}
    diff_count = {}
    titles = set()
    duplicates = 0
    
    for q in all_qs:
        l = q['language']
        d = q['difficulty']
        lang_count[l] = lang_count.get(l, 0) + 1
        diff_count[d] = diff_count.get(d, 0) + 1
        if q['title'] in titles:
            print(f"DUPLICATE TITLE: {q['title']} in {l}")
            duplicates += 1
        titles.add(q['title'])
        
    print("Language breakdown:", lang_count)
    print("Difficulty breakdown:", diff_count)
    print("Duplicates:", duplicates)
    
    # write to src
    if len(all_qs) == 120 and duplicates == 0:
        with open("src/data/codingQuestions.json", "w") as out:
            json.dump(all_qs, out, indent=2)
        print("Successfully wrote 120 unique questions to src/data/codingQuestions.json")
    else:
        print("Validation failed, did not write.")

if __name__ == "__main__":
    combine_and_validate()
