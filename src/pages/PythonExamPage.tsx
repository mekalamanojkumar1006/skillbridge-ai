import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Clock, CheckCircle, XCircle } from "lucide-react";

export default function PythonExamPage({ user, onNavigate, theme }: any) {
  const [mode, setMode] = useState<"dashboard" | "session" | "result">("dashboard");
  const [level, setLevel] = useState<"low" | "medium" | "high">("low");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/exams/python/history");
      const data = await res.json();
      if (data.attempts) {
        setHistory(data.attempts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startExam = async (selectedLevel: "low" | "medium" | "high") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/exams/python/${selectedLevel}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuestions(data.questions);
      setLevel(selectedLevel);
      setAnswers({});
      setCurrentIdx(0);
      setTimeLeft(30 * 60);
      setMode("session");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/exams/python/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          answers,
          startedAt: new Date(Date.now() - (30 * 60 - timeLeft) * 1000).toISOString()
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      fetchHistory();
      setMode("result");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "session" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (mode === "session" && timeLeft <= 0) {
      submitExam();
    }
  }, [timeLeft, mode]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (mode === "dashboard") {
    return (
      <div className="p-8 max-w-6xl mx-auto min-h-screen">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center text-blue-500 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-2">Python Mock Exam</h1>
        <p className="text-gray-500 mb-8">Test your Python skills across three difficulty levels.</p>
        
        {error && <div className="bg-red-500/10 text-red-500 p-4 rounded mb-6">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { id: "low", title: "Beginner", desc: "Easy, Python basics.", count: 30, color: "text-green-500", border: "border-green-500" },
            { id: "medium", title: "Intermediate", desc: "Medium, Data Structures.", count: 30, color: "text-yellow-500", border: "border-yellow-500" },
            { id: "high", title: "Advanced", desc: "Hard, Advanced Python.", count: 30, color: "text-red-500", border: "border-red-500" }
          ].map(lvl => (
            <div key={lvl.id} className={`p-6 rounded-xl border ${theme==="dark"?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-2 ${lvl.color}`}>{lvl.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{lvl.count} Questions • {lvl.desc}</p>
              <button 
                onClick={() => startExam(lvl.id as any)} 
                disabled={loading}
                className="w-full flex items-center justify-center py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Play className="w-4 h-4 mr-2" /> Start Exam
              </button>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Your Exam History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No exam attempts yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((att: any, i) => (
              <div key={i} className={`p-4 rounded-lg flex items-center justify-between ${theme==="dark"?"bg-gray-800":"bg-gray-50"}`}>
                <div>
                  <div className="font-bold capitalize">{att.level} Level</div>
                  <div className="text-sm text-gray-500">{new Date(att.completedAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${att.percentage >= 60 ? "text-green-500" : "text-red-500"}`}>
                    {att.percentage}%
                  </div>
                  <div className="text-sm text-gray-500">{att.percentage >= 60 ? "Passed" : "Needs Improvement"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (mode === "session") {
    const q = questions[currentIdx];
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold capitalize">{level} Level Exam</h2>
          <div className="flex items-center text-lg font-mono bg-gray-800 text-white px-4 py-2 rounded">
            <Clock className="w-5 h-5 mr-2" /> {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="mb-6 text-sm text-gray-400">Question {currentIdx + 1} of {questions.length}</div>
        
        {q && (
          <div className={`p-6 rounded-xl mb-8 ${theme==="dark"?"bg-gray-800":"bg-white shadow"}`}>
            <h3 className="text-lg font-medium whitespace-pre-wrap mb-6">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [q.id]: i })}
                  className={`w-full text-left p-4 rounded-lg border transition ${answers[q.id] === i ? "border-blue-500 bg-blue-500/10" : (theme==="dark"?"border-gray-700 hover:border-gray-500":"border-gray-200 hover:border-gray-400")}`}
                >
                  <span className="inline-block w-6 text-gray-500 font-bold">{["A", "B", "C", "D"][i]}</span> {opt}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="px-4 py-2 rounded border border-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          
          <button 
            onClick={() => {
              if (currentIdx === questions.length - 1) submitExam();
              else setCurrentIdx(currentIdx + 1);
            }}
            disabled={loading}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {currentIdx === questions.length - 1 ? "Submit Exam" : "Next"}
          </button>
        </div>
        
        <div className="mt-12 flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-8 h-8 rounded text-sm flex items-center justify-center ${currentIdx === i ? "ring-2 ring-blue-500" : ""} ${answers[questions[i].id] !== undefined ? "bg-blue-600 text-white" : (theme==="dark"?"bg-gray-800":"bg-gray-200")}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "result" && result) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-screen">
        <button onClick={() => setMode("dashboard")} className="flex items-center text-blue-500 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        
        <div className={`p-8 rounded-xl text-center mb-8 ${theme==="dark"?"bg-gray-800":"bg-white shadow"}`}>
          <h1 className="text-3xl font-bold mb-2">Exam Complete!</h1>
          <div className={`text-6xl font-black my-6 ${result.percentage >= 60 ? "text-green-500" : "text-red-500"}`}>
            {result.percentage}%
          </div>
          <p className="text-xl font-medium mb-6">{result.percentage >= 60 ? "Passed" : "Needs Improvement"}</p>
          
          <div className="flex justify-center gap-8">
            <div className="text-center"><div className="text-2xl font-bold text-green-500">{result.correctAnswers}</div><div className="text-sm text-gray-500">Correct</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-red-500">{result.wrongAnswers}</div><div className="text-sm text-gray-500">Wrong</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-yellow-500">{result.unanswered}</div><div className="text-sm text-gray-500">Unanswered</div></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Review Answers</h2>
        <div className="space-y-6">
          {result.detailedAnswers.map((ans: any, i: number) => {
            const q = questions.find(q => q.id === ans.questionId);
            if (!q) return null;
            return (
              <div key={i} className={`p-6 rounded-lg border ${ans.isCorrect ? "border-green-500/30" : "border-red-500/30"} ${theme==="dark"?"bg-gray-800":"bg-white"}`}>
                <div className="flex items-start gap-3 mb-4">
                  {ans.isCorrect ? <CheckCircle className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" /> : <XCircle className="text-red-500 w-6 h-6 mt-1 flex-shrink-0" />}
                  <h3 className="text-lg font-medium whitespace-pre-wrap">{q.question}</h3>
                </div>
                
                <div className="ml-9 space-y-2">
                  <p className="text-sm text-gray-400">Your Answer:</p>
                  <div className={`p-3 rounded ${ans.isCorrect ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                    {ans.userAnswer !== null && ans.userAnswer !== undefined ? q.options[ans.userAnswer] : "Unanswered"}
                  </div>
                  
                  {!ans.isCorrect && (
                    <>
                      <p className="text-sm text-gray-400 mt-4">Correct Answer:</p>
                      <div className="p-3 rounded bg-green-500/10 text-green-500">
                        {q.options[ans.correctAnswer]}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
