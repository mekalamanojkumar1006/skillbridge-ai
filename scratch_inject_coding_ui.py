import re

file_path = r"C:\Users\lenovo\antigravity\SkillBridge-AI\src\pages\DashboardPage.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update interviewStatus type
content = re.sub(
    r'const \[interviewStatus, setInterviewStatus\] = useState<"setup" \| "technical-setup" \| "active" \| "generating_report" \| "completed">',
    r'const [interviewStatus, setInterviewStatus] = useState<"setup" | "technical-setup" | "active" | "generating_report" | "completed" | "coding-practice">',
    content
)

# 2. Add import for CodingPracticeView
if "const CodingPracticeView = lazy(() => import('../components/coding-practice/CodingPracticeView'));" not in content:
    content = re.sub(
        r'(const ResumeBuilder = lazy\(\(\) => import\("../components/ResumeBuilder"\)\);)',
        r'\1\nconst CodingPracticeView = lazy(() => import("../components/coding-practice/CodingPracticeView"));',
        content
    )

# 3. Add 4th Card
grid_start_regex = r'(<div className="grid grid-cols-1 md:grid-cols-3 gap-6">)'
grid_start_replacement = r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">'
content = re.sub(grid_start_regex, grid_start_replacement, content)

coding_card_html = r"""
                          {/* Card 4: Open Coding Practice */}
                          <div className="glass-card hover:border-[#6D5DF6]/30 transition p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-orange-500/10 text-orange-600 rounded-bl-2xl font-mono text-[10px] font-bold">PRACTICE</div>
                            
                            <div className="space-y-4 pt-4">
                              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Code className="w-6 h-6 text-orange-500" />
                              </div>
                              <div>
                                <h3 className="text-xl font-black text-[var(--color-text-primary)]">Open Coding</h3>
                                <p className="text-xs text-[var(--color-text-secondary)] font-medium mt-2 leading-relaxed">
                                  Secure Docker sandbox for Python, Java, C++, JS.
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => setInterviewStatus("coding-practice")}
                              className="w-full py-3 clay-btn bg-orange-500 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md cursor-pointer rounded-xl hover:bg-orange-600 transition"
                            >
                              Start Practice
                            </button>
                          </div>
"""

# Insert Card 4 before the closing of the grid div
grid_end_str = r'</div>' + '\n' + r'                      )}' + '\n' + r'' + '\n' + r'                      {/* Performance Progression'
# since whitespaces can vary, let's just find the exact string we want to replace
import re
grid_end_regex = r'(</div>\s*)}\s*\{\/\* Performance Progression)'
content = re.sub(grid_end_regex, coding_card_html + r'\1', content)

# 4. Add rendering logic for coding-practice
render_coding_regex = r'(\{interviewStatus === "setup" && \()'
render_coding_replacement = r"""
                  {interviewStatus === "coding-practice" && (
                    renderWithSuspense(<CodingPracticeView onBack={() => setInterviewStatus("setup")} />)
                  )}
                  \1"""
content = re.sub(render_coding_regex, render_coding_replacement, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Dashboard updated successfully.")
