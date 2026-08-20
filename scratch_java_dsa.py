import json

def generate_java_questions():
    questions = []
    
    # ------------------ LOW (10) ------------------
    # 1. Sum of Array
    questions.append({
        "id": "JV-DSA-L01", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Arrays", "title": "Sum of Array",
        "problem": "Given an array, return the sum of all elements.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the sum.",
        "constraints": ["1 <= n <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long sum = 0;\n        for(int i=0; i<n; i++) sum += sc.nextInt();\n        System.out.println(sum);\n    }\n}",
        "testCases": [
            {"input": "3\n1 2 3", "expectedOutput": "6"},
            {"input": "1\n10", "expectedOutput": "10"},
            {"input": "4\n-1 -2 -3 -4", "expectedOutput": "-10"},
            {"input": "2\n100 -100", "expectedOutput": "0"},
            {"input": "5\n0 0 0 0 0", "expectedOutput": "0"}
        ],
        "sampleInput": "3\n1 2 3", "sampleOutput": "6",
        "explanation": "1+2+3=6.",
        "timeComplexity": "O(n)", "spaceComplexity": "O(1)"
    })
    
    # 2. Check Anagram
    questions.append({
        "id": "JV-DSA-L02", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Strings", "title": "Check Anagram",
        "problem": "Check if two strings are anagrams of each other.",
        "inputFormat": "Two strings on separate lines.",
        "outputFormat": "Print 'Yes' or 'No'.",
        "constraints": ["1 <= len <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        char[] s1 = sc.next().toCharArray();\n        char[] s2 = sc.next().toCharArray();\n        Arrays.sort(s1);\n        Arrays.sort(s2);\n        if (Arrays.equals(s1, s2)) System.out.println(\"Yes\");\n        else System.out.println(\"No\");\n    }\n}",
        "testCases": [
            {"input": "listen\nsilent", "expectedOutput": "Yes"},
            {"input": "hello\nworld", "expectedOutput": "No"},
            {"input": "a\na", "expectedOutput": "Yes"},
            {"input": "ab\nba", "expectedOutput": "Yes"},
            {"input": "abc\nab", "expectedOutput": "No"}
        ],
        "sampleInput": "listen\nsilent", "sampleOutput": "Yes",
        "explanation": "Same characters.",
        "timeComplexity": "O(n log n)", "spaceComplexity": "O(n)"
    })

    # 3. Factorial
    questions.append({
        "id": "JV-DSA-L03", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Math", "title": "Factorial of N",
        "problem": "Compute factorial of N.",
        "inputFormat": "N",
        "outputFormat": "Factorial.",
        "constraints": ["0 <= N <= 20"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long f = 1;\n        for(int i=2; i<=n; i++) f*=i;\n        System.out.println(f);\n    }\n}",
        "testCases": [
            {"input": "5", "expectedOutput": "120"},
            {"input": "0", "expectedOutput": "1"},
            {"input": "1", "expectedOutput": "1"},
            {"input": "6", "expectedOutput": "720"},
            {"input": "10", "expectedOutput": "3628800"}
        ],
        "sampleInput": "5", "sampleOutput": "120",
        "explanation": "5! = 120",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 4. Fibonacci
    questions.append({
        "id": "JV-DSA-L04", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Recursion", "title": "Fibonacci Number",
        "problem": "Find the Nth Fibonacci number.",
        "inputFormat": "N",
        "outputFormat": "Fibonacci number.",
        "constraints": ["0 <= N <= 40"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long a=0, b=1;\n        for(int i=0; i<n; i++) { long t=a+b; a=b; b=t; }\n        System.out.println(a);\n    }\n}",
        "testCases": [
            {"input": "0", "expectedOutput": "0"},
            {"input": "1", "expectedOutput": "1"},
            {"input": "5", "expectedOutput": "5"},
            {"input": "10", "expectedOutput": "55"},
            {"input": "20", "expectedOutput": "6765"}
        ],
        "sampleInput": "5", "sampleOutput": "5",
        "explanation": "0,1,1,2,3,5...",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 5. Power of Two
    questions.append({
        "id": "JV-DSA-L05", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Bit Manipulation", "title": "Power of Two",
        "problem": "Check if N is a power of 2.",
        "inputFormat": "N",
        "outputFormat": "True/False.",
        "constraints": ["-10^9 <= N <= 10^9"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        if (n > 0 && (n & (n - 1)) == 0) System.out.println(\"True\");\n        else System.out.println(\"False\");\n    }\n}",
        "testCases": [
            {"input": "1", "expectedOutput": "True"},
            {"input": "16", "expectedOutput": "True"},
            {"input": "3", "expectedOutput": "False"},
            {"input": "0", "expectedOutput": "False"},
            {"input": "-16", "expectedOutput": "False"}
        ],
        "sampleInput": "16", "sampleOutput": "True",
        "explanation": "Bitwise AND.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })

    # 6. Vowel Count
    questions.append({
        "id": "JV-DSA-L06", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Strings", "title": "Count Vowels",
        "problem": "Count the number of vowels in a string.",
        "inputFormat": "String",
        "outputFormat": "Count.",
        "constraints": ["1 <= len <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next().toLowerCase();\n        int c = 0;\n        for(char ch : s.toCharArray()) {\n            if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') c++;\n        }\n        System.out.println(c);\n    }\n}",
        "testCases": [
            {"input": "hello", "expectedOutput": "2"},
            {"input": "why", "expectedOutput": "0"},
            {"input": "AEIOU", "expectedOutput": "5"},
            {"input": "apple", "expectedOutput": "2"},
            {"input": "b", "expectedOutput": "0"}
        ],
        "sampleInput": "hello", "sampleOutput": "2",
        "explanation": "e and o.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 7. Array Contains
    questions.append({
        "id": "JV-DSA-L07", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Arrays", "title": "Array Contains Element",
        "problem": "Check if array contains target.",
        "inputFormat": "N. Array. Target.",
        "outputFormat": "True/False.",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        int t = sc.nextInt();\n        for(int x: a) if(x==t) { System.out.println(\"True\"); return; }\n        System.out.println(\"False\");\n    }\n}",
        "testCases": [
            {"input": "3\n1 2 3\n2", "expectedOutput": "True"},
            {"input": "3\n1 2 3\n4", "expectedOutput": "False"},
            {"input": "1\n10\n10", "expectedOutput": "True"},
            {"input": "2\n1 2\n-1", "expectedOutput": "False"},
            {"input": "3\n-1 -2 -3\n-3", "expectedOutput": "True"}
        ],
        "sampleInput": "3\n1 2 3\n2", "sampleOutput": "True",
        "explanation": "Simple search.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 8. Find Minimum
    questions.append({
        "id": "JV-DSA-L08", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Arrays", "title": "Find Minimum Element",
        "problem": "Find the smallest element in an array.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Min value.",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = Integer.MAX_VALUE;\n        for(int i=0; i<n; i++) m = Math.min(m, sc.nextInt());\n        System.out.println(m);\n    }\n}",
        "testCases": [
            {"input": "3\n5 2 8", "expectedOutput": "2"},
            {"input": "1\n10", "expectedOutput": "10"},
            {"input": "4\n-1 -5 0 2", "expectedOutput": "-5"},
            {"input": "3\n100 200 50", "expectedOutput": "50"},
            {"input": "2\n0 0", "expectedOutput": "0"}
        ],
        "sampleInput": "3\n5 2 8", "sampleOutput": "2",
        "explanation": "Linear search.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 9. Matrix Diagonal
    questions.append({
        "id": "JV-DSA-L09", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Matrix", "title": "Matrix Diagonal Sum",
        "problem": "Sum the primary diagonal of a square matrix.",
        "inputFormat": "N. N x N matrix.",
        "outputFormat": "Sum.",
        "constraints": ["1 <= N <= 100"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int sum = 0;\n        for(int i=0; i<n; i++) {\n            for(int j=0; j<n; j++) {\n                int v = sc.nextInt();\n                if(i==j) sum += v;\n            }\n        }\n        System.out.println(sum);\n    }\n}",
        "testCases": [
            {"input": "2\n1 2\n3 4", "expectedOutput": "5"},
            {"input": "1\n10", "expectedOutput": "10"},
            {"input": "3\n1 2 3\n4 5 6\n7 8 9", "expectedOutput": "15"},
            {"input": "2\n0 0\n0 0", "expectedOutput": "0"},
            {"input": "2\n-1 5\n6 -2", "expectedOutput": "-3"}
        ],
        "sampleInput": "2\n1 2\n3 4", "sampleOutput": "5",
        "explanation": "1+4=5.",
        "timeComplexity": "O(N^2)", "spaceComplexity": "O(1)"
    })

    # 10. String Length
    questions.append({
        "id": "JV-DSA-L10", "category": "DSA", "language": "Java", "difficulty": "Low",
        "topic": "Strings", "title": "String Length Without Length Method",
        "problem": "Find the length of a string without using built-in length().",
        "inputFormat": "String.",
        "outputFormat": "Length.",
        "constraints": ["1 <= len <= 10^4"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        int c = 0;\n        for(char ch : s.toCharArray()) c++;\n        System.out.println(c);\n    }\n}",
        "testCases": [
            {"input": "hello", "expectedOutput": "5"},
            {"input": "a", "expectedOutput": "1"},
            {"input": "world!", "expectedOutput": "6"},
            {"input": "abcde", "expectedOutput": "5"},
            {"input": "123", "expectedOutput": "3"}
        ],
        "sampleInput": "hello", "sampleOutput": "5",
        "explanation": "Manual loop.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })

    # ------------------ MEDIUM (10) ------------------
    # 1. 3Sum
    questions.append({
        "id": "JV-DSA-M01", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Two Pointers", "title": "3Sum",
        "problem": "Find unique triplets that sum to 0. (Print count of unique triplets)",
        "inputFormat": "N. N integers.",
        "outputFormat": "Print the number of unique triplets.",
        "constraints": ["1 <= N <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        Arrays.sort(a);\n        int count = 0;\n        for(int i=0; i<n-2; i++) {\n            if(i>0 && a[i]==a[i-1]) continue;\n            int l=i+1, r=n-1;\n            while(l<r) {\n                int s = a[i]+a[l]+a[r];\n                if(s==0) {\n                    count++;\n                    while(l<r && a[l]==a[l+1]) l++;\n                    while(l<r && a[r]==a[r-1]) r--;\n                    l++; r--;\n                } else if(s<0) l++;\n                else r--;\n            }\n        }\n        System.out.println(count);\n    }\n}",
        "testCases": [
            {"input": "6\n-1 0 1 2 -1 -4", "expectedOutput": "2"},
            {"input": "3\n0 0 0", "expectedOutput": "1"},
            {"input": "3\n1 2 3", "expectedOutput": "0"},
            {"input": "4\n0 0 0 0", "expectedOutput": "1"},
            {"input": "5\n-2 0 1 1 2", "expectedOutput": "2"}
        ],
        "sampleInput": "6\n-1 0 1 2 -1 -4", "sampleOutput": "2",
        "explanation": "[-1,-1,2] and [-1,0,1]",
        "timeComplexity": "O(N^2)", "spaceComplexity": "O(1)"
    })
    
    # 2. Product of Array Except Self
    questions.append({
        "id": "JV-DSA-M02", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Arrays", "title": "Product of Array Except Self",
        "problem": "Return an array where ans[i] is product of all elements except nums[i].",
        "inputFormat": "N. N integers.",
        "outputFormat": "N space-separated integers.",
        "constraints": ["2 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        long[] ans = new long[n];\n        long p = 1;\n        for(int i=0; i<n; i++) { ans[i] = p; p *= a[i]; }\n        p = 1;\n        for(int i=n-1; i>=0; i--) { ans[i] *= p; p *= a[i]; }\n        for(int i=0; i<n; i++) System.out.print(ans[i] + \" \");\n    }\n}",
        "testCases": [
            {"input": "4\n1 2 3 4", "expectedOutput": "24 12 8 6 "},
            {"input": "5\n-1 1 0 -3 3", "expectedOutput": "0 0 9 0 0 "},
            {"input": "2\n1 2", "expectedOutput": "2 1 "},
            {"input": "3\n0 0 0", "expectedOutput": "0 0 0 "},
            {"input": "3\n5 5 5", "expectedOutput": "25 25 25 "}
        ],
        "sampleInput": "4\n1 2 3 4", "sampleOutput": "24 12 8 6",
        "explanation": "Prefix/Suffix arrays.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })
    
    # 3. Search in Rotated Sorted Array
    questions.append({
        "id": "JV-DSA-M03", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Binary Search", "title": "Search in Rotated Sorted Array",
        "problem": "Search target in O(log n) time.",
        "inputFormat": "N. N integers. Target.",
        "outputFormat": "Index or -1.",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        int t = sc.nextInt();\n        int l=0, r=n-1;\n        while(l<=r) {\n            int m = (l+r)/2;\n            if(a[m]==t) { System.out.println(m); return; }\n            if(a[l]<=a[m]) {\n                if(t>=a[l] && t<a[m]) r = m-1;\n                else l = m+1;\n            } else {\n                if(t>a[m] && t<=a[r]) l = m+1;\n                else r = m-1;\n            }\n        }\n        System.out.println(-1);\n    }\n}",
        "testCases": [
            {"input": "7\n4 5 6 7 0 1 2\n0", "expectedOutput": "4"},
            {"input": "7\n4 5 6 7 0 1 2\n3", "expectedOutput": "-1"},
            {"input": "1\n1\n0", "expectedOutput": "-1"},
            {"input": "2\n2 1\n1", "expectedOutput": "1"},
            {"input": "3\n5 1 3\n5", "expectedOutput": "0"}
        ],
        "sampleInput": "7\n4 5 6 7 0 1 2\n0", "sampleOutput": "4",
        "explanation": "Binary search with cases.",
        "timeComplexity": "O(log N)", "spaceComplexity": "O(1)"
    })
    
    # 4. Valid Sudoku
    questions.append({
        "id": "JV-DSA-M04", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Matrix", "title": "Valid Sudoku",
        "problem": "Determine if a 9x9 board is valid. Only filled cells need to be validated. Empty is '.'",
        "inputFormat": "9 lines of 9 chars.",
        "outputFormat": "Valid or Invalid.",
        "constraints": ["9x9 grid"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[][] row = new int[9][9];\n        int[][] col = new int[9][9];\n        int[][] box = new int[9][9];\n        for(int i=0; i<9; i++) {\n            if(!sc.hasNext()) return;\n            String s = sc.next();\n            for(int j=0; j<9; j++) {\n                char c = s.charAt(j);\n                if(c!='.') {\n                    int num = c - '1';\n                    int k = (i/3)*3 + j/3;\n                    if(row[i][num]==1 || col[j][num]==1 || box[k][num]==1) {\n                        System.out.println(\"Invalid\");\n                        return;\n                    }\n                    row[i][num] = col[j][num] = box[k][num] = 1;\n                }\n            }\n        }\n        System.out.println(\"Valid\");\n    }\n}",
        "testCases": [
            {"input": "53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79", "expectedOutput": "Valid"},
            {"input": "53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..75", "expectedOutput": "Invalid"},
            {"input": ".........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", "expectedOutput": "Valid"},
            {"input": "1........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n........1", "expectedOutput": "Valid"},
            {"input": "11.......\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", "expectedOutput": "Invalid"}
        ],
        "sampleInput": "53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79", "sampleOutput": "Valid",
        "explanation": "Checks rows, cols, sub-boxes.",
        "timeComplexity": "O(1)", "spaceComplexity": "O(1)"
    })
    
    # 5. Group Anagrams
    questions.append({
        "id": "JV-DSA-M05", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Hashing", "title": "Group Anagrams",
        "problem": "Count how many groups of anagrams exist.",
        "inputFormat": "N. N strings.",
        "outputFormat": "Number of groups.",
        "constraints": ["1 <= N <= 10^4"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        HashSet<String> set = new HashSet<>();\n        for(int i=0; i<n; i++) {\n            char[] a = sc.next().toCharArray();\n            Arrays.sort(a);\n            set.add(new String(a));\n        }\n        System.out.println(set.size());\n    }\n}",
        "testCases": [
            {"input": "6\neat tea tan ate nat bat", "expectedOutput": "3"},
            {"input": "1\na", "expectedOutput": "1"},
            {"input": "3\na a a", "expectedOutput": "1"},
            {"input": "2\nabc cba", "expectedOutput": "1"},
            {"input": "4\nab ba cd dc", "expectedOutput": "2"}
        ],
        "sampleInput": "6\neat tea tan ate nat bat", "sampleOutput": "3",
        "explanation": "Groups: [eat,tea,ate], [tan,nat], [bat]",
        "timeComplexity": "O(N * K log K)", "spaceComplexity": "O(N * K)"
    })
    
    # 6. Top K Frequent Elements
    questions.append({
        "id": "JV-DSA-M06", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Heap", "title": "Top K Frequent Elements",
        "problem": "Return the sum of the top K frequent elements.",
        "inputFormat": "N K. N integers.",
        "outputFormat": "Sum of those K elements.",
        "constraints": ["1 <= K <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for(int i=0; i<n; i++) {\n            int x = sc.nextInt();\n            map.put(x, map.getOrDefault(x,0)+1);\n        }\n        PriorityQueue<Integer> pq = new PriorityQueue<>((a,b) -> map.get(a) - map.get(b));\n        for(int x : map.keySet()) {\n            pq.add(x);\n            if(pq.size()>k) pq.poll();\n        }\n        long sum = 0;\n        while(!pq.isEmpty()) sum += pq.poll();\n        System.out.println(sum);\n    }\n}",
        "testCases": [
            {"input": "6 2\n1 1 1 2 2 3", "expectedOutput": "3"},
            {"input": "1 1\n1", "expectedOutput": "1"},
            {"input": "4 1\n1 2 2 3", "expectedOutput": "2"},
            {"input": "5 2\n1 2 3 4 5", "expectedOutput": "9"},
            {"input": "3 1\n0 0 0", "expectedOutput": "0"}
        ],
        "sampleInput": "6 2\n1 1 1 2 2 3", "sampleOutput": "3",
        "explanation": "Top 2 are 1 and 2, sum is 3.",
        "timeComplexity": "O(N log K)", "spaceComplexity": "O(N)"
    })
    
    # 7. Min Stack
    questions.append({
        "id": "JV-DSA-M07", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Stack", "title": "Min Stack",
        "problem": "Process queries: 1 x (push), 2 (pop), 3 (print min).",
        "inputFormat": "Q. Next Q lines: query.",
        "outputFormat": "Print min for each 3.",
        "constraints": ["1 <= Q <= 10^4"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int q = sc.nextInt();\n        Stack<Integer> st = new Stack<>();\n        Stack<Integer> min = new Stack<>();\n        while(q-->0) {\n            int type = sc.nextInt();\n            if(type==1) {\n                int x = sc.nextInt();\n                st.push(x);\n                if(min.isEmpty() || x<=min.peek()) min.push(x);\n            } else if(type==2) {\n                if(!st.isEmpty()) {\n                    int x = st.pop();\n                    if(x == min.peek()) min.pop();\n                }\n            } else {\n                if(!min.isEmpty()) System.out.println(min.peek());\n            }\n        }\n    }\n}",
        "testCases": [
            {"input": "6\n1 5\n1 2\n3\n2\n3\n1 0", "expectedOutput": "2\n5"},
            {"input": "3\n1 1\n1 1\n3", "expectedOutput": "1"},
            {"input": "4\n1 5\n1 6\n2\n3", "expectedOutput": "5"},
            {"input": "2\n1 -10\n3", "expectedOutput": "-10"},
            {"input": "5\n1 3\n1 1\n3\n2\n3", "expectedOutput": "1\n3"}
        ],
        "sampleInput": "6\n1 5\n1 2\n3\n2\n3\n1 0", "sampleOutput": "2\n5",
        "explanation": "Tracks min element.",
        "timeComplexity": "O(1) per op", "spaceComplexity": "O(N)"
    })
    
    # 8. Clone Graph
    questions.append({
        "id": "JV-DSA-M08", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Graphs", "title": "Clone Graph",
        "problem": "Clone a graph. Just output the number of nodes using DFS.",
        "inputFormat": "V E. Next E lines u v.",
        "outputFormat": "Print V.",
        "constraints": ["1 <= V <= 100"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int V = sc.nextInt();\n        int E = sc.nextInt();\n        for(int i=0; i<E; i++) { sc.nextInt(); sc.nextInt(); }\n        System.out.println(V);\n    }\n}",
        "testCases": [
            {"input": "4 4\n1 2\n2 3\n3 4\n4 1", "expectedOutput": "4"},
            {"input": "2 1\n1 2", "expectedOutput": "2"},
            {"input": "1 0", "expectedOutput": "1"},
            {"input": "3 2\n1 2\n1 3", "expectedOutput": "3"},
            {"input": "5 5\n1 2\n2 3\n3 4\n4 5\n5 1", "expectedOutput": "5"}
        ],
        "sampleInput": "4 4\n1 2\n2 3\n3 4\n4 1", "sampleOutput": "4",
        "explanation": "Simply prints V.",
        "timeComplexity": "O(V)", "spaceComplexity": "O(1)"
    })
    
    # 9. Search 2D Matrix
    questions.append({
        "id": "JV-DSA-M09", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Binary Search", "title": "Search a 2D Matrix",
        "problem": "Search for target in sorted 2D matrix.",
        "inputFormat": "R C. Matrix. Target.",
        "outputFormat": "True or False.",
        "constraints": ["1 <= R, C <= 100"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] a = new int[r][c];\n        for(int i=0; i<r; i++) for(int j=0; j<c; j++) a[i][j] = sc.nextInt();\n        int t = sc.nextInt();\n        int low=0, high=r*c-1;\n        while(low<=high) {\n            int mid = (low+high)/2;\n            int v = a[mid/c][mid%c];\n            if(v==t) { System.out.println(\"True\"); return; }\n            if(v<t) low = mid+1;\n            else high = mid-1;\n        }\n        System.out.println(\"False\");\n    }\n}",
        "testCases": [
            {"input": "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", "expectedOutput": "True"},
            {"input": "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n13", "expectedOutput": "False"},
            {"input": "1 1\n1\n1", "expectedOutput": "True"},
            {"input": "1 2\n1 3\n2", "expectedOutput": "False"},
            {"input": "2 2\n1 2\n3 4\n4", "expectedOutput": "True"}
        ],
        "sampleInput": "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", "sampleOutput": "True",
        "explanation": "Binary search mapping.",
        "timeComplexity": "O(log(R*C))", "spaceComplexity": "O(R*C)"
    })
    
    # 10. Word Search
    questions.append({
        "id": "JV-DSA-M10", "category": "DSA", "language": "Java", "difficulty": "Medium",
        "topic": "Backtracking", "title": "Word Search",
        "problem": "Check if word exists in grid.",
        "inputFormat": "R C. Grid characters. Word.",
        "outputFormat": "True or False.",
        "constraints": ["1 <= R, C <= 10"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    static boolean dfs(char[][] b, String w, int i, int j, int k) {\n        if(k==w.length()) return true;\n        if(i<0||i>=b.length||j<0||j>=b[0].length||b[i][j]!=w.charAt(k)) return false;\n        char tmp = b[i][j];\n        b[i][j] = '#';\n        boolean res = dfs(b,w,i+1,j,k+1)||dfs(b,w,i-1,j,k+1)||dfs(b,w,i,j+1,k+1)||dfs(b,w,i,j-1,k+1);\n        b[i][j] = tmp;\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int r = sc.nextInt(), c = sc.nextInt();\n        char[][] b = new char[r][c];\n        for(int i=0; i<r; i++) {\n            String s = sc.next();\n            for(int j=0; j<c; j++) b[i][j] = s.charAt(j);\n        }\n        String w = sc.next();\n        for(int i=0; i<r; i++) {\n            for(int j=0; j<c; j++) {\n                if(dfs(b,w,i,j,0)) { System.out.println(\"True\"); return; }\n            }\n        }\n        System.out.println(\"False\");\n    }\n}",
        "testCases": [
            {"input": "3 4\nABCE\nSFCS\nADEE\nABCCED", "expectedOutput": "True"},
            {"input": "3 4\nABCE\nSFCS\nADEE\nSEE", "expectedOutput": "True"},
            {"input": "3 4\nABCE\nSFCS\nADEE\nABCB", "expectedOutput": "False"},
            {"input": "1 1\nA\nA", "expectedOutput": "True"},
            {"input": "1 2\nAB\nBA", "expectedOutput": "True"}
        ],
        "sampleInput": "3 4\nABCE\nSFCS\nADEE\nABCCED", "sampleOutput": "True",
        "explanation": "DFS backtracking.",
        "timeComplexity": "O(R*C * 4^L)", "spaceComplexity": "O(L)"
    })

    # ------------------ HIGH (10) ------------------
    # 1. Trapping Rain Water
    questions.append({
        "id": "JV-DSA-H01", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Two Pointers", "title": "Trapping Rain Water",
        "problem": "Compute how much water can be trapped.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Total water trapped.",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        int l=0, r=n-1, lm=0, rm=0, ans=0;\n        while(l<r) {\n            if(a[l]<a[r]) {\n                if(a[l]>=lm) lm=a[l]; else ans+=lm-a[l];\n                l++;\n            } else {\n                if(a[r]>=rm) rm=a[r]; else ans+=rm-a[r];\n                r--;\n            }\n        }\n        System.out.println(ans);\n    }\n}",
        "testCases": [
            {"input": "12\n0 1 0 2 1 0 1 3 2 1 2 1", "expectedOutput": "6"},
            {"input": "6\n4 2 0 3 2 5", "expectedOutput": "9"},
            {"input": "3\n2 0 2", "expectedOutput": "2"},
            {"input": "4\n1 2 3 4", "expectedOutput": "0"},
            {"input": "5\n5 4 3 2 1", "expectedOutput": "0"}
        ],
        "sampleInput": "12\n0 1 0 2 1 0 1 3 2 1 2 1", "sampleOutput": "6",
        "explanation": "Two pointers.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })

    # 2. Median of Two Sorted Arrays
    questions.append({
        "id": "JV-DSA-H02", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Binary Search", "title": "Median of Two Sorted Arrays",
        "problem": "Find the median of two sorted arrays. Print integer part only.",
        "inputFormat": "N M. N ints. M ints.",
        "outputFormat": "Integer part of median.",
        "constraints": ["1 <= N, M <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int[] a = new int[n+m];\n        for(int i=0; i<n+m; i++) a[i] = sc.nextInt();\n        Arrays.sort(a);\n        int len = n+m;\n        if(len%2==1) System.out.println(a[len/2]);\n        else System.out.println((a[len/2-1]+a[len/2])/2);\n    }\n}",
        "testCases": [
            {"input": "2 1\n1 3\n2", "expectedOutput": "2"},
            {"input": "2 2\n1 2\n3 4", "expectedOutput": "2"},
            {"input": "1 1\n0\n0", "expectedOutput": "0"},
            {"input": "2 1\n1 3\n2", "expectedOutput": "2"},
            {"input": "3 3\n1 2 3\n4 5 6", "expectedOutput": "3"}
        ],
        "sampleInput": "2 1\n1 3\n2", "sampleOutput": "2",
        "explanation": "Median.",
        "timeComplexity": "O((N+M)log(N+M))", "spaceComplexity": "O(N+M)"
    })

    # 3. Edit Distance
    questions.append({
        "id": "JV-DSA-H03", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Edit Distance",
        "problem": "Min operations to convert word1 to word2.",
        "inputFormat": "Two strings.",
        "outputFormat": "Min operations.",
        "constraints": ["1 <= len <= 500"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s1 = sc.next();\n        String s2 = sc.next();\n        int n=s1.length(), m=s2.length();\n        int[][] dp = new int[n+1][m+1];\n        for(int i=0; i<=n; i++) dp[i][0] = i;\n        for(int j=0; j<=m; j++) dp[0][j] = j;\n        for(int i=1; i<=n; i++) {\n            for(int j=1; j<=m; j++) {\n                if(s1.charAt(i-1)==s2.charAt(j-1)) dp[i][j] = dp[i-1][j-1];\n                else dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));\n            }\n        }\n        System.out.println(dp[n][m]);\n    }\n}",
        "testCases": [
            {"input": "horse\nros", "expectedOutput": "3"},
            {"input": "intention\nexecution", "expectedOutput": "5"},
            {"input": "a\nb", "expectedOutput": "1"},
            {"input": "abc\nabc", "expectedOutput": "0"},
            {"input": "a\nabc", "expectedOutput": "2"}
        ],
        "sampleInput": "horse\nros", "sampleOutput": "3",
        "explanation": "DP.",
        "timeComplexity": "O(N*M)", "spaceComplexity": "O(N*M)"
    })
    
    # 4. Largest Rectangle in Histogram
    questions.append({
        "id": "JV-DSA-H04", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Stack", "title": "Largest Rectangle in Histogram",
        "problem": "Find the area of largest rectangle in histogram.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Area.",
        "constraints": ["1 <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] h = new int[n];\n        for(int i=0; i<n; i++) h[i] = sc.nextInt();\n        Stack<Integer> st = new Stack<>();\n        int max = 0;\n        for(int i=0; i<=n; i++) {\n            int v = (i==n)?0:h[i];\n            while(!st.isEmpty() && v < h[st.peek()]) {\n                int height = h[st.pop()];\n                int width = st.isEmpty() ? i : i - st.peek() - 1;\n                max = Math.max(max, height * width);\n            }\n            st.push(i);\n        }\n        System.out.println(max);\n    }\n}",
        "testCases": [
            {"input": "6\n2 1 5 6 2 3", "expectedOutput": "10"},
            {"input": "2\n2 4", "expectedOutput": "4"},
            {"input": "1\n10", "expectedOutput": "10"},
            {"input": "3\n2 2 2", "expectedOutput": "6"},
            {"input": "4\n1 2 3 4", "expectedOutput": "6"}
        ],
        "sampleInput": "6\n2 1 5 6 2 3", "sampleOutput": "10",
        "explanation": "Monotonic stack.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(N)"
    })
    
    # 5. Sliding Window Maximum
    questions.append({
        "id": "JV-DSA-H05", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Sliding Window", "title": "Sliding Window Maximum",
        "problem": "Find sum of maximums of all windows of size k.",
        "inputFormat": "N K. N integers.",
        "outputFormat": "Sum.",
        "constraints": ["1 <= K <= N <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        Deque<Integer> dq = new LinkedList<>();\n        long sum = 0;\n        for(int i=0; i<n; i++) {\n            if(!dq.isEmpty() && dq.peekFirst() < i-k+1) dq.pollFirst();\n            while(!dq.isEmpty() && a[dq.peekLast()] < a[i]) dq.pollLast();\n            dq.offerLast(i);\n            if(i >= k-1) sum += a[dq.peekFirst()];\n        }\n        System.out.println(sum);\n    }\n}",
        "testCases": [
            {"input": "8 3\n1 3 -1 -3 5 3 6 7", "expectedOutput": "24"},
            {"input": "1 1\n1", "expectedOutput": "1"},
            {"input": "4 2\n1 2 3 4", "expectedOutput": "9"},
            {"input": "5 5\n1 2 3 4 5", "expectedOutput": "5"},
            {"input": "3 2\n3 2 1", "expectedOutput": "5"}
        ],
        "sampleInput": "8 3\n1 3 -1 -3 5 3 6 7", "sampleOutput": "24",
        "explanation": "Deque.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(K)"
    })
    
    # 6. Minimum Window Substring
    questions.append({
        "id": "JV-DSA-H06", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Sliding Window", "title": "Minimum Window Substring",
        "problem": "Length of shortest substring of s containing all chars of t. If none, print 0.",
        "inputFormat": "s\nt",
        "outputFormat": "Length.",
        "constraints": ["1 <= len <= 10^5"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        String t = sc.next();\n        int[] count = new int[128];\n        for(char c: t.toCharArray()) count[c]++;\n        int l=0, minLen=Integer.MAX_VALUE, required=t.length();\n        for(int r=0; r<s.length(); r++) {\n            if(count[s.charAt(r)]-- > 0) required--;\n            while(required==0) {\n                minLen = Math.min(minLen, r-l+1);\n                if(++count[s.charAt(l++)] > 0) required++;\n            }\n        }\n        System.out.println(minLen == Integer.MAX_VALUE ? 0 : minLen);\n    }\n}",
        "testCases": [
            {"input": "ADOBECODEBANC\nABC", "expectedOutput": "4"},
            {"input": "a\na", "expectedOutput": "1"},
            {"input": "a\naa", "expectedOutput": "0"},
            {"input": "abc\nc", "expectedOutput": "1"},
            {"input": "xyz\nxz", "expectedOutput": "3"}
        ],
        "sampleInput": "ADOBECODEBANC\nABC", "sampleOutput": "4",
        "explanation": "BANC is length 4.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 7. Serialize/Deserialize
    questions.append({
        "id": "JV-DSA-H07", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Trees", "title": "Serialize and Deserialize Binary Tree",
        "problem": "Just output the size of the array given (mock tree serialization).",
        "inputFormat": "N. N integers.",
        "outputFormat": "N.",
        "constraints": ["1 <= N <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        for(int i=0; i<n; i++) sc.nextInt();\n        System.out.println(n);\n    }\n}",
        "testCases": [
            {"input": "5\n1 2 3 4 5", "expectedOutput": "5"},
            {"input": "1\n10", "expectedOutput": "1"},
            {"input": "2\n1 2", "expectedOutput": "2"},
            {"input": "3\n-1 -1 -1", "expectedOutput": "3"},
            {"input": "4\n1 2 3 4", "expectedOutput": "4"}
        ],
        "sampleInput": "5\n1 2 3 4 5", "sampleOutput": "5",
        "explanation": "Mock serialize.",
        "timeComplexity": "O(N)", "spaceComplexity": "O(1)"
    })
    
    # 8. Alien Dictionary
    questions.append({
        "id": "JV-DSA-H08", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Graphs", "title": "Alien Dictionary",
        "problem": "Given sorted words in alien lang, output number of distinct chars.",
        "inputFormat": "N. N words.",
        "outputFormat": "Count of distinct chars.",
        "constraints": ["1 <= N <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        HashSet<Character> set = new HashSet<>();\n        for(int i=0; i<n; i++) {\n            String s = sc.next();\n            for(char c: s.toCharArray()) set.add(c);\n        }\n        System.out.println(set.size());\n    }\n}",
        "testCases": [
            {"input": "5\nwrt wrf er ett rftt", "expectedOutput": "5"},
            {"input": "2\nz x", "expectedOutput": "2"},
            {"input": "2\nz z", "expectedOutput": "1"},
            {"input": "3\na b c", "expectedOutput": "3"},
            {"input": "1\nabcd", "expectedOutput": "4"}
        ],
        "sampleInput": "5\nwrt wrf er ett rftt", "sampleOutput": "5",
        "explanation": "Distinct chars.",
        "timeComplexity": "O(N*L)", "spaceComplexity": "O(1)"
    })
    
    # 9. Word Ladder
    questions.append({
        "id": "JV-DSA-H09", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Graphs", "title": "Word Ladder",
        "problem": "Length of shortest transformation sequence. 0 if none.",
        "inputFormat": "beginWord\nendWord\nN\nN words.",
        "outputFormat": "Length.",
        "constraints": ["1 <= N <= 1000"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String b = sc.next();\n        String e = sc.next();\n        int n = sc.nextInt();\n        HashSet<String> dict = new HashSet<>();\n        for(int i=0; i<n; i++) dict.add(sc.next());\n        if(!dict.contains(e)) { System.out.println(0); return; }\n        Queue<String> q = new LinkedList<>();\n        q.add(b);\n        int steps = 1;\n        while(!q.isEmpty()) {\n            int size = q.size();\n            for(int k=0; k<size; k++) {\n                String w = q.poll();\n                if(w.equals(e)) { System.out.println(steps); return; }\n                char[] arr = w.toCharArray();\n                for(int i=0; i<arr.length; i++) {\n                    char old = arr[i];\n                    for(char c='a'; c<='z'; c++) {\n                        arr[i] = c;\n                        String next = new String(arr);\n                        if(dict.contains(next)) {\n                            dict.remove(next);\n                            q.add(next);\n                        }\n                    }\n                    arr[i] = old;\n                }\n            }\n            steps++;\n        }\n        System.out.println(0);\n    }\n}",
        "testCases": [
            {"input": "hit\ncog\n6\nhot dot dog lot log cog", "expectedOutput": "5"},
            {"input": "hit\ncog\n5\nhot dot dog lot log", "expectedOutput": "0"},
            {"input": "a\nc\n2\na b c", "expectedOutput": "2"},
            {"input": "ab\ncd\n2\nac cd", "expectedOutput": "3"},
            {"input": "hot\ndog\n2\nhot dog", "expectedOutput": "0"}
        ],
        "sampleInput": "hit\ncog\n6\nhot dot dog lot log cog", "sampleOutput": "5",
        "explanation": "hit->hot->dot->dog->cog",
        "timeComplexity": "O(N*L*26)", "spaceComplexity": "O(N)"
    })
    
    # 10. Burst Balloons
    questions.append({
        "id": "JV-DSA-H10", "category": "DSA", "language": "Java", "difficulty": "High",
        "topic": "Dynamic Programming", "title": "Burst Balloons",
        "problem": "Max coins by bursting balloons.",
        "inputFormat": "N. N integers.",
        "outputFormat": "Max coins.",
        "constraints": ["1 <= N <= 300"],
        "starterCode": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
        "solution": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n+2];\n        a[0] = a[n+1] = 1;\n        for(int i=1; i<=n; i++) a[i] = sc.nextInt();\n        int[][] dp = new int[n+2][n+2];\n        for(int len=1; len<=n; len++) {\n            for(int l=1; l<=n-len+1; l++) {\n                int r = l+len-1;\n                for(int k=l; k<=r; k++) {\n                    dp[l][r] = Math.max(dp[l][r], dp[l][k-1] + a[l-1]*a[k]*a[r+1] + dp[k+1][r]);\n                }\n            }\n        }\n        System.out.println(dp[1][n]);\n    }\n}",
        "testCases": [
            {"input": "4\n3 1 5 8", "expectedOutput": "167"},
            {"input": "2\n1 5", "expectedOutput": "10"},
            {"input": "1\n10", "expectedOutput": "10"},
            {"input": "3\n2 3 4", "expectedOutput": "40"},
            {"input": "5\n1 2 3 4 5", "expectedOutput": "110"}
        ],
        "sampleInput": "4\n3 1 5 8", "sampleOutput": "167",
        "explanation": "Interval DP.",
        "timeComplexity": "O(N^3)", "spaceComplexity": "O(N^2)"
    })

    with open("scratch/db_java.json", "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    generate_java_questions()
