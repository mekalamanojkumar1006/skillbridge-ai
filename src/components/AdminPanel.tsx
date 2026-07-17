import React, { useState, useEffect } from "react";
import { ApiService } from "../services/api";
import { ShieldCheck, Cpu, HardDrive, Clock, Terminal, AlertCircle, RefreshCw, BarChart, Server, Activity, Users } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

interface AdminStats {
  usersCount: number;
  dau: number;
  resumesCount: number;
  atsAnalysesCount: number;
  roadmapsCount: number;
  interviewsCount: number;
  applicationsCount: number;
  appExecutions: number;
}

interface SystemHealth {
  healthStatus: string;
  uptimeSeconds: number;
  memoryAllocatedMB: number;
  databaseLatencyMs: number;
  apiAvgResponseTimeMs: number;
  logs: { id: number; level: string; source: string; message: string; time: string }[];
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState("ALL");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsRes = await ApiService.getAdminStats();
      const healthRes = await ApiService.getAdminSystemHealth();
      setStats(statsRes);
      setHealth(healthRes);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch admin stats. Using simulated panel metrics.");
      // Simulated stats for premium inspection
      setStats({
        usersCount: 148,
        dau: 64,
        resumesCount: 204,
        atsAnalysesCount: 312,
        roadmapsCount: 94,
        interviewsCount: 182,
        applicationsCount: 88,
        appExecutions: 1045
      });
      setHealth({
        healthStatus: "Operational",
        uptimeSeconds: 86400 * 3 + 14200,
        memoryAllocatedMB: 84,
        databaseLatencyMs: 38,
        apiAvgResponseTimeMs: 98,
        logs: [
          { id: 1, level: "INFO", source: "API Gateway", message: "JWT verify handler initialized.", time: new Date().toISOString() },
          { id: 2, level: "INFO", source: "Firestore Pipeline", message: "Relational sync check completed successfully.", time: new Date(Date.now() - 30000).toISOString() },
          { id: 3, level: "WARNING", source: "Gemini Model Client", message: "Model overloaded. Fallback triggered.", time: new Date(Date.now() - 120000).toISOString() },
          { id: 4, level: "ERROR", source: "OAuth Handler", message: "Failed credentials handshake for sandbox client.", time: new Date(Date.now() - 600000).toISOString() }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const formatUptime = (sec: number) => {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const filteredLogs = health?.logs.filter(log => {
    if (logFilter === "ALL") return true;
    return log.level === logFilter;
  }) || [];

  // Growth Chart Data
  const growthData = [
    { name: "Mon", users: 110, executions: 800 },
    { name: "Tue", users: 115, executions: 840 },
    { name: "Wed", users: 122, executions: 890 },
    { name: "Thu", users: 130, executions: 920 },
    { name: "Fri", users: 138, executions: 990 },
    { name: "Sat", users: 142, executions: 1010 },
    { name: "Sun", users: stats?.usersCount || 148, executions: stats?.appExecutions || 1045 }
  ];

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-tr from-[#6D5DF6]/12 to-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>Admin Center</span>
              <span className="text-[10px] px-2.5 py-0.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-bold uppercase tracking-wider">
                System Host
              </span>
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
              Monitor server resources, inspect database transaction logs, and review platform engagement metrics.
            </p>
          </div>
          <button
            onClick={fetchAdminData}
            className="p-3 border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] hover:text-[#6D5DF6] rounded-2xl shadow-sm transition duration-200 cursor-pointer"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold">
          <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">Retrieving admin panel metrics...</span>
        </div>
      ) : (
        <>
          {/* Key Metric Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 space-y-3">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold">Total Registered</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black font-mono">{stats?.usersCount}</span>
                <span className="text-[9px] font-mono text-[#6D5DF6] font-bold">+{Math.round((stats?.usersCount || 0) * 0.12)}% this wk</span>
              </div>
              <p className="text-[9.5px] text-[var(--color-text-secondary)] font-mono flex items-center space-x-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <Users className="w-3.5 h-3.5" />
                <span>{stats?.dau} Daily Active Users (DAU)</span>
              </p>
            </div>

            <div className="glass-card p-5 space-y-3">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold">Resumes Uploaded</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black font-mono">{stats?.resumesCount}</span>
                <span className="text-[9px] font-mono text-indigo-500 font-bold">Total Files</span>
              </div>
              <p className="text-[9.5px] text-[var(--color-text-secondary)] font-mono flex items-center space-x-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <Server className="w-3.5 h-3.5" />
                <span>{stats?.atsAnalysesCount} ATS Analyses run</span>
              </p>
            </div>

            <div className="glass-card p-5 space-y-3">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold">Interviews Prepared</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black font-mono">{stats?.interviewsCount}</span>
                <span className="text-[9px] font-mono text-purple-500 font-bold">Simulation Rounds</span>
              </div>
              <p className="text-[9.5px] text-[var(--color-text-secondary)] font-mono flex items-center space-x-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <Activity className="w-3.5 h-3.5" />
                <span>{stats?.roadmapsCount} roadmaps generated</span>
              </p>
            </div>

            <div className="glass-card p-5 space-y-3">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold">App Executions</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black font-mono text-[#6D5DF6]">{stats?.appExecutions}</span>
                <span className="text-[9px] font-mono text-emerald-500 font-bold">Gemini API Calls</span>
              </div>
              <p className="text-[9.5px] text-[var(--color-text-secondary)] font-mono flex items-center space-x-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure API tokens</span>
              </p>
            </div>
          </div>

          {/* Analytics Chart & Health Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 glass-card p-6 space-y-4">
              <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black flex items-center space-x-2">
                <BarChart className="w-4 h-4 text-[#6D5DF6]" />
                <span>Executions Trend</span>
              </h3>
              <div className="h-56 w-full text-[10px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6D5DF6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6D5DF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="var(--color-text-tertiary)" />
                    <YAxis stroke="var(--color-text-tertiary)" />
                    <Tooltip contentStyle={{ background: "var(--glass-card-bg)", borderColor: "var(--color-glass-border)", borderRadius: "12px", color: "var(--color-text-primary)" }} />
                    <Area type="monotone" dataKey="executions" stroke="#6D5DF6" fillOpacity={1} fill="url(#colorExec)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Health Info */}
            <div className="glass-card p-6 space-y-5">
              <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black flex items-center space-x-2">
                <Server className="w-4 h-4 text-[#8B5CF6]" />
                <span>Resource Diagnostics</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/40">
                  <span className="text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>System Status</span>
                  </span>
                  <span className="text-emerald-500 font-bold">{health?.healthStatus}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/40">
                  <span className="text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Server Uptime</span>
                  </span>
                  <span className="font-bold">{health ? formatUptime(health.uptimeSeconds) : ""}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/40">
                  <span className="text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Allocated RAM</span>
                  </span>
                  <span className="font-bold">{health?.memoryAllocatedMB} MB</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--color-border)]/40">
                  <span className="text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>DB Latency</span>
                  </span>
                  <span className="font-bold text-emerald-500">{health?.databaseLatencyMs} ms</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Avg API Response</span>
                  </span>
                  <span className="font-bold text-indigo-500">{health?.apiAvgResponseTimeMs} ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monospace Interactive Logs Viewer */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>API Gateway Logs</span>
              </h3>

              <div className="flex items-center space-x-2 text-[9px] font-mono">
                {["ALL", "INFO", "WARNING", "ERROR"].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setLogFilter(lvl)}
                    className={`px-2.5 py-1 rounded-lg border font-bold cursor-pointer ${
                      logFilter === lvl
                        ? "border-[#6D5DF6]/50 bg-[#6D5DF6]/10 text-[#6D5DF6]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-black/95 text-green-400 font-mono text-[10px] p-4.5 rounded-2xl h-48 overflow-y-auto space-y-2 border border-gray-900 shadow-inner">
              {filteredLogs.length === 0 ? (
                <div className="text-gray-500 text-center py-12">No logs match target filter.</div>
              ) : (
                filteredLogs.map(log => (
                  <div key={log.id} className="flex items-start space-x-3 select-text">
                    <span className="text-gray-500 font-mono select-none">{new Date(log.time).toLocaleTimeString()}</span>
                    <span className={`font-black uppercase select-none ${
                      log.level === "ERROR" ? "text-red-500" : log.level === "WARNING" ? "text-yellow-500" : "text-blue-400"
                    }`}>
                      [{log.level}]
                    </span>
                    <span className="text-gray-400 font-bold select-none">({log.source}):</span>
                    <span className="text-green-300 flex-1">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
