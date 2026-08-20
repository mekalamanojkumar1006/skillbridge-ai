import json

PROBLEMS = {
    "Find Maximum": {
        "problem": "Given an array of integers, find and print the largest element.",
        "inputFormat": "First line: n. Second line: n space-separated integers.",
        "outputFormat": "Print the maximum integer.",
        "constraints": ["1 <= n <= 100000", "-10^9 <= arr[i] <= 10^9"],
        "sampleInput": "5\n10 4 25 7 18",
        "sampleOutput": "25",
        "testCases": [
            {"input": "5\n10 4 25 7 18", "expectedOutput": "25"},
            {"input": "1\n-10", "expectedOutput": "-10"},
            {"input": "4\n-5 -2 -10 -1", "expectedOutput": "-1"}
        ]
    },
    "Reverse Array": {
        "problem": "Reverse the given array without using a built-in reverse function.",
        "inputFormat": "First line: n. Second line: n space-separated integers.",
        "outputFormat": "Print the reversed array, space-separated.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "5\n1 2 3 4 5",
        "sampleOutput": "5 4 3 2 1",
        "testCases": [
            {"input": "5\n1 2 3 4 5", "expectedOutput": "5 4 3 2 1"},
            {"input": "1\n10", "expectedOutput": "10"}
        ]
    },
    "Count Even and Odd Numbers": {
        "problem": "Given an integer array, count how many numbers are even and how many are odd.",
        "inputFormat": "First line: n. Second line: n space-separated integers.",
        "outputFormat": "Print Even: <count>\nOdd: <count>",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "6\n1 2 3 4 5 6",
        "sampleOutput": "Even: 3\nOdd: 3",
        "testCases": [
            {"input": "6\n1 2 3 4 5 6", "expectedOutput": "Even: 3\nOdd: 3"}
        ]
    },
    "Count Even/Odd": {
        "problem": "Given an integer array, count how many numbers are even and how many are odd.",
        "inputFormat": "First line: n. Second line: n space-separated integers.",
        "outputFormat": "Print Even: <count>\\nOdd: <count>",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "6\n1 2 3 4 5 6",
        "sampleOutput": "Even: 3\nOdd: 3",
        "testCases": [
            {"input": "6\n1 2 3 4 5 6", "expectedOutput": "Even: 3\nOdd: 3"}
        ]
    },
    "Count Frequencies": {
        "problem": "Given an integer array, count the frequencies of each element.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print elements and their counts in any order (e.g. 'elem: count').",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "5\n1 2 1 3 2",
        "sampleOutput": "1: 2\n2: 2\n3: 1",
        "testCases": [
            {"input": "5\n1 2 1 3 2", "expectedOutput": "1: 2\n2: 2\n3: 1"}
        ]
    },
    "Remove Duplicates from Sorted Array": {
        "problem": "Given a sorted array, remove duplicate values in-place and print the resulting array.",
        "inputFormat": "First line: n. Second line: n sorted integers.",
        "outputFormat": "Print the unique elements space-separated.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "7\n1 1 2 2 3 4 4",
        "sampleOutput": "1 2 3 4",
        "testCases": [
            {"input": "7\n1 1 2 2 3 4 4", "expectedOutput": "1 2 3 4"}
        ]
    },
    "Remove Duplicates": {
        "problem": "Given a sorted array, remove duplicate values in-place and print the resulting array.",
        "inputFormat": "First line: n. Second line: n sorted integers.",
        "outputFormat": "Print the unique elements space-separated.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "7\n1 1 2 2 3 4 4",
        "sampleOutput": "1 2 3 4",
        "testCases": [
            {"input": "7\n1 1 2 2 3 4 4", "expectedOutput": "1 2 3 4"}
        ]
    },
    "Linear Search": {
        "problem": "Find the index of a target value in an array. Print -1 if it does not exist.",
        "inputFormat": "First line: n. Second line: n integers. Third line: target.",
        "outputFormat": "Print the 0-based index or -1.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "5\n10 20 30 40 50\n30",
        "sampleOutput": "2",
        "testCases": [
            {"input": "5\n10 20 30 40 50\n30", "expectedOutput": "2"}
        ]
    },
    "Check Palindrome String": {
        "problem": "Determine whether a string reads the same forwards and backwards.",
        "inputFormat": "One string.",
        "outputFormat": "Print 'Palindrome' or 'Not Palindrome'.",
        "constraints": ["1 <= len(s) <= 1000"],
        "sampleInput": "madam",
        "sampleOutput": "Palindrome",
        "testCases": [
            {"input": "madam", "expectedOutput": "Palindrome"},
            {"input": "hello", "expectedOutput": "Not Palindrome"}
        ]
    },
    "Palindrome String": {
        "problem": "Determine whether a string reads the same forwards and backwards.",
        "inputFormat": "One string.",
        "outputFormat": "Print 'Palindrome' or 'Not Palindrome'.",
        "constraints": ["1 <= len(s) <= 1000"],
        "sampleInput": "madam",
        "sampleOutput": "Palindrome",
        "testCases": [
            {"input": "madam", "expectedOutput": "Palindrome"}
        ]
    },
    "Palindrome": {
        "problem": "Determine whether a string reads the same forwards and backwards.",
        "inputFormat": "One string.",
        "outputFormat": "Print 'Palindrome' or 'Not Palindrome'.",
        "constraints": ["1 <= len(s) <= 1000"],
        "sampleInput": "madam",
        "sampleOutput": "Palindrome",
        "testCases": [
            {"input": "madam", "expectedOutput": "Palindrome"}
        ]
    },
    "Find Second Largest Element": {
        "problem": "Find the second-largest distinct element.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the second largest element.",
        "constraints": ["2 <= n <= 100000"],
        "sampleInput": "6\n10 5 20 20 8 15",
        "sampleOutput": "15",
        "testCases": [
            {"input": "6\n10 5 20 20 8 15", "expectedOutput": "15"}
        ]
    },
    "Second Largest": {
        "problem": "Find the second-largest distinct element.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the second largest element.",
        "constraints": ["2 <= n <= 100000"],
        "sampleInput": "6\n10 5 20 20 8 15",
        "sampleOutput": "15",
        "testCases": [
            {"input": "6\n10 5 20 20 8 15", "expectedOutput": "15"}
        ]
    },
    "Merge Two Sorted Arrays": {
        "problem": "Merge two sorted arrays into one sorted array.",
        "inputFormat": "First line: n. Second line: n integers. Third line: m. Fourth line: m integers.",
        "outputFormat": "Print the merged sorted array.",
        "constraints": ["1 <= n, m <= 100000"],
        "sampleInput": "3\n1 3 5\n4\n2 4 6 8",
        "sampleOutput": "1 2 3 4 5 6 8",
        "testCases": [
            {"input": "3\n1 3 5\n4\n2 4 6 8", "expectedOutput": "1 2 3 4 5 6 8"}
        ]
    },
    "Merge Sorted Arrays": {
        "problem": "Merge two sorted arrays into one sorted array.",
        "inputFormat": "First line: n. Second line: n integers. Third line: m. Fourth line: m integers.",
        "outputFormat": "Print the merged sorted array.",
        "constraints": ["1 <= n, m <= 100000"],
        "sampleInput": "3\n1 3 5\n4\n2 4 6 8",
        "sampleOutput": "1 2 3 4 5 6 8",
        "testCases": [
            {"input": "3\n1 3 5\n4\n2 4 6 8", "expectedOutput": "1 2 3 4 5 6 8"}
        ]
    },
    "Move Zeros to End": {
        "problem": "Move all zeros to the end while maintaining relative order of non-zero elements.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the modified array.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "6\n0 1 0 3 12 0",
        "sampleOutput": "1 3 12 0 0 0",
        "testCases": [
            {"input": "6\n0 1 0 3 12 0", "expectedOutput": "1 3 12 0 0 0"}
        ]
    },
    "Move Zeros": {
        "problem": "Move all zeros to the end while maintaining relative order of non-zero elements.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the modified array.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "6\n0 1 0 3 12 0",
        "sampleOutput": "1 3 12 0 0 0",
        "testCases": [
            {"input": "6\n0 1 0 3 12 0", "expectedOutput": "1 3 12 0 0 0"}
        ]
    },
    "Find Missing Number": {
        "problem": "Numbers from 0 to n are given with one number missing. Find it.",
        "inputFormat": "First line: n. Second line: n-1 distinct integers.",
        "outputFormat": "Print the missing number.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "5\n3 0 1 4 5",
        "sampleOutput": "2",
        "testCases": [
            {"input": "5\n3 0 1 4 5", "expectedOutput": "2"}
        ]
    },
    "Missing Number": {
        "problem": "Numbers from 0 to n are given with one number missing. Find it.",
        "inputFormat": "First line: n. Second line: n-1 distinct integers.",
        "outputFormat": "Print the missing number.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "5\n3 0 1 4 5",
        "sampleOutput": "2",
        "testCases": [
            {"input": "5\n3 0 1 4 5", "expectedOutput": "2"}
        ]
    },
    "Two Sum": {
        "problem": "Find two indices whose values add up to the target.",
        "inputFormat": "First line: n. Second line: n integers. Third line: target.",
        "outputFormat": "Print the two 0-based indices space-separated.",
        "constraints": ["2 <= n <= 100000"],
        "sampleInput": "4\n2 7 11 15\n9",
        "sampleOutput": "0 1",
        "testCases": [
            {"input": "4\n2 7 11 15\n9", "expectedOutput": "0 1"}
        ]
    },
    "Longest Substring Without Repeating Characters": {
        "problem": "Find the length of the longest substring without repeating characters.",
        "inputFormat": "One string.",
        "outputFormat": "Print the length.",
        "constraints": ["1 <= len(s) <= 10000"],
        "sampleInput": "abcabcbb",
        "sampleOutput": "3",
        "testCases": [
            {"input": "abcabcbb", "expectedOutput": "3"}
        ]
    },
    "Longest Unique Substring": {
        "problem": "Find the length of the longest substring without repeating characters.",
        "inputFormat": "One string.",
        "outputFormat": "Print the length.",
        "constraints": ["1 <= len(s) <= 10000"],
        "sampleInput": "abcabcbb",
        "sampleOutput": "3",
        "testCases": [
            {"input": "abcabcbb", "expectedOutput": "3"}
        ]
    },
    "Valid Parentheses": {
        "problem": "Determine if the input string of brackets is valid.",
        "inputFormat": "One string of brackets.",
        "outputFormat": "Print 'Valid' or 'Invalid'.",
        "constraints": ["1 <= len(s) <= 10000"],
        "sampleInput": "{[()]}",
        "sampleOutput": "Valid",
        "testCases": [
            {"input": "{[()]}", "expectedOutput": "Valid"},
            {"input": "{[(])}", "expectedOutput": "Invalid"}
        ]
    },
    "Binary Search": {
        "problem": "Given a sorted array, find the target index using binary search. Print -1 if not found.",
        "inputFormat": "First line: n. Second line: n sorted integers. Third line: target.",
        "outputFormat": "Print the 0-based index or -1.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "6\n1 3 5 7 9 11\n7",
        "sampleOutput": "3",
        "testCases": [
            {"input": "6\n1 3 5 7 9 11\n7", "expectedOutput": "3"}
        ]
    },
    "Maximum Subarray Sum": {
        "problem": "Find the contiguous subarray with the largest sum and print its sum.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the maximum sum.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "sampleOutput": "6",
        "testCases": [
            {"input": "9\n-2 1 -3 4 -1 2 1 -5 4", "expectedOutput": "6"}
        ]
    },
    "Maximum Subarray": {
        "problem": "Find the contiguous subarray with the largest sum and print its sum.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the maximum sum.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "sampleOutput": "6",
        "testCases": [
            {"input": "9\n-2 1 -3 4 -1 2 1 -5 4", "expectedOutput": "6"}
        ]
    },
    "Rotate Array": {
        "problem": "Rotate an array to the right by k positions.",
        "inputFormat": "First line: n. Second line: n integers. Third line: k.",
        "outputFormat": "Print the rotated array.",
        "constraints": ["1 <= n <= 100000"],
        "sampleInput": "5\n1 2 3 4 5\n2",
        "sampleOutput": "4 5 1 2 3",
        "testCases": [
            {"input": "5\n1 2 3 4 5\n2", "expectedOutput": "4 5 1 2 3"}
        ]
    },
    "Merge Overlapping Intervals": {
        "problem": "Merge overlapping intervals.",
        "inputFormat": "First line: n. Next n lines: two integers representing start and end.",
        "outputFormat": "Print each merged interval on a new line.",
        "constraints": ["1 <= n <= 10000"],
        "sampleInput": "4\n1 3\n2 6\n8 10\n9 12",
        "sampleOutput": "1 6\n8 12",
        "testCases": [
            {"input": "4\n1 3\n2 6\n8 10\n9 12", "expectedOutput": "1 6\n8 12"}
        ]
    },
    "Merge Intervals": {
        "problem": "Merge overlapping intervals.",
        "inputFormat": "First line: n. Next n lines: two integers representing start and end.",
        "outputFormat": "Print each merged interval on a new line.",
        "constraints": ["1 <= n <= 10000"],
        "sampleInput": "4\n1 3\n2 6\n8 10\n9 12",
        "sampleOutput": "1 6\n8 12",
        "testCases": [
            {"input": "4\n1 3\n2 6\n8 10\n9 12", "expectedOutput": "1 6\n8 12"}
        ]
    },
    "Reverse Linked List": {
        "problem": "Given a singly linked list (represented as an array), reverse it.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the reversed values.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "5\n1 2 3 4 5",
        "sampleOutput": "5 4 3 2 1",
        "testCases": [
            {"input": "5\n1 2 3 4 5", "expectedOutput": "5 4 3 2 1"}
        ]
    },
    "Detect Linked List Cycle": {
        "problem": "Determine whether a linked list contains a cycle. For testing, we provide n nodes and an index of the cycle start.",
        "inputFormat": "First line: n. Second line: cycle_index (-1 if no cycle).",
        "outputFormat": "Print 'Cycle' or 'No Cycle'.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "4\n1",
        "sampleOutput": "Cycle",
        "testCases": [
            {"input": "4\n1", "expectedOutput": "Cycle"}
        ]
    },
    "Detect Cycle": {
        "problem": "Determine whether a linked list contains a cycle.",
        "inputFormat": "First line: n. Second line: cycle_index (-1 if no cycle).",
        "outputFormat": "Print 'Cycle' or 'No Cycle'.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "4\n1",
        "sampleOutput": "Cycle",
        "testCases": [
            {"input": "4\n1", "expectedOutput": "Cycle"}
        ]
    },
    "Level Order Traversal": {
        "problem": "Given a binary tree (represented as array where -1 is null), print nodes level by level.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print each level on a new line.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "7\n1 2 3 4 5 6 7",
        "sampleOutput": "1\n2 3\n4 5 6 7",
        "testCases": [
            {"input": "7\n1 2 3 4 5 6 7", "expectedOutput": "1\n2 3\n4 5 6 7"}
        ]
    },
    "Binary Tree Height": {
        "problem": "Find the height of a binary tree.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the height.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "7\n1 2 3 4 5 6 7",
        "sampleOutput": "3",
        "testCases": [
            {"input": "7\n1 2 3 4 5 6 7", "expectedOutput": "3"}
        ]
    },
    "Tree Height": {
        "problem": "Find the height of a binary tree.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the height.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "7\n1 2 3 4 5 6 7",
        "sampleOutput": "3",
        "testCases": [
            {"input": "7\n1 2 3 4 5 6 7", "expectedOutput": "3"}
        ]
    },
    "Number of Islands": {
        "problem": "Count the number of islands in a 2D grid.",
        "inputFormat": "First line: rows cols. Next 'rows' lines: grid of 0s and 1s.",
        "outputFormat": "Print the number of islands.",
        "constraints": ["1 <= rows, cols <= 300"],
        "sampleInput": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
        "sampleOutput": "3",
        "testCases": [
            {"input": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", "expectedOutput": "3"}
        ]
    },
    "Course Schedule": {
        "problem": "Determine if you can finish all courses given prerequisites.",
        "inputFormat": "First line: numCourses. Second line: numPrerequisites. Next lines: pairs.",
        "outputFormat": "Print 'True' or 'False'.",
        "constraints": ["1 <= numCourses <= 2000"],
        "sampleInput": "2\n1\n1 0",
        "sampleOutput": "True",
        "testCases": [
            {"input": "2\n1\n1 0", "expectedOutput": "True"}
        ]
    },
    "Dijkstra Shortest Path": {
        "problem": "Find the shortest path from source to all vertices.",
        "inputFormat": "Vertices, Edges. Next E lines: u v w. Last line: source.",
        "outputFormat": "Print shortest distances.",
        "constraints": ["1 <= V <= 1000"],
        "sampleInput": "3 3\n0 1 1\n1 2 2\n0 2 4\n0",
        "sampleOutput": "0 1 3",
        "testCases": [
            {"input": "3 3\n0 1 1\n1 2 2\n0 2 4\n0", "expectedOutput": "0 1 3"}
        ]
    },
    "Dijkstra": {
        "problem": "Find the shortest path from source to all vertices.",
        "inputFormat": "Vertices, Edges. Next E lines: u v w. Last line: source.",
        "outputFormat": "Print shortest distances.",
        "constraints": ["1 <= V <= 1000"],
        "sampleInput": "3 3\n0 1 1\n1 2 2\n0 2 4\n0",
        "sampleOutput": "0 1 3",
        "testCases": [
            {"input": "3 3\n0 1 1\n1 2 2\n0 2 4\n0", "expectedOutput": "0 1 3"}
        ]
    },
    "Word Break": {
        "problem": "Determine if a string can be segmented into a space-separated sequence of dictionary words.",
        "inputFormat": "First line: string. Second line: N. Next N lines: dictionary words.",
        "outputFormat": "Print 'True' or 'False'.",
        "constraints": ["1 <= len(s) <= 300"],
        "sampleInput": "leetcode\n2\nleet\ncode",
        "sampleOutput": "True",
        "testCases": [
            {"input": "leetcode\n2\nleet\ncode", "expectedOutput": "True"}
        ]
    },
    "Longest Increasing Subsequence": {
        "problem": "Find the length of the longest strictly increasing subsequence.",
        "inputFormat": "First line: n. Second line: n integers.",
        "outputFormat": "Print the length.",
        "constraints": ["1 <= n <= 2500"],
        "sampleInput": "8\n10 9 2 5 3 7 101 18",
        "sampleOutput": "4",
        "testCases": [
            {"input": "8\n10 9 2 5 3 7 101 18", "expectedOutput": "4"}
        ]
    },
    "0/1 Knapsack": {
        "problem": "Given weights and values, find maximum value for capacity W.",
        "inputFormat": "N, W. Next line: N values. Next line: N weights.",
        "outputFormat": "Print max value.",
        "constraints": ["1 <= N <= 100"],
        "sampleInput": "3 50\n60 100 120\n10 20 30",
        "sampleOutput": "220",
        "testCases": [
            {"input": "3 50\n60 100 120\n10 20 30", "expectedOutput": "220"}
        ]
    },
    "N-Queens": {
        "problem": "Find the number of distinct solutions to the N-Queens puzzle.",
        "inputFormat": "First line: n.",
        "outputFormat": "Print the number of solutions.",
        "constraints": ["1 <= n <= 9"],
        "sampleInput": "4",
        "sampleOutput": "2",
        "testCases": [
            {"input": "4", "expectedOutput": "2"}
        ]
    },
    "Trie Autocomplete": {
        "problem": "Implement a Trie and count words starting with a prefix.",
        "inputFormat": "First line: n words. Second line: prefix.",
        "outputFormat": "Print count.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "3\napple app application\napp",
        "sampleOutput": "3",
        "testCases": [
            {"input": "3\napple app application\napp", "expectedOutput": "3"}
        ]
    },
    "Implement Trie": {
        "problem": "Implement a Trie and count words starting with a prefix.",
        "inputFormat": "First line: n words. Second line: prefix.",
        "outputFormat": "Print count.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "3\napple app application\napp",
        "sampleOutput": "3",
        "testCases": [
            {"input": "3\napple app application\napp", "expectedOutput": "3"}
        ]
    },
    "Trie Implementation": {
        "problem": "Implement a Trie and count words starting with a prefix.",
        "inputFormat": "First line: n words. Second line: prefix.",
        "outputFormat": "Print count.",
        "constraints": ["1 <= n <= 1000"],
        "sampleInput": "3\napple app application\napp",
        "sampleOutput": "3",
        "testCases": [
            {"input": "3\napple app application\napp", "expectedOutput": "3"}
        ]
    },
    "Merge K Sorted Lists": {
        "problem": "Merge k sorted linked lists and return it as one sorted list.",
        "inputFormat": "First line: k. Next lines: arrays.",
        "outputFormat": "Print merged array.",
        "constraints": ["1 <= k <= 100"],
        "sampleInput": "3\n1 4 5\n1 3 4\n2 6",
        "sampleOutput": "1 1 2 3 4 4 5 6",
        "testCases": [
            {"input": "3\n1 4 5\n1 3 4\n2 6", "expectedOutput": "1 1 2 3 4 4 5 6"}
        ]
    },
    "Minimum Spanning Tree": {
        "problem": "Find the weight of the Minimum Spanning Tree.",
        "inputFormat": "V, E. Next E lines: u v w.",
        "outputFormat": "Print MST weight.",
        "constraints": ["1 <= V <= 1000"],
        "sampleInput": "4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4",
        "sampleOutput": "19",
        "testCases": [
            {"input": "4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4", "expectedOutput": "19"}
        ]
    },
    "Kruskal MST": {
        "problem": "Find the weight of the Minimum Spanning Tree.",
        "inputFormat": "V, E. Next E lines: u v w.",
        "outputFormat": "Print MST weight.",
        "constraints": ["1 <= V <= 1000"],
        "sampleInput": "4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4",
        "sampleOutput": "19",
        "testCases": [
            {"input": "4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4", "expectedOutput": "19"}
        ]
    }
}

OUTLINE = {
    "Python": {
        "Low": ["Find Maximum Element", "Reverse an Array", "Count Even and Odd Numbers", "Remove Duplicates from Sorted Array", "Linear Search", "Check Palindrome String", "Find Second Largest Element", "Merge Two Sorted Arrays", "Move Zeros to End", "Find Missing Number"],
        "Medium": ["Two Sum", "Longest Substring Without Repeating Characters", "Valid Parentheses", "Binary Search", "Maximum Subarray Sum", "Rotate Array", "Merge Overlapping Intervals", "Reverse Linked List", "Detect Linked List Cycle", "Level Order Traversal"],
        "High": ["Number of Islands", "Course Schedule", "Dijkstra Shortest Path", "Word Break", "Longest Increasing Subsequence", "0/1 Knapsack", "N-Queens", "Trie Autocomplete", "Merge K Sorted Lists", "Minimum Spanning Tree"]
    },
    "Java": {
        "Low": ["Find Maximum", "Reverse Array", "Count Frequencies", "Linear Search", "Palindrome String", "Second Largest", "Remove Duplicates", "Move Zeros", "Merge Sorted Arrays", "Missing Number"],
        "Medium": ["Two Sum", "Valid Parentheses", "Binary Search", "Longest Unique Substring", "Maximum Subarray", "Merge Intervals", "Reverse Linked List", "Detect Cycle", "Binary Tree Height", "Level Order Traversal"],
        "High": ["Number of Islands", "Dijkstra", "Course Schedule", "Word Break", "Longest Increasing Subsequence", "0/1 Knapsack", "N-Queens", "Implement Trie", "Merge K Sorted Lists", "Minimum Spanning Tree"]
    },
    "C++": {
        "Low": ["Find Maximum", "Reverse Array", "Count Even/Odd", "Linear Search", "Palindrome", "Second Largest", "Remove Duplicates", "Move Zeros", "Merge Sorted Arrays", "Missing Number"],
        "Medium": ["Two Sum", "Valid Parentheses", "Binary Search", "Longest Unique Substring", "Maximum Subarray", "Merge Intervals", "Reverse Linked List", "Detect Cycle", "Tree Height", "Level Order Traversal"],
        "High": ["Number of Islands", "Dijkstra", "Course Schedule", "Word Break", "Longest Increasing Subsequence", "0/1 Knapsack", "N-Queens", "Trie Implementation", "Merge K Sorted Lists", "Kruskal MST"]
    },
    "JavaScript": {
        "Low": ["Find Maximum", "Reverse Array", "Count Even/Odd", "Linear Search", "Palindrome", "Second Largest", "Remove Duplicates", "Move Zeros", "Merge Sorted Arrays", "Missing Number"],
        "Medium": ["Two Sum", "Valid Parentheses", "Binary Search", "Longest Unique Substring", "Maximum Subarray", "Merge Intervals", "Reverse Linked List", "Detect Cycle", "Tree Height", "Level Order Traversal"],
        "High": ["Number of Islands", "Dijkstra", "Course Schedule", "Word Break", "Longest Increasing Subsequence", "0/1 Knapsack", "N-Queens", "Trie Implementation", "Merge K Sorted Lists", "Minimum Spanning Tree"]
    }
}

starter_codes = {
    "Python": "import sys\n\ndef solve():\n    pass\n\nif __name__ == '__main__':\n    solve()",
    "Java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // implementation\n    }\n}",
    "C++": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // implementation\n    return 0;\n}",
    "JavaScript": "const fs = require('fs');\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8');\n}\nsolve();"
}

output_list = []
idx = 1
for lang, levels in OUTLINE.items():
    for diff, titles in levels.items():
        for idx_title, title in enumerate(titles):
            # Try to find problem def
            prob_def = PROBLEMS.get(title)
            if not prob_def:
                # Some titles like "Find Maximum Element" might be mapped to "Find Maximum"
                # Do a fuzzy match
                for k in PROBLEMS.keys():
                    if k in title or title in k:
                        prob_def = PROBLEMS[k]
                        break
            
            if not prob_def:
                print(f"WARNING: Could not find definition for {title}")
                prob_def = {
                    "problem": "Solve the problem.",
                    "inputFormat": "Standard input",
                    "outputFormat": "Standard output",
                    "constraints": ["1 <= N <= 10^5"],
                    "sampleInput": "1",
                    "sampleOutput": "1",
                    "testCases": [{"input": "1", "expectedOutput": "1"}]
                }

            lang_short = {"Python": "PY", "Java": "JV", "C++": "CPP", "JavaScript": "JS"}[lang]
            diff_short = diff[0].upper()
            q_id = f"{lang_short}-DSA-{diff_short}{idx_title+1:02d}"

            item = {
                "id": q_id,
                "category": "DSA",
                "language": lang,
                "difficulty": diff,
                "title": title,
                "problem": prob_def["problem"],
                "inputFormat": prob_def["inputFormat"],
                "outputFormat": prob_def["outputFormat"],
                "constraints": prob_def["constraints"],
                "sampleInput": prob_def["sampleInput"],
                "sampleOutput": prob_def["sampleOutput"],
                "explanation": "See sample.",
                "starterCode": starter_codes[lang],
                "solution": starter_codes[lang] + "\n# Reference Solution Omitted",
                "testCases": prob_def["testCases"],
                "timeLimitMs": 2000,
                "memoryLimitMb": 256,
                "tags": ["dsa"]
            }
            output_list.append(item)

with open('src/data/codingQuestions.json', 'w', encoding='utf-8') as f:
    json.dump(output_list, f, indent=2)

print(f"Generated {len(output_list)} DSA coding questions.")
