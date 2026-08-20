import re

with open('src/pages/DashboardPage.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

states = []
for line in lines:
    if 'useState' in line and '=' in line and 'const' in line:
        states.append(line.strip())

with open('states.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(states))
