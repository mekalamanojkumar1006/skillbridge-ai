import json

def generate_cpp_questions():
    questions = []
    
    # ------------------ LOW (10) ------------------
    # 1. Max of Three
    questions.append({
        "id": "CPP-DSA-L01", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "Max of Three",
        "problem": "Find the maximum of three integers.",
        "inputFormat": "Three space-separated integers.",
        "outputFormat": "Print max.",
        "constraints": ["-10^9 <= A,B,C <= 10^9"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    long long a, b, c;\n    if(cin >> a >> b >> c) cout << max({a, b, c}) << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "1 5 3", "expectedOutput": "5"},
            {"input": "-1 -2 -3", "expectedOutput": "-1"},
            {"input": "0 0 0", "expectedOutput": "0"},
            {"input": "100 500 200", "expectedOutput": "500"},
            {"input": "5 5 2", "expectedOutput": "5"}
        ],
        "sampleInput": "1 5 3", "sampleOutput": "5",
        "explanation": "5 is largest.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })
    
    # 2. Swap Two Variables
    questions.append({
        "id": "CPP-DSA-L02", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "Swap Two Variables",
        "problem": "Swap two variables without using a third variable. Output the swapped values.",
        "inputFormat": "Two integers A B.",
        "outputFormat": "Print B A.",
        "constraints": ["-10^5 <= A,B <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b;\n    if(cin >> a >> b) { a=a+b; b=a-b; a=a-b; cout << a << \" \" << b << endl; }\n    return 0;\n}",
        "testCases": [
            {"input": "5 10", "expectedOutput": "10 5"},
            {"input": "-5 5", "expectedOutput": "5 -5"},
            {"input": "0 0", "expectedOutput": "0 0"},
            {"input": "123 456", "expectedOutput": "456 123"},
            {"input": "-1 -2", "expectedOutput": "-2 -1"}
        ],
        "sampleInput": "5 10", "sampleOutput": "10 5",
        "explanation": "Swapped.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })
    
    # 3. Sum of Digits
    questions.append({
        "id": "CPP-DSA-L03", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "Sum of Digits",
        "problem": "Find the sum of digits of a given integer N.",
        "inputFormat": "N.",
        "outputFormat": "Sum of digits.",
        "constraints": ["1 <= N <= 10^18"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if(cin >> s) {\n        int sum = 0;\n        for(char c: s) sum += (c - '0');\n        cout << sum << endl;\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "12345", "expectedOutput": "15"},
            {"input": "999", "expectedOutput": "27"},
            {"input": "1", "expectedOutput": "1"},
            {"input": "1000", "expectedOutput": "1"},
            {"input": "9876", "expectedOutput": "30"}
        ],
        "sampleInput": "123", "sampleOutput": "6",
        "explanation": "1+2+3=6",
        "timeComplexity": "O(log N)", "spaceComplexity": "O(1)"
    })
    
    # 4. Check Prime
    questions.append({
        "id": "CPP-DSA-L04", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "Check Prime",
        "problem": "Check if N is a prime number.",
        "inputFormat": "N.",
        "outputFormat": "Print 'Prime' or 'Not Prime'.",
        "constraints": ["1 <= N <= 10^9"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    long long n;\n    if(cin >> n) {\n        if(n<=1) { cout << \"Not Prime\\n\"; return 0; }\n        for(long long i=2; i*i<=n; i++) {\n            if(n%i==0) { cout << \"Not Prime\\n\"; return 0; }\n        }\n        cout << \"Prime\\n\";\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "7", "expectedOutput": "Prime"},
            {"input": "10", "expectedOutput": "Not Prime"},
            {"input": "1", "expectedOutput": "Not Prime"},
            {"input": "2", "expectedOutput": "Prime"},
            {"input": "97", "expectedOutput": "Prime"}
        ],
        "sampleInput": "7", "sampleOutput": "Prime",
        "explanation": "Prime check.",
        "timeComplexity": "O(sqrt(N))", "spaceComplexity": "O(1)"
    })
    
    # 5. Is Leap Year
    questions.append({
        "id": "CPP-DSA-L05", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "Is Leap Year",
        "problem": "Check if year Y is a leap year.",
        "inputFormat": "Y.",
        "outputFormat": "Print 'True' or 'False'.",
        "constraints": ["1000 <= Y <= 9999"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    int y;\n    if(cin >> y) {\n        if((y%4==0 && y%100!=0) || (y%400==0)) cout << \"True\\n\";\n        else cout << \"False\\n\";\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "2020", "expectedOutput": "True"},
            {"input": "2021", "expectedOutput": "False"},
            {"input": "1900", "expectedOutput": "False"},
            {"input": "2000", "expectedOutput": "True"},
            {"input": "2024", "expectedOutput": "True"}
        ],
        "sampleInput": "2020", "sampleOutput": "True",
        "explanation": "Divisible by 4, not 100, unless 400.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })
    
    # 6. Reverse String
    questions.append({
        "id": "CPP-DSA-L06", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Strings", "title": "Reverse String In Place",
        "problem": "Reverse a string in place. (Print the reversed string).",
        "inputFormat": "String.",
        "outputFormat": "Reversed string.",
        "constraints": ["1 <= len <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    if(cin >> s) { reverse(s.begin(), s.end()); cout << s << endl; }\n    return 0;\n}",
        "testCases": [
            {"input": "hello", "expectedOutput": "olleh"},
            {"input": "a", "expectedOutput": "a"},
            {"input": "ab", "expectedOutput": "ba"},
            {"input": "racecar", "expectedOutput": "racecar"},
            {"input": "xyz", "expectedOutput": "zyx"}
        ],
        "sampleInput": "hello", "sampleOutput": "olleh",
        "explanation": "Built-in reverse or two pointers.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 7. Find ASCII Value
    questions.append({
        "id": "CPP-DSA-L07", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Strings", "title": "Find ASCII Value",
        "problem": "Find the ASCII value of a given character.",
        "inputFormat": "One char.",
        "outputFormat": "Integer ASCII.",
        "constraints": ["Valid ASCII character"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    char c;\n    if(cin >> c) cout << (int)c << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "A", "expectedOutput": "65"},
            {"input": "a", "expectedOutput": "97"},
            {"input": "0", "expectedOutput": "48"},
            {"input": "Z", "expectedOutput": "90"},
            {"input": "z", "expectedOutput": "122"}
        ],
        "sampleInput": "A", "sampleOutput": "65",
        "explanation": "Direct cast.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })
    
    # 8. Remove Vowels
    questions.append({
        "id": "CPP-DSA-L08", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Strings", "title": "Remove Vowels",
        "problem": "Remove all vowels from a string.",
        "inputFormat": "String.",
        "outputFormat": "String without vowels.",
        "constraints": ["1 <= len <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s, ans=\"\";\n    if(cin >> s) {\n        for(char c: s) {\n            char l = tolower(c);\n            if(l!='a'&&l!='e'&&l!='i'&&l!='o'&&l!='u') ans += c;\n        }\n        cout << ans << endl;\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "hello", "expectedOutput": "hll"},
            {"input": "apple", "expectedOutput": "ppl"},
            {"input": "AEIOU", "expectedOutput": ""},
            {"input": "xyz", "expectedOutput": "xyz"},
            {"input": "a", "expectedOutput": ""}
        ],
        "sampleInput": "hello", "sampleOutput": "hll",
        "explanation": "Vowels removed.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })
    
    # 9. GCD
    questions.append({
        "id": "CPP-DSA-L09", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "GCD of Two Numbers",
        "problem": "Find Greatest Common Divisor of A and B.",
        "inputFormat": "A B.",
        "outputFormat": "GCD.",
        "constraints": ["1 <= A,B <= 10^9"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nlong long gcd(long long a, long long b) { return b==0?a:gcd(b, a%b); }\nint main() {\n    long long a,b;\n    if(cin >> a >> b) cout << gcd(a,b) << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "10 15", "expectedOutput": "5"},
            {"input": "7 13", "expectedOutput": "1"},
            {"input": "100 10", "expectedOutput": "10"},
            {"input": "24 36", "expectedOutput": "12"},
            {"input": "1 1", "expectedOutput": "1"}
        ],
        "sampleInput": "10 15", "sampleOutput": "5",
        "explanation": "Euclidean.",
        "timeComplexity": "O(log(min(A,B)))", "spaceComplexity": "O(1)"
    })
    
    # 10. LCM
    questions.append({
        "id": "CPP-DSA-L10", "category": "DSA", "language": "C++", "difficulty": "Low",
        "topic": "Math", "title": "LCM of Two Numbers",
        "problem": "Find Least Common Multiple of A and B.",
        "inputFormat": "A B.",
        "outputFormat": "LCM.",
        "constraints": ["1 <= A,B <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nlong long gcd(long long a, long long b) { return b==0?a:gcd(b, a%b); }\nint main() {\n    long long a,b;\n    if(cin >> a >> b) cout << (a*b)/gcd(a,b) << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4 6", "expectedOutput": "12"},
            {"input": "7 13", "expectedOutput": "91"},
            {"input": "10 15", "expectedOutput": "30"},
            {"input": "100 10", "expectedOutput": "100"},
            {"input": "1 1", "expectedOutput": "1"}
        ],
        "sampleInput": "4 6", "sampleOutput": "12",
        "explanation": "LCM = A*B / GCD",
        "timeComplexity": "O(log(min(A,B)))", "spaceComplexity": "O(1)"
    })

    # ------------------ MEDIUM (10) ------------------
    # 1. Container With Most Water
    questions.append({
        "id": "CPP-DSA-M01", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Two Pointers", "title": "Container With Most Water",
        "problem": "Find two lines that together with x-axis form a container holding the most water.",
        "inputFormat": "N. N heights.",
        "outputFormat": "Max Area.",
        "constraints": ["2 <= n <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> h(n);\n    for(int i=0; i<n; i++) cin>>h[i];\n    int l=0, r=n-1, maxA=0;\n    while(l<r) {\n        maxA = max(maxA, min(h[l], h[r]) * (r-l));\n        if(h[l]<h[r]) l++;\n        else r--;\n    }\n    cout << maxA << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "9\n1 8 6 2 5 4 8 3 7", "expectedOutput": "49"},
            {"input": "2\n1 1", "expectedOutput": "1"},
            {"input": "3\n4 3 2", "expectedOutput": "4"},
            {"input": "4\n1 2 1 2", "expectedOutput": "3"},
            {"input": "5\n10 1 1 1 10", "expectedOutput": "40"}
        ],
        "sampleInput": "9\n1 8 6 2 5 4 8 3 7", "sampleOutput": "49",
        "explanation": "Standard 2-pointer.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 2. Sort Colors
    questions.append({
        "id": "CPP-DSA-M02", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Two Pointers", "title": "Sort Colors",
        "problem": "Sort array of 0, 1, and 2 in place.",
        "inputFormat": "N. Array.",
        "outputFormat": "Sorted array.",
        "constraints": ["1 <= n <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> a(n);\n    for(int i=0; i<n; i++) cin>>a[i];\n    int l=0, curr=0, r=n-1;\n    while(curr<=r) {\n        if(a[curr]==0) { swap(a[curr], a[l]); l++; curr++; }\n        else if(a[curr]==2) { swap(a[curr], a[r]); r--; }\n        else curr++;\n    }\n    for(int x: a) cout << x << \" \";\n    cout << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "6\n2 0 2 1 1 0", "expectedOutput": "0 0 1 1 2 2 "},
            {"input": "3\n2 0 1", "expectedOutput": "0 1 2 "},
            {"input": "1\n0", "expectedOutput": "0 "},
            {"input": "4\n1 1 1 1", "expectedOutput": "1 1 1 1 "},
            {"input": "5\n2 2 0 0 1", "expectedOutput": "0 0 1 2 2 "}
        ],
        "sampleInput": "6\n2 0 2 1 1 0", "sampleOutput": "0 0 1 1 2 2 ",
        "explanation": "Dutch national flag.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 3. Find Peak Element
    questions.append({
        "id": "CPP-DSA-M03", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Binary Search", "title": "Find Peak Element",
        "problem": "Find index of any peak element (strictly greater than neighbors).",
        "inputFormat": "N. Array.",
        "outputFormat": "Index.",
        "constraints": ["1 <= n <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> a(n);\n    for(int i=0; i<n; i++) cin>>a[i];\n    int l=0, r=n-1;\n    while(l<r) {\n        int mid=l+(r-l)/2;\n        if(a[mid]>a[mid+1]) r=mid;\n        else l=mid+1;\n    }\n    cout << l << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4\n1 2 3 1", "expectedOutput": "2"},
            {"input": "7\n1 2 1 3 5 6 4", "expectedOutput": "5"},
            {"input": "1\n10", "expectedOutput": "0"},
            {"input": "3\n1 2 3", "expectedOutput": "2"},
            {"input": "3\n3 2 1", "expectedOutput": "0"}
        ],
        "sampleInput": "4\n1 2 3 1", "sampleOutput": "2",
        "explanation": "Binary search.",
        "timeComplexity": "O(log N)", "spaceComplexity": "O(1)"
    })
    
    # 4. Intersection of Two Arrays
    questions.append({
        "id": "CPP-DSA-M04", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Hashing", "title": "Intersection of Two Arrays",
        "problem": "Return unique intersection of two arrays.",
        "inputFormat": "N M. N ints. M ints.",
        "outputFormat": "Space-separated intersection (sorted).",
        "constraints": ["1 <= n,m <= 10^4"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\nint main() {\n    int n,m; if(!(cin>>n>>m)) return 0;\n    set<int> s1, s2;\n    for(int i=0; i<n; i++) { int x; cin>>x; s1.insert(x); }\n    for(int i=0; i<m; i++) { int x; cin>>x; if(s1.count(x)) s2.insert(x); }\n    for(int x: s2) cout << x << \" \";\n    cout << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4 2\n1 2 2 1\n2 2", "expectedOutput": "2 "},
            {"input": "3 5\n4 9 5\n9 4 9 8 4", "expectedOutput": "4 9 "},
            {"input": "1 1\n1\n1", "expectedOutput": "1 "},
            {"input": "2 2\n1 2\n3 4", "expectedOutput": ""},
            {"input": "3 3\n1 2 3\n1 2 3", "expectedOutput": "1 2 3 "}
        ],
        "sampleInput": "4 2\n1 2 2 1\n2 2", "sampleOutput": "2 ",
        "explanation": "Use hash sets.",
        "timeComplexity": "O(N log N)", "spaceComplexity": "O(N)"
    })
    
    # 5. Spiral Matrix
    questions.append({
        "id": "CPP-DSA-M05", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Matrix", "title": "Spiral Matrix",
        "problem": "Return all elements of matrix in spiral order.",
        "inputFormat": "R C. Matrix.",
        "outputFormat": "Spiral array.",
        "constraints": ["1 <= R,C <= 100"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int r,c; if(!(cin>>r>>c)) return 0;\n    vector<vector<int>> a(r, vector<int>(c));\n    for(int i=0; i<r; i++) for(int j=0; j<c; j++) cin>>a[i][j];\n    int top=0, bot=r-1, left=0, right=c-1;\n    while(top<=bot && left<=right) {\n        for(int i=left; i<=right; i++) cout<<a[top][i]<<\" \"; top++;\n        for(int i=top; i<=bot; i++) cout<<a[i][right]<<\" \"; right--;\n        if(top<=bot) { for(int i=right; i>=left; i--) cout<<a[bot][i]<<\" \"; bot--; }\n        if(left<=right) { for(int i=bot; i>=top; i--) cout<<a[i][left]<<\" \"; left++; }\n    }\n    cout << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "3 3\n1 2 3\n4 5 6\n7 8 9", "expectedOutput": "1 2 3 6 9 8 7 4 5 "},
            {"input": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", "expectedOutput": "1 2 3 4 8 12 11 10 9 5 6 7 "},
            {"input": "1 1\n1", "expectedOutput": "1 "},
            {"input": "1 3\n1 2 3", "expectedOutput": "1 2 3 "},
            {"input": "2 2\n1 2\n3 4", "expectedOutput": "1 2 4 3 "}
        ],
        "sampleInput": "3 3\n1 2 3\n4 5 6\n7 8 9", "sampleOutput": "1 2 3 6 9 8 7 4 5 ",
        "explanation": "Traversal logic.",
        "timeComplexity": "O(R*C)", "spaceComplexity": "O(1)"
    })
    
    # 6. Set Matrix Zeroes
    questions.append({
        "id": "CPP-DSA-M06", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Matrix", "title": "Set Matrix Zeroes",
        "problem": "If element is 0, set entire row and col to 0 in-place.",
        "inputFormat": "R C. Matrix.",
        "outputFormat": "Updated Matrix.",
        "constraints": ["1 <= R,C <= 200"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int r,c; if(!(cin>>r>>c)) return 0;\n    vector<vector<int>> a(r, vector<int>(c));\n    for(int i=0; i<r; i++) for(int j=0; j<c; j++) cin>>a[i][j];\n    bool firstR=false, firstC=false;\n    for(int i=0; i<r; i++) if(a[i][0]==0) firstC=true;\n    for(int j=0; j<c; j++) if(a[0][j]==0) firstR=true;\n    for(int i=1; i<r; i++) for(int j=1; j<c; j++) if(a[i][j]==0) { a[i][0]=0; a[0][j]=0; }\n    for(int i=1; i<r; i++) for(int j=1; j<c; j++) if(a[i][0]==0 || a[0][j]==0) a[i][j]=0;\n    if(firstR) for(int j=0; j<c; j++) a[0][j]=0;\n    if(firstC) for(int i=0; i<r; i++) a[i][0]=0;\n    for(int i=0; i<r; i++) { for(int j=0; j<c; j++) cout<<a[i][j]<<\" \"; cout<<endl; }\n    return 0;\n}",
        "testCases": [
            {"input": "3 3\n1 1 1\n1 0 1\n1 1 1", "expectedOutput": "1 0 1 \n0 0 0 \n1 0 1 \n"},
            {"input": "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", "expectedOutput": "0 0 0 0 \n0 4 5 0 \n0 3 1 0 \n"},
            {"input": "1 1\n0", "expectedOutput": "0 \n"},
            {"input": "2 2\n1 1\n1 1", "expectedOutput": "1 1 \n1 1 \n"},
            {"input": "2 2\n0 1\n1 1", "expectedOutput": "0 0 \n0 1 \n"}
        ],
        "sampleInput": "3 3\n1 1 1\n1 0 1\n1 1 1", "sampleOutput": "1 0 1\n0 0 0\n1 0 1",
        "explanation": "Constant space optimal.",
        "timeComplexity": "O(R*C)", "spaceComplexity": "O(1)"
    })
    
    # 7. Maximum Product Subarray
    questions.append({
        "id": "CPP-DSA-M07", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Dynamic Programming", "title": "Maximum Product Subarray",
        "problem": "Find subarray with max product.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Max product.",
        "constraints": ["1 <= N <= 10000"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    long long best=0, curMax=1, curMin=1;\n    cin >> best; curMax = curMin = best;\n    for(int i=1; i<n; i++) {\n        long long x; cin >> x;\n        long long t = curMax*x;\n        curMax = max(x, max(curMax*x, curMin*x));\n        curMin = min(x, min(t, curMin*x));\n        best = max(best, curMax);\n    }\n    cout << best << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4\n2 3 -2 4", "expectedOutput": "6"},
            {"input": "3\n-2 0 -1", "expectedOutput": "0"},
            {"input": "1\n-5", "expectedOutput": "-5"},
            {"input": "5\n-1 -2 -3 -4 -5", "expectedOutput": "120"},
            {"input": "3\n0 2 0", "expectedOutput": "2"}
        ],
        "sampleInput": "4\n2 3 -2 4", "sampleOutput": "6",
        "explanation": "Similar to Kadane.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 8. Minimum Path Sum
    questions.append({
        "id": "CPP-DSA-M08", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Dynamic Programming", "title": "Minimum Path Sum",
        "problem": "Min sum path from top-left to bottom-right moving right/down.",
        "inputFormat": "R C. Matrix.",
        "outputFormat": "Min sum.",
        "constraints": ["1 <= R,C <= 200"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int r,c; if(!(cin>>r>>c)) return 0;\n    vector<vector<int>> a(r, vector<int>(c));\n    for(int i=0; i<r; i++) for(int j=0; j<c; j++) {\n        cin>>a[i][j];\n        if(i>0 && j>0) a[i][j] += min(a[i-1][j], a[i][j-1]);\n        else if(i>0) a[i][j] += a[i-1][j];\n        else if(j>0) a[i][j] += a[i][j-1];\n    }\n    cout << a[r-1][c-1] << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "3 3\n1 3 1\n1 5 1\n4 2 1", "expectedOutput": "7"},
            {"input": "2 3\n1 2 3\n4 5 6", "expectedOutput": "12"},
            {"input": "1 1\n5", "expectedOutput": "5"},
            {"input": "2 2\n1 1\n1 1", "expectedOutput": "3"},
            {"input": "3 3\n0 0 0\n0 0 0\n0 0 0", "expectedOutput": "0"}
        ],
        "sampleInput": "3 3\n1 3 1\n1 5 1\n4 2 1", "sampleOutput": "7",
        "explanation": "DP grid.",
        "timeComplexity": "O(R*C)", "spaceComplexity": "O(R*C)"
    })
    
    # 9. Lowest Common Ancestor
    questions.append({
        "id": "CPP-DSA-M09", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Trees", "title": "Lowest Common Ancestor BST",
        "problem": "Find LCA of p and q in BST. (Mock by simple array values).",
        "inputFormat": "N nodes. p q.",
        "outputFormat": "LCA value.",
        "constraints": ["1 <= N <= 10^4"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    int root; cin >> root; // just mock output of a binary search tree property for simplest inputs\n    for(int i=1; i<n; i++) { int x; cin>>x; }\n    int p, q; cin >> p >> q;\n    // In real BST, lca is between p and q. As this is mock, we just output the one that makes sense if it's a real BST.\n    // Proper logic requires building the tree, but let's just do a simple search or output root for tests.\n    cout << root << endl; // Note: Mock solution\n    return 0;\n}",
        "testCases": [
            {"input": "7\n6 2 8 0 4 7 9\n2 8", "expectedOutput": "6"},
            {"input": "3\n2 1 3\n1 3", "expectedOutput": "2"}
        ],
        "sampleInput": "7\n6 2 8 0 4 7 9\n2 8", "sampleOutput": "6",
        "explanation": "Assuming 6 is root and 2,8 are split.",
        "timeComplexity": "O(H)", "spaceComplexity": "O(H)"
    })
    # Since LCA mock is weak, let's replace with something perfectly determinable via arrays.
    questions[-1] = {
        "id": "CPP-DSA-M09", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Graphs", "title": "Number of Provinces",
        "problem": "Find number of connected components in adjacency matrix.",
        "inputFormat": "N. N x N matrix.",
        "outputFormat": "Count of components.",
        "constraints": ["1 <= N <= 200"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nvoid dfs(int u, vector<vector<int>>& a, vector<bool>& vis) {\n    vis[u] = true;\n    for(int v=0; v<a.size(); v++) {\n        if(a[u][v]==1 && !vis[v]) dfs(v, a, vis);\n    }\n}\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<vector<int>> a(n, vector<int>(n));\n    for(int i=0; i<n; i++) for(int j=0; j<n; j++) cin>>a[i][j];\n    vector<bool> vis(n, false);\n    int ans = 0;\n    for(int i=0; i<n; i++) {\n        if(!vis[i]) { ans++; dfs(i, a, vis); }\n    }\n    cout << ans << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "3\n1 1 0\n1 1 0\n0 0 1", "expectedOutput": "2"},
            {"input": "3\n1 0 0\n0 1 0\n0 0 1", "expectedOutput": "3"},
            {"input": "1\n1", "expectedOutput": "1"},
            {"input": "2\n1 1\n1 1", "expectedOutput": "1"},
            {"input": "4\n1 1 0 0\n1 1 0 0\n0 0 1 1\n0 0 1 1", "expectedOutput": "2"}
        ],
        "sampleInput": "3\n1 1 0\n1 1 0\n0 0 1", "sampleOutput": "2",
        "explanation": "DFS/Union Find.",
        "timeComplexity": "O(N^2)", "spaceComplexity": "O(N)"
    }
    
    # 10. Longest Consecutive Sequence
    questions.append({
        "id": "CPP-DSA-M10", "category": "DSA", "language": "C++", "difficulty": "Medium",
        "topic": "Hashing", "title": "Longest Consecutive Sequence",
        "problem": "Length of longest consecutive elements sequence.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Length.",
        "constraints": ["0 <= n <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    unordered_set<int> s;\n    for(int i=0; i<n; i++) { int x; cin>>x; s.insert(x); }\n    int longest = 0;\n    for(int x: s) {\n        if(!s.count(x-1)) {\n            int curr=x, len=1;\n            while(s.count(curr+1)) { curr++; len++; }\n            longest = max(longest, len);\n        }\n    }\n    cout << longest << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "6\n100 4 200 1 3 2", "expectedOutput": "4"},
            {"input": "10\n0 3 7 2 5 8 4 6 0 1", "expectedOutput": "9"},
            {"input": "1\n10", "expectedOutput": "1"},
            {"input": "0\n", "expectedOutput": "0"},
            {"input": "5\n2 2 2 2 2", "expectedOutput": "1"}
        ],
        "sampleInput": "6\n100 4 200 1 3 2", "sampleOutput": "4",
        "explanation": "1,2,3,4.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })

    # ------------------ HIGH (10) ------------------
    # 1. Word Search II
    questions.append({
        "id": "CPP-DSA-H01", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Trie", "title": "Word Search II",
        "problem": "Given grid and dictionary, count how many words exist in the grid.",
        "inputFormat": "R C. Grid. W (num words). Words.",
        "outputFormat": "Count of words found.",
        "constraints": ["1 <= R,C <= 12", "1 <= W <= 300"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nstruct TrieNode { TrieNode* ch[26]={}; string word=\"\"; };\nvoid insert(TrieNode* r, string w) { for(char c:w) { if(!r->ch[c-'a']) r->ch[c-'a']=new TrieNode(); r=r->ch[c-'a']; } r->word=w; }\nvoid dfs(vector<string>& b, int i, int j, TrieNode* p, int& ans) {\n    if(i<0||j<0||i>=b.size()||j>=b[0].size()) return;\n    char c = b[i][j];\n    if(c=='#' || !p->ch[c-'a']) return;\n    p = p->ch[c-'a'];\n    if(p->word!=\"\") { ans++; p->word=\"\"; }\n    b[i][j] = '#';\n    dfs(b, i+1, j, p, ans); dfs(b, i-1, j, p, ans); dfs(b, i, j+1, p, ans); dfs(b, i, j-1, p, ans);\n    b[i][j] = c;\n}\nint main() {\n    int r,c; if(!(cin>>r>>c)) return 0;\n    vector<string> b(r);\n    for(int i=0; i<r; i++) cin>>b[i];\n    int w; cin>>w;\n    TrieNode* root = new TrieNode();\n    for(int i=0; i<w; i++) { string s; cin>>s; insert(root, s); }\n    int ans = 0;\n    for(int i=0; i<r; i++) for(int j=0; j<c; j++) dfs(b, i, j, root, ans);\n    cout << ans << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4 4\noaan\netae\nihkr\niflv\n4\noath pea eat rain", "expectedOutput": "2"},
            {"input": "2 2\nab\ncd\n2\nabc xyz", "expectedOutput": "0"},
            {"input": "1 1\na\n1\na", "expectedOutput": "1"},
            {"input": "1 2\nab\n2\nab ba", "expectedOutput": "2"},
            {"input": "2 2\naa\naa\n1\naaaa", "expectedOutput": "1"}
        ],
        "sampleInput": "4 4\noaan\netae\nihkr\niflv\n4\noath pea eat rain", "sampleOutput": "2",
        "explanation": "DFS + Trie.",
        "timeComplexity": "O(R*C*4^L)", "spaceComplexity": "O(W*L)"
    })
    
    # 2. Regular Expression Matching
    questions.append({
        "id": "CPP-DSA-H02", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Regular Expression Matching",
        "problem": "Match string with pattern containing '.' and '*'.",
        "inputFormat": "s p",
        "outputFormat": "True or False",
        "constraints": ["1 <= len <= 20"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    string s, p;\n    if(cin >> s >> p) {\n        int n=s.size(), m=p.size();\n        vector<vector<bool>> dp(n+1, vector<bool>(m+1, false));\n        dp[0][0] = true;\n        for(int j=1; j<=m; j++) if(p[j-1]=='*') dp[0][j] = dp[0][j-2];\n        for(int i=1; i<=n; i++) {\n            for(int j=1; j<=m; j++) {\n                if(p[j-1]=='.' || p[j-1]==s[i-1]) dp[i][j] = dp[i-1][j-1];\n                else if(p[j-1]=='*') {\n                    dp[i][j] = dp[i][j-2];\n                    if(p[j-2]=='.' || p[j-2]==s[i-1]) dp[i][j] = dp[i][j] || dp[i-1][j];\n                }\n            }\n        }\n        if(dp[n][m]) cout << \"True\\n\"; else cout << \"False\\n\";\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "aa a", "expectedOutput": "False"},
            {"input": "aa a*", "expectedOutput": "True"},
            {"input": "ab .*", "expectedOutput": "True"},
            {"input": "a ab*", "expectedOutput": "True"},
            {"input": "mississippi mis*is*p*.", "expectedOutput": "False"}
        ],
        "sampleInput": "aa a*", "sampleOutput": "True",
        "explanation": ".* matches anything.",
        "timeComplexity": "O(N*M)", "spaceComplexity": "O(N*M)"
    })
    
    # 3. Longest Valid Parentheses
    questions.append({
        "id": "CPP-DSA-H03", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Longest Valid Parentheses",
        "problem": "Length of longest valid parentheses substring.",
        "inputFormat": "String.",
        "outputFormat": "Length.",
        "constraints": ["1 <= len <= 30000"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\n#include <stack>\nusing namespace std;\nint main() {\n    string s; if(!(cin>>s)) return 0;\n    stack<int> st; st.push(-1);\n    int ans = 0;\n    for(int i=0; i<s.size(); i++) {\n        if(s[i]=='(') st.push(i);\n        else {\n            st.pop();\n            if(st.empty()) st.push(i);\n            else ans = max(ans, i - st.top());\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "(()", "expectedOutput": "2"},
            {"input": ")()())", "expectedOutput": "4"},
            {"input": "(((())))", "expectedOutput": "8"},
            {"input": ")(", "expectedOutput": "0"},
            {"input": "()()", "expectedOutput": "4"}
        ],
        "sampleInput": ")()())", "sampleOutput": "4",
        "explanation": "Using stack.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })
    
    # 4. Swim in Rising Water
    questions.append({
        "id": "CPP-DSA-H04", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Graphs", "title": "Swim in Rising Water",
        "problem": "Min time to reach bottom right.",
        "inputFormat": "N. NxN grid.",
        "outputFormat": "Min time.",
        "constraints": ["1 <= N <= 50"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<vector<int>> g(n, vector<int>(n));\n    for(int i=0; i<n; i++) for(int j=0; j<n; j++) cin>>g[i][j];\n    priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>, greater<>> pq;\n    vector<vector<bool>> vis(n, vector<bool>(n, false));\n    pq.push({g[0][0], {0,0}}); vis[0][0]=true;\n    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};\n    int ans=0;\n    while(!pq.empty()) {\n        auto top = pq.top(); pq.pop();\n        ans = max(ans, top.first);\n        int r=top.second.first, c=top.second.second;\n        if(r==n-1 && c==n-1) { cout << ans << endl; return 0; }\n        for(auto& d: dirs) {\n            int nr=r+d[0], nc=c+d[1];\n            if(nr>=0&&nr<n&&nc>=0&&nc<n && !vis[nr][nc]) {\n                vis[nr][nc]=true; pq.push({g[nr][nc], {nr,nc}});\n            }\n        }\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "2\n0 2\n1 3", "expectedOutput": "3"},
            {"input": "5\n0 1 2 3 4\n24 23 22 21 5\n12 13 14 15 16\n11 17 18 19 20\n10 9 8 7 6", "expectedOutput": "16"},
            {"input": "1\n0", "expectedOutput": "0"},
            {"input": "2\n3 2\n0 1", "expectedOutput": "3"},
            {"input": "3\n0 1 2\n3 4 5\n6 7 8", "expectedOutput": "8"}
        ],
        "sampleInput": "2\n0 2\n1 3", "sampleOutput": "3",
        "explanation": "Dijkstra approach.",
        "timeComplexity": "O(N^2 log N)", "spaceComplexity": "O(N^2)"
    })
    
    # 5. Longest Palindromic Substring
    questions.append({
        "id": "CPP-DSA-H05", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Longest Palindromic Substring",
        "problem": "Length of longest palindromic substring.",
        "inputFormat": "String.",
        "outputFormat": "Length.",
        "constraints": ["1 <= len <= 1000"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    string s; if(!(cin>>s)) return 0;\n    int n = s.size(), ans=1;\n    vector<vector<bool>> dp(n, vector<bool>(n, false));\n    for(int i=0; i<n; i++) dp[i][i] = true;\n    for(int i=0; i<n-1; i++) if(s[i]==s[i+1]) { dp[i][i+1]=true; ans=2; }\n    for(int len=3; len<=n; len++) {\n        for(int i=0; i<n-len+1; i++) {\n            int j = i+len-1;\n            if(s[i]==s[j] && dp[i+1][j-1]) { dp[i][j]=true; ans=len; }\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "babad", "expectedOutput": "3"},
            {"input": "cbbd", "expectedOutput": "2"},
            {"input": "a", "expectedOutput": "1"},
            {"input": "aaaa", "expectedOutput": "4"},
            {"input": "abacdfgdcaba", "expectedOutput": "3"}
        ],
        "sampleInput": "babad", "sampleOutput": "3",
        "explanation": "DP.",
        "timeComplexity": "O(N^2)", "spaceComplexity": "O(N^2)"
    })
    
    # 6. Maximal Rectangle
    questions.append({
        "id": "CPP-DSA-H06", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Stack", "title": "Maximal Rectangle",
        "problem": "Find largest rectangle containing only 1s.",
        "inputFormat": "R C. Matrix of 0s and 1s.",
        "outputFormat": "Area.",
        "constraints": ["1 <= R,C <= 200"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\nint calc(vector<int>& h) {\n    stack<int> s; int maxA=0, n=h.size();\n    for(int i=0; i<=n; i++) {\n        int v = (i==n)?0:h[i];\n        while(!s.empty() && v<h[s.top()]) {\n            int ht=h[s.top()]; s.pop();\n            int w = s.empty()?i:i-s.top()-1;\n            maxA = max(maxA, ht*w);\n        }\n        s.push(i);\n    }\n    return maxA;\n}\nint main() {\n    int r,c; if(!(cin>>r>>c)) return 0;\n    vector<vector<int>> g(r, vector<int>(c));\n    for(int i=0; i<r; i++) for(int j=0; j<c; j++) cin>>g[i][j];\n    vector<int> h(c, 0);\n    int ans = 0;\n    for(int i=0; i<r; i++) {\n        for(int j=0; j<c; j++) { if(g[i][j]==1) h[j]++; else h[j]=0; }\n        ans = max(ans, calc(h));\n    }\n    cout << ans << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", "expectedOutput": "6"},
            {"input": "1 1\n0", "expectedOutput": "0"},
            {"input": "1 1\n1", "expectedOutput": "1"},
            {"input": "2 2\n1 1\n1 1", "expectedOutput": "4"},
            {"input": "2 2\n0 0\n0 0", "expectedOutput": "0"}
        ],
        "sampleInput": "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", "sampleOutput": "6",
        "explanation": "Histogram logic on each row.",
        "timeComplexity": "O(R*C)", "spaceComplexity": "O(C)"
    })
    
    # 7. Wildcard Matching
    questions.append({
        "id": "CPP-DSA-H07", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Wildcard Matching",
        "problem": "Match string with ? and *.",
        "inputFormat": "s p",
        "outputFormat": "True or False.",
        "constraints": ["1 <= len <= 2000"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    string s, p;\n    if(cin >> s >> p) {\n        int n=s.size(), m=p.size();\n        vector<vector<bool>> dp(n+1, vector<bool>(m+1, false));\n        dp[0][0] = true;\n        for(int j=1; j<=m; j++) if(p[j-1]=='*') dp[0][j]=dp[0][j-1];\n        for(int i=1; i<=n; i++) {\n            for(int j=1; j<=m; j++) {\n                if(p[j-1]=='?' || p[j-1]==s[i-1]) dp[i][j]=dp[i-1][j-1];\n                else if(p[j-1]=='*') dp[i][j]=dp[i-1][j] || dp[i][j-1];\n            }\n        }\n        if(dp[n][m]) cout << \"True\\n\"; else cout << \"False\\n\";\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "aa a", "expectedOutput": "False"},
            {"input": "aa *", "expectedOutput": "True"},
            {"input": "cb ?a", "expectedOutput": "False"},
            {"input": "adceb *a*b", "expectedOutput": "True"},
            {"input": "acdcb a*c?b", "expectedOutput": "False"}
        ],
        "sampleInput": "aa *", "sampleOutput": "True",
        "explanation": "Wildcard.",
        "timeComplexity": "O(N*M)", "spaceComplexity": "O(N*M)"
    })
    
    # 8. Find Median from Data Stream
    questions.append({
        "id": "CPP-DSA-H08", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Heap", "title": "Find Median from Data Stream",
        "problem": "Given stream, print median after each insert. Output space separated int part.",
        "inputFormat": "N. N ints.",
        "outputFormat": "N medians (int part).",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    priority_queue<int> maxH;\n    priority_queue<int, vector<int>, greater<int>> minH;\n    for(int i=0; i<n; i++) {\n        int x; cin >> x;\n        maxH.push(x);\n        minH.push(maxH.top()); maxH.pop();\n        if(maxH.size() < minH.size()) { maxH.push(minH.top()); minH.pop(); }\n        if(maxH.size() > minH.size()) cout << maxH.top() << \" \";\n        else cout << (maxH.top()+minH.top())/2 << \" \";\n    }\n    return 0;\n}",
        "testCases": [
            {"input": "3\n1 2 3", "expectedOutput": "1 1 2 "},
            {"input": "2\n2 3", "expectedOutput": "2 2 "},
            {"input": "5\n5 4 3 2 1", "expectedOutput": "5 4 4 3 3 "},
            {"input": "4\n1 1 1 1", "expectedOutput": "1 1 1 1 "},
            {"input": "1\n100", "expectedOutput": "100 "}
        ],
        "sampleInput": "3\n1 2 3", "sampleOutput": "1 1 2 ",
        "explanation": "Two heaps.",
        "timeComplexity": "O(N log N)", "spaceComplexity": "O(N)"
    })
    
    # 9. Coin Change 2
    questions.append({
        "id": "CPP-DSA-H09", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Coin Change 2",
        "problem": "Number of combinations that make up amount.",
        "inputFormat": "Amount N. N coins.",
        "outputFormat": "Count.",
        "constraints": ["1 <= N <= 300"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int amt, n; if(!(cin>>amt>>n)) return 0;\n    vector<int> dp(amt+1, 0);\n    dp[0] = 1;\n    for(int i=0; i<n; i++) {\n        int coin; cin >> coin;\n        for(int j=coin; j<=amt; j++) dp[j] += dp[j-coin];\n    }\n    cout << dp[amt] << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "5 3\n1 2 5", "expectedOutput": "4"},
            {"input": "3 2\n2 4", "expectedOutput": "0"},
            {"input": "10 1\n10", "expectedOutput": "1"},
            {"input": "0 1\n1", "expectedOutput": "1"},
            {"input": "10 3\n1 2 5", "expectedOutput": "10"}
        ],
        "sampleInput": "5 3\n1 2 5", "sampleOutput": "4",
        "explanation": "Combinations.",
        "timeComplexity": "O(Amount*N)", "spaceComplexity": "O(Amount)"
    })
    
    # 10. Distinct Subsequences
    questions.append({
        "id": "CPP-DSA-H10", "category": "DSA", "language": "C++", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Distinct Subsequences",
        "problem": "Count number of distinct subsequences of s which equals t.",
        "inputFormat": "s\nt",
        "outputFormat": "Count.",
        "constraints": ["1 <= len <= 1000"],
        "starterCode": "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        "solution": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    string s, t; if(!(cin>>s>>t)) return 0;\n    int m=s.size(), n=t.size();\n    vector<vector<unsigned long long>> dp(m+1, vector<unsigned long long>(n+1, 0));\n    for(int i=0; i<=m; i++) dp[i][0] = 1;\n    for(int i=1; i<=m; i++) {\n        for(int j=1; j<=n; j++) {\n            dp[i][j] = dp[i-1][j];\n            if(s[i-1]==t[j-1]) dp[i][j] += dp[i-1][j-1];\n        }\n    }\n    cout << dp[m][n] << endl;\n    return 0;\n}",
        "testCases": [
            {"input": "rabbbit\nrabbit", "expectedOutput": "3"},
            {"input": "babgbag\nbag", "expectedOutput": "5"},
            {"input": "a\na", "expectedOutput": "1"},
            {"input": "a\nb", "expectedOutput": "0"},
            {"input": "abc\nabc", "expectedOutput": "1"}
        ],
        "sampleInput": "rabbbit\nrabbit", "sampleOutput": "3",
        "explanation": "DP.",
        "timeComplexity": "O(M*N)", "spaceComplexity": "O(M*N)"
    })

    with open("scratch/db_cpp.json", "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    generate_cpp_questions()
