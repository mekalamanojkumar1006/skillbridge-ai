import json
import uuid

def generate_low_questions():
    questions = []
    def add_q(topic, q, opts, ans, exp):
        questions.append({
            "id": f"py-low-{uuid.uuid4().hex[:8]}",
            "language": "Python",
            "topic": topic,
            "difficulty": "Low",
            "question": q,
            "options": opts,
            "correctAnswer": ans,
            "explanation": exp
        })

    # 1. Intro to Python
    add_q("Intro to Python", "Who created Python?", ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"], 0, "Python was created by Guido van Rossum and first released in 1991.")
    add_q("Intro to Python", "Which of the following is true about Python?", ["It is a compiled language only", "It is an interpreted language", "It is a low-level language", "It does not support object-oriented programming"], 1, "Python is a high-level, interpreted programming language.")
    add_q("Intro to Python", "What file extension is used for Python source code?", [".pt", ".pyc", ".py", ".python"], 2, "Python source code is saved with the .py extension.")
    add_q("Intro to Python", "Is Python case-sensitive?", ["Yes", "No", "Only for variable names", "Only for function names"], 0, "Python is completely case-sensitive.")
    add_q("Intro to Python", "Which character is used to write a single-line comment in Python?", ["//", "/*", "#", "<!--"], 2, "The # symbol is used for single-line comments in Python.")
    add_q("Intro to Python", "What is PEP 8?", ["A Python web framework", "Python's standard style guide", "A built-in data structure", "A module for database connection"], 1, "PEP 8 is the official Style Guide for Python Code.")
    add_q("Intro to Python", "What is the primary interactive prompt in Python called?", ["REPL", "Bash", "CMD", "Terminal"], 0, "The interactive shell is called REPL (Read-Eval-Print Loop).")
    add_q("Intro to Python", "Python is considered a 'dynamically typed' language. What does this mean?", ["Variable types are explicitly declared", "Variable types are determined at runtime", "Variables can only hold one type of data forever", "Variables do not have types"], 1, "Dynamically typed means the interpreter infers the type at runtime.")
    add_q("Intro to Python", "Which of these paradigms does Python support?", ["Object-oriented only", "Procedural only", "Functional only", "Multiple paradigms including OOP, functional, and procedural"], 3, "Python is a multi-paradigm programming language.")
    add_q("Intro to Python", "What is the output of the command `python --version`?", ["Prints the Python logo", "Prints the current Python interpreter version", "Opens the REPL", "Installs Python"], 1, "It prints the currently installed version of Python.")

    # 2. Variables & Data Types
    add_q("Variables & Data Types", "Which of the following is a valid variable name in Python?", ["1_variable", "my-var", "_my_var", "my var"], 2, "Variable names can start with an underscore or letter, but not numbers or contain spaces/hyphens.")
    add_q("Variables & Data Types", "What is the data type of the value 3.14?", ["int", "float", "double", "decimal"], 1, "In Python, numbers with decimal points are of type 'float'.")
    add_q("Variables & Data Types", "How do you assign the value 10 to a variable named x?", ["let x = 10", "x := 10", "x = 10", "int x = 10"], 2, "Variables are assigned using the = operator without declaring a type.")
    add_q("Variables & Data Types", "Which built-in function returns the type of a variable?", ["type()", "typeof()", "getType()", "datatype()"], 0, "The type() function returns the class/type of an object.")
    add_q("Variables & Data Types", "What is the result of type('Hello')?", ["<class 'string'>", "<class 'str'>", "<class 'text'>", "<class 'char'>"], 1, "Strings in Python are objects of the 'str' class.")
    add_q("Variables & Data Types", "Which of the following represents a boolean value in Python?", ["true", "TRUE", "True", "1"], 2, "Boolean values in Python must be capitalized: True and False.")
    add_q("Variables & Data Types", "Can a variable change its data type in Python after assignment?", ["Yes", "No", "Only if explicitly casted", "Only inside functions"], 0, "Since Python is dynamically typed, a variable can be reassigned to a different data type.")
    add_q("Variables & Data Types", "What is the data type of `x = [1, 2, 3]`?", ["tuple", "set", "dict", "list"], 3, "Square brackets denote a list in Python.")
    add_q("Variables & Data Types", "Which keyword is NOT used to declare a variable in Python?", ["var", "let", "const", "None of these are used"], 3, "Python does not use keywords to declare variables; you simply assign a value.")
    add_q("Variables & Data Types", "What is the value of x after: `x, y = 10, 20`?", ["20", "10", "(10, 20)", "Error"], 1, "Python supports multiple assignment, so x gets 10 and y gets 20.")

    # 3. Sequence of Instructions
    add_q("Sequence of Instructions", "In Python, how is the sequence of instructions generally executed?", ["Bottom to top", "Top to bottom", "Randomly", "Middle outwards"], 1, "Python executes code sequentially from top to bottom.")
    add_q("Sequence of Instructions", "What does a syntax error indicate regarding the sequence of instructions?", ["The logic is wrong", "The program ran but failed", "The interpreter could not parse the code structure", "The loop is infinite"], 2, "Syntax errors halt execution before it begins because the structure is invalid.")
    add_q("Sequence of Instructions", "If line 1 creates variable A and line 2 prints A, what happens if line 3 modifies A?", ["Line 2 prints the modified A", "Line 2 prints the original A", "The program crashes", "A cannot be modified"], 1, "Instructions are executed in order. Line 2 prints A before Line 3 modifies it.")
    add_q("Sequence of Instructions", "How are statements separated in Python?", ["By semicolons only", "By commas", "By newlines", "By periods"], 2, "Python uses newlines to separate statements, though semicolons can optionally be used.")
    add_q("Sequence of Instructions", "What is the primary way Python groups a sequence of instructions into a block?", ["Curly braces {}", "Parentheses ()", "Indentation", "Begin/End keywords"], 2, "Python uses indentation to define blocks of code.")
    add_q("Sequence of Instructions", "If an error occurs on line 5 of a 10-line Python script, what happens to lines 1-4?", ["They are never executed", "They execute normally before the script crashes", "They execute but their output is hidden", "They are reversed"], 1, "Because Python is interpreted, instructions prior to the runtime error execute normally.")
    add_q("Sequence of Instructions", "Which term describes the normal top-to-bottom execution of code?", ["Iterative flow", "Sequential flow", "Conditional flow", "Recursive flow"], 1, "Sequential flow is the default execution pattern.")
    add_q("Sequence of Instructions", "Can you use a variable before it is defined in the sequence?", ["Yes", "No", "Only if it is a number", "Only if inside a function"], 1, "A variable must be defined before it is used in the sequential flow (NameError otherwise).")
    add_q("Sequence of Instructions", "How does a blank line affect the sequence of instructions?", ["It causes a syntax error", "It stops execution", "It is ignored by the interpreter", "It prints a newline character"], 2, "Blank lines are ignored by the Python interpreter.")
    add_q("Sequence of Instructions", "What is the output of:\nx=5\nx=10\nprint(x)", ["5", "10", "15", "Error"], 1, "The sequence assigns 5, then overwrites it with 10 before printing.")

    # 4. Input & Output Basics
    add_q("Input & Output Basics", "Which built-in function is used to display output?", ["display()", "out()", "write()", "print()"], 3, "The print() function outputs data to the console.")
    add_q("Input & Output Basics", "Which function is used to take user input from the console?", ["scan()", "input()", "read()", "get()"], 1, "The input() function reads a line from input.")
    add_q("Input & Output Basics", "What data type does the `input()` function always return?", ["int", "float", "str", "bool"], 2, "input() always returns a string, regardless of what the user types.")
    add_q("Input & Output Basics", "How do you print multiple items on one line?", ["print(a b)", "print(a, b)", "print(a; b)", "print(a + b) only"], 1, "Passing multiple arguments separated by commas prints them separated by spaces.")
    add_q("Input & Output Basics", "What is the default separator between multiple arguments in `print()`?", ["No space", "A comma", "A space", "A newline"], 2, "The default 'sep' value in print() is a space ' '.")
    add_q("Input & Output Basics", "How do you prevent `print()` from adding a newline at the end?", ["print(x, newline=False)", "print(x, end='')", "print(x, no_nl=True)", "print_inline(x)"], 1, "Setting the 'end' parameter to an empty string prevents the newline.")
    add_q("Input & Output Basics", "Which of the following prompts the user for their name?", ["input('What is your name?')", "print('What is your name?')", "get('What is your name?')", "prompt('What is your name?')"], 0, "The input() function accepts an optional prompt string argument.")
    add_q("Input & Output Basics", "What happens if you run `print('A', 'B', sep='-')`?", ["A B-", "A-B", "A- B", "A B -"], 1, "The 'sep' parameter changes the separator from a space to a hyphen.")
    add_q("Input & Output Basics", "Can `print()` output different data types at once, like `print('Age:', 25)`?", ["Yes", "No, requires typecasting", "Only if they are all numbers", "Only if they are all strings"], 0, "print() automatically converts arguments to strings before printing.")
    add_q("Input & Output Basics", "How can you print a backslash `\\`?", ["print('\')", "print('\\')", "print('\\\\')", "print('//')"], 2, "A double backslash '\\\\' is used to escape and print a single backslash.")

    # 5. Type Conversions
    add_q("Type Conversions", "How do you convert a string '123' to an integer?", ["int('123')", "integer('123')", "to_int('123')", "cast('123', int)"], 0, "The int() function converts a string containing a whole number to an integer.")
    add_q("Type Conversions", "What will `float(5)` return?", ["5", "5.0", "'5.0'", "Error"], 1, "float() converts an integer to a floating-point number, adding a decimal.")
    add_q("Type Conversions", "How do you convert the integer 42 to a string?", ["str(42)", "string(42)", "to_string(42)", "text(42)"], 0, "The str() function converts numbers and other objects to strings.")
    add_q("Type Conversions", "What happens if you try `int('3.14')`?", ["Returns 3", "Returns 3.14", "Raises a ValueError", "Returns 4"], 2, "int() cannot directly convert a string representation of a float; it raises a ValueError.")
    add_q("Type Conversions", "Which of the following converts a boolean True to an integer?", ["int(True)", "num(True)", "bool_to_int(True)", "True.int()"], 0, "int(True) evaluates to 1.")
    add_q("Type Conversions", "What does `bool(0)` return?", ["True", "False", "0", "None"], 1, "The integer 0 is considered 'falsy', so bool(0) returns False.")
    add_q("Type Conversions", "What does `bool('False')` return?", ["True", "False", "Error", "None"], 0, "Any non-empty string evaluates to True, even the string 'False'.")
    add_q("Type Conversions", "How do you safely combine a string and an integer in a print statement without commas?", ["print('Age: ' + 25)", "print('Age: ' & 25)", "print('Age: ' + str(25))", "print('Age: ' . 25)"], 2, "You must convert the integer to a string using str() before concatenating with +.")
    add_q("Type Conversions", "What is the result of `int(4.9)`?", ["4", "5", "4.9", "Error"], 0, "int() truncates floating-point numbers towards zero; it does not round.")
    add_q("Type Conversions", "What is 'implicit' type conversion in Python?", ["When you manually use int(), float(), etc.", "When Python automatically converts data types during an operation", "When the user inputs a string", "When a variable is deleted"], 1, "Implicit conversion is done automatically, like int + float yielding a float.")

    # 6. Relational Operations
    add_q("Relational Operations", "Which operator checks if two values are equal?", ["=", "==", "===", "=>"], 1, "The == operator checks for equality, while = is for assignment.")
    add_q("Relational Operations", "What does the `!=` operator mean?", ["Not equal to", "Greater than", "Less than", "Equal to"], 0, "The != operator evaluates to True if operands are not equal.")
    add_q("Relational Operations", "What is the result of `5 > 3`?", ["True", "False", "5", "3"], 0, "5 is greater than 3, so it evaluates to True.")
    add_q("Relational Operations", "Which operator means 'less than or equal to'?", ["<=", "=<", "<!", "<>"], 0, "The <= operator means less than or equal to.")
    add_q("Relational Operations", "What is the result of `10 >= 10`?", ["True", "False", "Error", "None"], 0, "10 is equal to 10, satisfying the 'or equal to' part of >=.")
    add_q("Relational Operations", "Can relational operators be chained in Python (e.g., `1 < x < 5`)?", ["Yes", "No", "Only for integers", "Only with parentheses"], 0, "Python allows chaining of relational operators for mathematical-style comparisons.")
    add_q("Relational Operations", "What is the result of `'apple' == 'Apple'`?", ["True", "False", "Error", "None"], 1, "String comparison is case-sensitive, so they are not equal.")
    add_q("Relational Operations", "What will `5.0 == 5` return?", ["True", "False", "Error", "None"], 0, "Python evaluates the values as numerically equal regardless of float vs int type.")
    add_q("Relational Operations", "Which of the following is NOT a relational operator?", ["==", "!=", ">=", "=>"], 3, "=> is an arrow function syntax in JS, not a relational operator in Python.")
    add_q("Relational Operations", "What is the result of `True > False`?", ["True", "False", "Error", "None"], 0, "In Python, True is treated as 1 and False as 0, so 1 > 0 is True.")

    # 7. Logical Operators
    add_q("Logical Operators", "Which of the following are Python's logical operators?", ["&&, ||, !", "and, or, not", "AND, OR, NOT", "&, |, ~"], 1, "Python uses the English words 'and', 'or', and 'not' for logical operations.")
    add_q("Logical Operators", "What does the `and` operator do?", ["Returns True if either condition is True", "Returns True only if both conditions are True", "Reverses the condition", "Returns False always"], 1, "The 'and' operator requires all operands to be True.")
    add_q("Logical Operators", "What is the result of `True or False`?", ["True", "False", "Error", "None"], 0, "The 'or' operator returns True if at least one operand is True.")
    add_q("Logical Operators", "What does the `not` operator do?", ["Adds a negative sign", "Inverts the boolean value", "Checks for inequality", "Returns True"], 1, "The 'not' operator negates a boolean value (e.g., not True is False).")
    add_q("Logical Operators", "What is the result of `not (5 > 2)`?", ["True", "False", "Error", "None"], 1, "5 > 2 is True, and 'not True' is False.")
    add_q("Logical Operators", "In an `and` operation, if the first operand is False, what does Python do?", ["Evaluates the second operand anyway", "Throws an error", "Short-circuits and returns False", "Returns True"], 2, "Python uses short-circuit evaluation; it stops evaluating if the result is guaranteed.")
    add_q("Logical Operators", "In an `or` operation, if the first operand is True, what does Python do?", ["Evaluates the second operand", "Returns False", "Short-circuits and returns True", "Throws an error"], 2, "Since one True is enough for 'or', Python short-circuits and returns True.")
    add_q("Logical Operators", "What is the result of `(1 == 1) and (2 == 3)`?", ["True", "False", "1", "3"], 1, "True and False evaluates to False.")
    add_q("Logical Operators", "Which operator has the highest precedence?", ["and", "or", "not", "They are equal"], 2, "The 'not' operator has higher precedence than 'and', which has higher precedence than 'or'.")
    add_q("Logical Operators", "What does `bool(0 or '')` evaluate to?", ["True", "False", "Error", "None"], 1, "Both 0 and '' are falsy, so 'or' returns the last falsy value, which evaluates to False.")

    # 8. Conditional Statements
    add_q("Conditional Statements", "Which keyword is used to start a conditional statement?", ["if", "when", "case", "check"], 0, "The 'if' keyword begins a conditional block.")
    add_q("Conditional Statements", "What keyword is used for 'else if' in Python?", ["elseif", "else if", "elif", "elsif"], 2, "Python uses 'elif' for secondary conditions.")
    add_q("Conditional Statements", "Which of the following is required at the end of an `if` statement line?", ["Semicolon (;)", "Colon (:)", "Curly brace ({)", "Nothing"], 1, "A colon (:) is required to denote the start of the indented block.")
    add_q("Conditional Statements", "How does Python know which lines belong to the `if` block?", ["They are enclosed in {}", "They are enclosed in ()", "They are indented", "They end with semicolons"], 2, "Indentation defines code blocks in Python.")
    add_q("Conditional Statements", "What happens if the `if` condition is False and there is no `else` block?", ["The program crashes", "The code inside the if block executes anyway", "The code inside the if block is skipped", "An infinite loop occurs"], 2, "If the condition is False and no alternative is provided, the block is simply skipped.")
    add_q("Conditional Statements", "Can an `if` statement have multiple `elif` blocks?", ["Yes", "No", "Only one", "Only two"], 0, "You can chain as many `elif` blocks as needed.")
    add_q("Conditional Statements", "Is the `else` block mandatory?", ["Yes", "No", "Only if `elif` is used", "Only in loops"], 1, "The `else` block is optional.")
    add_q("Conditional Statements", "What is the output of:\nif 5 > 10:\n  print('A')\nelse:\n  print('B')", ["A", "B", "Nothing", "Error"], 1, "5 > 10 is False, so the else block executes, printing 'B'.")
    add_q("Conditional Statements", "What does `pass` do inside an `if` block?", ["Throws an error", "Exits the program", "Does nothing (acts as a placeholder)", "Skips to the next elif"], 2, "The `pass` keyword is a null statement used as a placeholder.")
    add_q("Conditional Statements", "Which of these is a valid single-line if-else (ternary) expression?", ["x = 5 if True else 10", "if True x = 5 else 10", "x = if True: 5 else: 10", "x = 5 ? True : 10"], 0, "Python's ternary operator syntax is `[on_true] if [condition] else [on_false]`.")

    # 9. Nested Conditional Statements
    add_q("Nested Conditional Statements", "What is a nested conditional statement?", ["An if statement inside another if statement", "An if statement with multiple conditions (and/or)", "An if statement without an else", "An if statement that loops"], 0, "Nesting means placing one control structure inside another.")
    add_q("Nested Conditional Statements", "How do you define a nested `if` block in Python?", ["Use the `nested` keyword", "Increase the indentation level", "Use double colons (::)", "Put it on the same line"], 1, "You must indent the nested block further than the outer block.")
    add_q("Nested Conditional Statements", "In a nested `if`, when is the inner `if` condition checked?", ["Always", "Only if the outer condition is True", "Only if the outer condition is False", "Before the outer condition"], 1, "The inner block is only reached if the outer condition evaluates to True.")
    add_q("Nested Conditional Statements", "Can you place an `if` statement inside an `elif` or `else` block?", ["Yes", "No", "Only in `elif`", "Only in `else`"], 0, "Any conditional block can contain nested conditionals.")
    add_q("Nested Conditional Statements", "What is the output of:\nx = 10\nif x > 5:\n  if x == 10:\n    print('A')\n  else:\n    print('B')", ["A", "B", "Nothing", "Error"], 0, "Both x > 5 and x == 10 are True, so 'A' is printed.")
    add_q("Nested Conditional Statements", "If a nested `if` fails, does it trigger the outer `else` block?", ["Yes", "No", "Always", "It crashes"], 1, "No, it only triggers its own corresponding `else` block (if one exists).")
    add_q("Nested Conditional Statements", "What is a common risk of deeply nested conditional statements?", ["They run faster", "They become hard to read and maintain", "They cause syntax errors", "They automatically become loops"], 1, "Deep nesting reduces readability (often called the 'arrow anti-pattern').")
    add_q("Nested Conditional Statements", "Is there a limit to how deeply you can nest `if` statements in Python?", ["Max 3 levels", "Max 10 levels", "No strict limit, but bounded by memory/readability", "Max 1 level"], 2, "Python has no explicit limit on nesting depth for conditionals, though practical limits apply.")
    add_q("Nested Conditional Statements", "How many levels of indentation are required for a double-nested `if` (an `if` inside an `if` inside an `if`)?", ["1", "2", "3", "0"], 2, "Each level of nesting requires an additional level of indentation.")
    add_q("Nested Conditional Statements", "Can you use logical operators (`and`) to flatten a nested `if`?", ["Yes", "No", "Only if variables are numbers", "Only using `or`"], 0, "Combining conditions with `and` often flattens a nested `if` into a single `if` statement.")

    # 10. Loops (while loop, for loop)
    add_q("Loops", "Which loop is best used when the number of iterations is known in advance?", ["while loop", "for loop", "do-while loop", "until loop"], 1, "A 'for' loop is typically used to iterate over a known sequence or range.")
    add_q("Loops", "Which keyword is used to create a loop that runs as long as a condition is True?", ["for", "repeat", "while", "loop"], 2, "The 'while' loop executes as long as its condition remains True.")
    add_q("Loops", "What function is commonly used with `for` loops to generate a sequence of numbers?", ["sequence()", "list()", "range()", "generate()"], 2, "The range() function generates a sequence of integers.")
    add_q("Loops", "What will `range(3)` generate?", ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 3, 3"], 1, "range(n) generates numbers from 0 up to n-1.")
    add_q("Loops", "What happens if the condition in a `while` loop never becomes False?", ["Syntax error", "The loop is skipped", "An infinite loop occurs", "The program exits gracefully"], 2, "If the condition never evaluates to False, the loop will run infinitely.")
    add_q("Loops", "In `for i in range(1, 5):`, what is the final value of `i` inside the loop?", ["3", "4", "5", "6"], 1, "The range(1, 5) stops at 4 (one less than the stop value).")
    add_q("Loops", "Does Python have a built-in `do-while` loop?", ["Yes", "No", "Yes, but it is called `repeat-until`", "Only in Python 3"], 1, "Python does not have a do-while loop structure.")
    add_q("Loops", "What is the output of:\nx = 0\nwhile x < 2:\n  print(x)\n  x += 1", ["0\n1", "1\n2", "0\n1\n2", "2"], 0, "The loop runs for x=0 and x=1, printing both.")
    add_q("Loops", "Can you loop over a string in Python?", ["Yes, using a while loop only", "Yes, using a for loop", "No, strings are immutable", "Only if converted to a list first"], 1, "Strings are iterable, so you can iterate character by character using a for loop.")
    add_q("Loops", "What is the purpose of the `else` clause in a Python loop?", ["It runs if the loop throws an error", "It runs when the loop condition becomes False naturally (no break)", "It runs before the loop starts", "It replaces the `if` statement"], 1, "An else block on a loop executes if the loop finishes its iterations without encountering a `break` statement.")

    # 11. String Methods
    add_q("String Methods", "Which method converts all characters in a string to lowercase?", ["lower()", "lowercase()", "to_lower()", "down()"], 0, "The lower() method returns a lowercase version of the string.")
    add_q("String Methods", "What does the `upper()` method do?", ["Capitalizes the first letter", "Converts the string to all uppercase", "Reverses the string", "Removes spaces"], 1, "upper() converts all characters to uppercase.")
    add_q("String Methods", "Which method removes whitespace from the beginning and end of a string?", ["strip()", "trim()", "remove()", "clean()"], 0, "The strip() method removes leading and trailing whitespace.")
    add_q("String Methods", "What does `replace('a', 'b')` do?", ["Replaces all occurrences of 'a' with 'b'", "Replaces the first occurrence only", "Throws an error if 'a' is missing", "Swaps 'a' and 'b'"], 0, "replace() replaces all occurrences of a substring unless a count is specified.")
    add_q("String Methods", "Which method splits a string into a list based on a delimiter?", ["divide()", "split()", "break()", "cut()"], 1, "The split() method splits a string into a list.")
    add_q("String Methods", "What is the output of `'hello'.capitalize()`?", ["HELLO", "Hello", "hello", "hELLO"], 1, "capitalize() makes the first character uppercase and the rest lowercase.")
    add_q("String Methods", "How do you find the index of the first occurrence of 'a' in 'banana'?", ["'banana'.find('a')", "'banana'.index_of('a')", "'banana'.search('a')", "'banana'.locate('a')"], 0, "find() returns the lowest index of the substring (or -1 if not found).")
    add_q("String Methods", "Which method checks if a string contains only digits?", ["isnumber()", "isdigit()", "isnumeric()", "Both isdigit() and isnumeric()"], 3, "Both isdigit() and isnumeric() can check for numeric characters.")
    add_q("String Methods", "What does `'a'.join(['1', '2'])` output?", ["1,2a", "a1a2", "1a2", "12a"], 2, "The join() method joins iterable elements using the string as a separator.")
    add_q("String Methods", "Are strings mutable in Python? Can string methods change the original string?", ["Yes, they modify in place", "No, strings are immutable. Methods return a new string.", "Only lower() and upper() modify in place", "Yes, if cast to a list"], 1, "Strings are immutable, so all string methods return a new string object.")

    # 12. Nested Loops
    add_q("Nested Loops", "What is a nested loop?", ["A loop that runs infinitely", "A loop inside another loop", "A loop that calls a function", "A loop without a body"], 1, "A nested loop is a loop placed within the block of another loop.")
    add_q("Nested Loops", "In a nested `for` loop, how many times does the inner loop execute?", ["Once for each iteration of the outer loop", "Once overall", "Only on the last iteration", "Twice as many times as the outer loop"], 0, "The inner loop runs completely from start to finish for every single iteration of the outer loop.")
    add_q("Nested Loops", "What is a common use case for a nested loop?", ["Printing a single word", "Iterating over a 2D grid or matrix", "Reading a file line by line", "Converting string to int"], 1, "Nested loops are perfect for traversing 2D arrays, grids, or matrices (rows and columns).")
    add_q("Nested Loops", "If the outer loop runs 3 times and the inner loop runs 4 times, how many times does the inner loop body execute in total?", ["7", "12", "3", "4"], 1, "The total executions equal outer iterations multiplied by inner iterations (3 * 4 = 12).")
    add_q("Nested Loops", "Can you nest a `while` loop inside a `for` loop?", ["Yes", "No", "Only in functions", "Only if they use the same variable"], 0, "You can mix and match any types of loops.")
    add_q("Nested Loops", "What happens to the inner loop variable when the inner loop restarts?", ["It continues from its last value", "It resets to its starting value", "It causes an error", "It is deleted"], 1, "Every time the inner loop is called by the outer loop, it initializes fresh from the beginning.")
    add_q("Nested Loops", "What does the `break` statement do in a nested loop?", ["Exits all loops completely", "Exits the innermost loop currently executing", "Restarts the outer loop", "Skips an iteration"], 1, "A break statement only terminates the loop it is directly placed in (the innermost one).")
    add_q("Nested Loops", "What is the output of:\nfor i in range(1):\n  for j in range(2):\n    print(j)", ["0\n1", "1\n2", "0\n0", "1\n1"], 0, "The outer loop runs once (i=0). The inner loop runs twice (j=0, j=1), printing 0 then 1.")
    add_q("Nested Loops", "Is there a limit to how many loops you can nest?", ["2", "3", "No technical limit, but readability and performance suffer", "10"], 2, "While allowed, deeply nested loops cause exponential time complexity (O(N^x)) and are hard to read.")
    add_q("Nested Loops", "In nested loops iterating over a grid `grid[row][col]`, which loop usually represents `row`?", ["The inner loop", "The outer loop", "Neither", "Both"], 1, "Typically, the outer loop iterates through rows, and the inner loop iterates through columns within that row.")

    # 13. Loop Control Statements
    add_q("Loop Control Statements", "What does the `break` statement do?", ["Skips the current iteration", "Exits the loop entirely", "Pauses the loop", "Restarts the loop"], 1, "The break statement terminates the loop immediately.")
    add_q("Loop Control Statements", "What does the `continue` statement do?", ["Exits the loop entirely", "Skips the rest of the current iteration and moves to the next", "Pauses the loop", "Does nothing"], 1, "The continue statement jumps back to the loop header for the next iteration.")
    add_q("Loop Control Statements", "What does the `pass` statement do in a loop?", ["Exits the loop", "Skips an iteration", "Acts as a null placeholder doing nothing", "Generates an error"], 2, "The pass statement is syntactically required but executes no code.")
    add_q("Loop Control Statements", "If `break` is executed inside an inner loop, does the outer loop stop?", ["Yes", "No", "It depends on the condition", "It causes a syntax error"], 1, "The break statement only affects the innermost loop enclosing it.")
    add_q("Loop Control Statements", "Can `break` and `continue` be used outside of loops?", ["Yes, in if statements", "Yes, anywhere", "No, they raise a SyntaxError", "Only in functions"], 2, "Break and continue are only valid inside loop structures.")
    add_q("Loop Control Statements", "What happens to the `else` clause of a loop if the loop is terminated by a `break` statement?", ["The else block executes", "The else block is skipped", "It throws an error", "It loops again"], 1, "The else block only executes if the loop completes normally, not if it is broken out of.")
    add_q("Loop Control Statements", "What is the output of:\nfor i in range(3):\n  if i == 1:\n    continue\n  print(i)", ["0\n1\n2", "0\n2", "1", "0"], 1, "When i is 1, continue skips the print statement, so only 0 and 2 are printed.")
    add_q("Loop Control Statements", "What is the output of:\nfor i in range(3):\n  if i == 1:\n    break\n  print(i)", ["0\n1\n2", "0", "0\n1", "Error"], 1, "When i is 1, break stops the loop, so only 0 is printed.")
    add_q("Loop Control Statements", "Which statement is useful for creating infinite loops like `while True:` that stop based on user input?", ["continue", "pass", "break", "exit"], 2, "You can use break inside an if condition to escape an intentionally infinite loop.")
    add_q("Loop Control Statements", "Is `exit()` a loop control statement?", ["Yes", "No, it terminates the entire Python script", "Yes, it acts like break", "No, it pauses the loop"], 1, "exit() or quit() stops the entire Python program, not just the loop.")

    # 14. Comparing Strings & Naming Variables
    add_q("Comparing Strings & Naming Variables", "How does Python compare two strings alphabetically?", ["Using the length of the string", "Comparing ASCII/Unicode values character by character", "By the number of vowels", "It randomly guesses"], 1, "Python compares strings lexicographically based on their Unicode code points.")
    add_q("Comparing Strings & Naming Variables", "What is the result of `'apple' < 'banana'`?", ["True", "False", "Error", "None"], 0, "Because 'a' has a lower Unicode value than 'b', 'apple' comes before 'banana'.")
    add_q("Comparing Strings & Naming Variables", "Which string is 'greater' in Python: 'Zebra' or 'apple'?", ["'Zebra'", "'apple'", "They are equal", "Error"], 1, "Uppercase letters have lower Unicode values than lowercase letters ('Z' is 90, 'a' is 97). So 'apple' > 'Zebra'.")
    add_q("Comparing Strings & Naming Variables", "Which of the following is an invalid variable name?", ["user_name", "_user", "2nd_user", "userName"], 2, "Variable names cannot begin with a number.")
    add_q("Comparing Strings & Naming Variables", "What is the naming convention for variables in Python defined by PEP 8?", ["camelCase", "PascalCase", "snake_case", "kebab-case"], 2, "PEP 8 recommends snake_case (lowercase with underscores) for variable and function names.")
    add_q("Comparing Strings & Naming Variables", "Can you use Python keywords (like `if`, `for`, `class`) as variable names?", ["Yes", "No, it causes a SyntaxError", "Only if capitalized", "Only inside functions"], 1, "Reserved keywords cannot be used as identifiers.")
    add_q("Comparing Strings & Naming Variables", "What is the result of `'A' == 'a'`?", ["True", "False", "Error", "None"], 1, "String comparison is strictly case-sensitive.")
    add_q("Comparing Strings & Naming Variables", "How can you perform a case-insensitive string comparison?", ["str1 == str2", "str1.lower() == str2.lower()", "str1.equal(str2, ignore_case=True)", "str1 ~ str2"], 1, "Converting both strings to the same case (lower or upper) allows case-insensitive comparison.")
    add_q("Comparing Strings & Naming Variables", "Are `myvar`, `MyVar`, and `MYVAR` the same variable in Python?", ["Yes", "No", "Only in Python 2", "Yes, if defined in the same file"], 1, "Python is case-sensitive, so these are three distinct variables.")
    add_q("Comparing Strings & Naming Variables", "Which function returns the Unicode code point of a single character?", ["chr()", "ord()", "unicode()", "ascii()"], 1, "The ord() function returns the integer Unicode value of a character.")

    # 15. Lists
    add_q("Lists", "How do you create an empty list in Python?", ["list = {}", "list = []", "list = ()", "list = empty()"], 1, "An empty list is created using empty square brackets [] or list().")
    add_q("Lists", "Are Python lists mutable or immutable?", ["Mutable", "Immutable", "Only strings are mutable", "Depends on the data type inside"], 0, "Lists are mutable, meaning their elements can be changed, added, or removed after creation.")
    add_q("Lists", "How do you access the first element of a list named `my_list`?", ["my_list[1]", "my_list[0]", "my_list.first()", "my_list(0)"], 1, "Python uses 0-based indexing, so the first element is at index 0.")
    add_q("Lists", "What index is used to access the last element of a list?", ["length - 1", "0", "-1", "last"], 2, "Python supports negative indexing, where -1 represents the last element.")
    add_q("Lists", "Can a Python list contain elements of different data types?", ["Yes", "No, only numbers", "No, only strings", "Only if it is a tuple"], 0, "Lists in Python are heterogeneous and can contain mixed data types (e.g., [1, 'apple', True]).")
    add_q("Lists", "Which function returns the number of elements in a list?", ["size()", "count()", "length()", "len()"], 3, "The len() function returns the length of a list.")
    add_q("Lists", "What is the result of `[1, 2] + [3, 4]`?", ["[4, 6]", "[1, 2, 3, 4]", "Error", "[[1, 2], [3, 4]]"], 1, "The + operator concatenates two lists.")
    add_q("Lists", "What happens if you access an index that is larger than the list length?", ["Returns None", "Returns 0", "Raises an IndexError", "Expands the list automatically"], 2, "Accessing an out-of-bounds index raises an IndexError.")
    add_q("Lists", "How do you change the second element of `lst` to 10?", ["lst[1] = 10", "lst[2] = 10", "lst.set(1, 10)", "lst.replace(2, 10)"], 0, "You assign a new value directly to the index (index 1 is the second element).")
    add_q("Lists", "What does `lst[1:3]` do?", ["Returns elements at index 1, 2, and 3", "Returns elements at index 1 and 2", "Replaces elements", "Deletes elements"], 1, "Slicing [start:stop] is inclusive of start and exclusive of stop, returning indices 1 and 2.")

    # 16. Working with Lists
    add_q("Working with Lists", "Which method adds a new element to the end of a list?", ["add()", "push()", "insert()", "append()"], 3, "The append() method adds a single item to the end of the list.")
    add_q("Working with Lists", "Which method removes the first occurrence of a specific value from a list?", ["delete()", "remove()", "pop()", "discard()"], 1, "The remove(value) method removes the first matching value.")
    add_q("Working with Lists", "What does the `pop()` method do without arguments?", ["Removes and returns the first element", "Removes and returns the last element", "Deletes the list", "Throws an error"], 1, "pop() with no arguments removes and returns the item at the end of the list (index -1).")
    add_q("Working with Lists", "How do you insert an element 'A' at index 2?", ["list.add(2, 'A')", "list.insert(2, 'A')", "list[2].add('A')", "list.put(2, 'A')"], 1, "The insert(index, element) method inserts an item at a specific position.")
    add_q("Working with Lists", "Which method sorts a list in place?", ["sort()", "sorted()", "order()", "arrange()"], 0, "The sort() method modifies the original list to be sorted. (sorted() returns a new list).")
    add_q("Working with Lists", "How do you reverse the order of elements in a list in place?", ["list.flip()", "list.backwards()", "list.reverse()", "list[::-1] only"], 2, "The reverse() method reverses the elements of the list in place.")
    add_q("Working with Lists", "What does `list.extend([1, 2])` do?", ["Adds a list inside the list as one element", "Adds elements 1 and 2 individually to the end", "Replaces the list with [1, 2]", "Error"], 1, "extend() appends each element from an iterable to the end of the list.")
    add_q("Working with Lists", "How do you count how many times the value 5 appears in a list?", ["list.count(5)", "list.tally(5)", "count(list, 5)", "list.freq(5)"], 0, "The count(value) method returns the number of occurrences.")
    add_q("Working with Lists", "Which keyword can delete an element at a specific index, e.g., index 0?", ["remove 0", "del list[0]", "delete list[0]", "discard list[0]"], 1, "The 'del' statement removes an element by its index.")
    add_q("Working with Lists", "What does `list.clear()` do?", ["Deletes the list object entirely", "Sets all elements to None", "Removes all elements, leaving an empty list", "Raises an error"], 2, "clear() removes all items from the list.")

    # 17. Lists and Strings
    add_q("Lists and Strings", "How do you convert a string 'hello' into a list of its characters?", ["list('hello')", "['hello']", "split('hello')", "chars('hello')"], 0, "Passing a string to the list() constructor breaks it into a list of characters.")
    add_q("Lists and Strings", "What method converts a list of strings `['a', 'b']` into a single string `'ab'`?", ["concat()", "join()", "merge()", "combine()"], 1, "The ''.join(list) method joins the elements of a list into a string.")
    add_q("Lists and Strings", "What is the output of `'a,b,c'.split(',')`?", ["['a', 'b', 'c']", "['a,b,c']", "('a', 'b', 'c')", "'abc'"], 0, "split(',') divides the string at every comma, returning a list of substrings.")
    add_q("Lists and Strings", "Can you use list methods like `.append()` on a string?", ["Yes", "No, strings are immutable", "Only if the string is empty", "Only in Python 3"], 1, "Strings don't have list methods like append() because they cannot be modified in place.")
    add_q("Lists and Strings", "What is the output of `'-'.join(['x', 'y'])`?", ["xy", "x-y", "x - y", "-xy-"], 1, "The string '-' is used as the separator to join 'x' and 'y'.")
    add_q("Lists and Strings", "Which slicing syntax reverses both strings and lists?", ["[1:-1]", "[:-1]", "[::-1]", "[0:0:-1]"], 2, "The slice [::-1] steps backward through the entire sequence.")
    add_q("Lists and Strings", "How does indexing behave differently between strings and lists?", ["Strings are 1-based, lists are 0-based", "It behaves exactly the same", "Lists do not support negative indexing", "Strings do not support indexing"], 1, "Indexing works identically for both, as both are sequence types.")
    add_q("Lists and Strings", "What happens if you try to modify a string character by index (e.g., `s[0] = 'H'`)?", ["It works normally", "It raises a TypeError", "It modifies all 'H' characters", "It creates a list"], 1, "Strings are immutable, so item assignment raises a TypeError.")
    add_q("Lists and Strings", "Is a string considered an iterable in Python?", ["Yes, you can loop over its characters", "No, only lists are iterable", "Yes, but only with while loops", "No, strings are primitive types"], 0, "Strings are iterables, meaning they can be used in a for loop.")
    add_q("Lists and Strings", "What is the output of `'abc' * 3`?", ["['abc', 'abc', 'abc']", "'abcabcabc'", "Error", "'a b c a b c'"], 1, "The multiplication operator repeats the string.")

    with open("scratch/python_mcq_low.json", "w") as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    generate_low_questions()
