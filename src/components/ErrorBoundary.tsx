import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught exception captured by ErrorBoundary:", error, errorInfo);
    (this as any).setState({ error, errorInfo });
  }

  private handleReset = () => {
    (this as any).setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0C10] text-[#F1F5F9] p-6 font-sans">
          <div className="relative glass-card glowing-border max-w-lg w-full p-8 text-center space-y-6 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-black uppercase tracking-wider text-red-500">
                Application Crash Detected
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium font-mono leading-relaxed">
                An unexpected runtime error occurred. The details have been logged to the browser console.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-left font-mono text-[10px] text-red-400 max-h-40 overflow-y-auto space-y-2 scrollbar-thin">
                <p className="font-bold uppercase tracking-wider text-[9px] text-red-300">
                  Exception: {this.state.error.name}
                </p>
                <p className="break-all">{this.state.error.message}</p>
                {this.state.error.stack && (
                  <pre className="whitespace-pre-wrap opacity-80 break-all leading-normal">
                    {this.state.error.stack.split("\n").slice(0, 4).join("\n")}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3.5 clay-btn clay-btn-primary flex items-center justify-center space-x-2 text-white font-bold uppercase tracking-wider text-[9px] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="flex-1 py-3.5 border border-[var(--color-border)] hover:bg-[#F1F5F9]/5 text-[var(--color-text-primary)] rounded-2xl flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-[9px] transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
