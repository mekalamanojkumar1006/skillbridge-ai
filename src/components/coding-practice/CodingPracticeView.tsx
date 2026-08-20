import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import TestPanel from './TestPanel';
import { Play, Send, ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface CodingPracticeViewProps {
  onBack: () => void;
}

const CodingPracticeView: React.FC<CodingPracticeViewProps> = ({ onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Python");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Low");
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);

  const languages = ["Python", "Java", "C++", "JavaScript"];
  const difficulties = ["Low", "Medium", "High"];

  useEffect(() => {
    fetchQuestions();
  }, [selectedLanguage, selectedDifficulty]);

  const fetchQuestions = async () => {
    try {
      // Use the FastAPI backend (port 8000) for coding endpoints
      const res = await fetch(`http://localhost:8000/api/interview/coding/questions?category=DSA&language=${selectedLanguage}&difficulty=${selectedDifficulty}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
        if (data.questions && data.questions.length > 0) {
          selectQuestion(data.questions[0]);
        } else {
          setCurrentQuestion(null);
          setCode("");
        }
      }
    } catch (err) {
      console.error("Failed to fetch coding questions:", err);
    }
  };

  const selectQuestion = async (q: any) => {
    setCurrentQuestion(q);
    try {
      const res = await fetch(`http://localhost:8000/api/interview/coding/questions/${q.id}`);
      if (res.ok) {
        const fullQ = await res.json();
        setCurrentQuestion(fullQ);
        setCode(fullQ.starterCode || "");
        setCustomInput(fullQ.sampleInput || "");
        setOutput(null);
        setError(null);
        setSubmitResult(null);
      }
    } catch (err) {
      console.error("Failed to load full question:", err);
    }
  };

  const handleRun = async () => {
    if (!code) return;
    setIsRunning(true);
    setOutput(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/interview/coding/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          customInput: customInput
        })
      });
      const data = await res.json();
      if (data.exitCode === 0) {
        setOutput(data.stdout);
        if (data.stderr) {
          setOutput(prev => prev + "\n[Warnings/Stderr]:\n" + data.stderr);
        }
      } else {
        setError(data.stderr || "Execution failed");
      }
      setExecutionTime(data.executionMs);
      setMemory(data.memoryKb);
    } catch (err) {
      setError("Failed to reach sandbox server.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code || !currentQuestion) return;
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/interview/coding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          questionId: currentQuestion.id,
          userId: "test-user" // Mock user ID for now
        })
      });
      const data = await res.json();
      setSubmitResult(data);
    } catch (err) {
      console.error("Failed to submit:", err);
      setSubmitResult({ status: "ERROR", runtimeError: "Failed to reach sandbox server." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[800px] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          <div>
            <h2 className="text-xl font-black text-[var(--color-text-primary)]">Open Coding Practice</h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono uppercase tracking-wider">Isolated Sandbox Environment</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs font-bold text-[var(--color-text-primary)] outline-none"
          >
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs font-bold text-[var(--color-text-primary)] outline-none"
          >
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Questions & Problem Statement */}
        <div className="lg:col-span-1 space-y-4 flex flex-col">
          <div className="glass-card p-4">
            <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] uppercase font-bold mb-2">Select Problem</label>
            <select 
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none"
              onChange={(e) => {
                const q = questions.find(q => q.id === e.target.value);
                if (q) selectQuestion(q);
              }}
              value={currentQuestion?.id || ""}
            >
              <option value="" disabled>Select a problem...</option>
              {questions.map((q, i) => (
                <option key={q.id} value={q.id}>{i + 1}. {q.title}</option>
              ))}
            </select>
          </div>
          
          {currentQuestion ? (
            <div className="glass-card p-5 flex-1 overflow-y-auto">
              <h3 className="text-lg font-black text-[var(--color-text-primary)] mb-3">{currentQuestion.title}</h3>
              <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Problem Statement</h4>
                  <p className="whitespace-pre-wrap">{currentQuestion.problem}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Input Format</h4>
                  <p className="whitespace-pre-wrap">{currentQuestion.inputFormat}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Output Format</h4>
                  <p className="whitespace-pre-wrap">{currentQuestion.outputFormat}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Constraints</h4>
                  <ul className="list-disc pl-5">
                    {currentQuestion.constraints?.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--color-bg-tertiary)] p-3 rounded-lg font-mono text-xs">
                  <div className="font-bold text-[var(--color-text-primary)] mb-1">Sample Input</div>
                  <pre className="whitespace-pre-wrap">{currentQuestion.sampleInput}</pre>
                  <div className="font-bold text-[var(--color-text-primary)] mt-3 mb-1">Sample Output</div>
                  <pre className="whitespace-pre-wrap">{currentQuestion.sampleOutput}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card flex-1 flex items-center justify-center text-center p-6 text-[var(--color-text-secondary)] text-sm">
              No questions found for the selected language and difficulty.
            </div>
          )}
        </div>

        {/* Right Column: Editor & Test Panel */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="flex-1 glass-card overflow-hidden border border-[var(--color-border)] min-h-[400px]">
            <CodeEditor 
              language={selectedLanguage.toLowerCase() === "c++" ? "cpp" : selectedLanguage.toLowerCase()}
              value={code}
              onChange={(val) => setCode(val || "")}
            />
          </div>
          
          <div className="h-64">
            <TestPanel 
              customInput={customInput}
              setCustomInput={setCustomInput}
              output={output}
              error={error}
              executionTime={executionTime}
              memory={memory}
            />
          </div>

          {/* Action Buttons & Results */}
          <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full">
              {submitResult && (
                <div className={`flex items-center space-x-2 text-sm font-bold ${submitResult.status === 'PASSED' ? 'text-green-500' : 'text-red-500'}`}>
                  {submitResult.status === 'PASSED' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>
                    {submitResult.status}: {submitResult.passedTests}/{submitResult.totalTests} Tests Passed
                  </span>
                  {submitResult.failedTestCaseDetails && (
                    <span className="text-xs font-mono font-normal ml-2 text-[var(--color-text-secondary)] block">
                      Failed at Test #{submitResult.failedTestCaseDetails.testCase + 1}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              <button 
                onClick={handleRun}
                disabled={isRunning || isSubmitting || !code}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] font-bold text-sm hover:bg-[var(--color-bg-primary)] transition disabled:opacity-50"
              >
                {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>Run</span>
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting || !code}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2 rounded-xl clay-btn clay-btn-primary text-white font-bold text-sm transition disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPracticeView;
