import React from 'react';

interface TestPanelProps {
  customInput: string;
  setCustomInput: (val: string) => void;
  output: string | null;
  error: string | null;
  executionTime: number | null;
  memory: number | null;
}

const TestPanel: React.FC<TestPanelProps> = ({ customInput, setCustomInput, output, error, executionTime, memory }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden">
      <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)] font-mono text-[12px] font-bold text-[var(--color-text-secondary)] uppercase">
        Test & Execution
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Custom Input */}
        <div>
          <label className="block text-[11px] font-mono text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
            Custom Input
          </label>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full h-32 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg p-3 text-[14px] font-mono focus:outline-none focus:border-[#6D5DF6]"
            placeholder="Enter custom input here..."
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-[11px] font-mono text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
            Output
          </label>
          <div className={`w-full min-h-[120px] rounded-lg p-3 text-[14px] font-mono whitespace-pre-wrap ${error ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[var(--color-bg-primary)] border border-[var(--color-border)]'}`}>
            {error ? error : (output || 'Run your code to see output...')}
          </div>
        </div>

        {/* Stats */}
        {(executionTime !== null || memory !== null) && (
          <div className="flex gap-4 pt-2">
            {executionTime !== null && (
              <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Time: {executionTime}ms
              </div>
            )}
            {memory !== null && (
              <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Memory: {memory}KB
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPanel;
