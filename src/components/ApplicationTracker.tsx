import React, { useState, useEffect } from "react";
import { ApiService } from "../services/api";
import { Plus, Briefcase, Calendar, DollarSign, FileText, CheckCircle2, ChevronRight, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  salary?: string;
  appliedDate: string;
  notes?: string;
}

const STATUS_COLUMNS = [
  "Saved",
  "Applied",
  "Assessment",
  "Interview",
  "HR Round",
  "Offer Received",
  "Accepted",
  "Rejected"
];

const STATUS_COLORS: Record<string, string> = {
  "Saved": "bg-blue-500/10 border-blue-500/20 text-blue-500",
  "Applied": "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
  "Assessment": "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
  "Interview": "bg-purple-500/10 border-purple-500/20 text-purple-500",
  "HR Round": "bg-pink-500/10 border-pink-500/20 text-pink-500",
  "Offer Received": "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 font-bold animate-pulse",
  "Accepted": "bg-green-500/15 border-green-500/30 text-green-500 font-extrabold",
  "Rejected": "bg-red-500/10 border-red-500/20 text-red-500"
};

export default function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [salary, setSalary] = useState("");
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await ApiService.getApplications();
      setApplications(res.applications || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load applications. Showing mock data.");
      // Fallback mock applications for premium display
      setApplications([
        { id: "mock1", company: "Google", role: "Software Engineer", status: "Interview", salary: "$145,000", appliedDate: "2026-07-10", notes: "Technical round next Tuesday. Review System Design." },
        { id: "mock2", company: "Stripe", role: "Frontend Engineer", status: "Applied", salary: "$130,000", appliedDate: "2026-07-12", notes: "Referred by senior dev." },
        { id: "mock3", company: "Microsoft", role: "Cloud Solution Architect", status: "Offer Received", salary: "$160,000", appliedDate: "2026-06-25", notes: "Negotiating base salary package." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      setError("Please fill in Company and Role.");
      return;
    }
    setSubmitting(true);
    try {
      await ApiService.addApplication({
        company,
        role,
        status,
        salary,
        appliedDate,
        notes
      });
      setShowAddModal(false);
      // Reset form
      setCompany("");
      setRole("");
      setStatus("Applied");
      setSalary("");
      setNotes("");
      fetchApplications();
    } catch (err: any) {
      setError(err.message || "Failed to add application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await ApiService.updateApplicationStatus(id, newStatus);
      // Update local state directly for speedy feel
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err: any) {
      setError("Failed to update status in database.");
    }
  };

  // Prepare chart data
  const chartData = STATUS_COLUMNS.map(col => {
    const count = applications.filter(app => app.status === col).length;
    return { name: col, count };
  });

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-tr from-[#6D5DF6]/12 to-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>Application Tracker</span>
              <span className="text-[10px] px-2.5 py-0.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-bold uppercase tracking-wider">
                Live
              </span>
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
              Manage your job search pipeline, interview progression, and offer negotiation status.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold">
          <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Visual Analytics Chart */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Application Funnel</h3>
        <div className="h-44 w-full text-xs font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="var(--color-text-tertiary)" fontSize={10} tickLine={false} />
              <YAxis allowDecimals={false} stroke="var(--color-text-tertiary)" fontSize={10} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(109, 93, 246, 0.05)" }} contentStyle={{ background: "var(--glass-card-bg)", borderColor: "var(--color-glass-border)", borderRadius: "12px", color: "var(--color-text-primary)" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6D5DF6" : "#8B5CF6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kanban Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">Retrieving pipeline database...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATUS_COLUMNS.map(column => {
            const columnApps = applications.filter(app => app.status === column);
            return (
              <div key={column} className="flex flex-col space-y-4">
                {/* Column header */}
                <div className="flex justify-between items-center px-2">
                  <span className="text-[11px] font-mono font-black tracking-wider uppercase text-[var(--color-text-secondary)]">{column}</span>
                  <span className="text-[10px] font-mono font-bold bg-[#6D5DF6]/10 text-[#6D5DF6] px-2 py-0.5 rounded-full">{columnApps.length}</span>
                </div>

                {/* Column content */}
                <div className="glass-card bg-[var(--color-bg-page)]/20 p-4 space-y-4 min-h-[350px] border border-[var(--color-border)]/50 rounded-2xl flex-1">
                  {columnApps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[var(--color-text-tertiary)] border-2 border-dashed border-[var(--color-border)]/20 rounded-xl">
                      <Briefcase className="w-8 h-8 opacity-20 mb-2" />
                      <span className="text-[9px] font-mono leading-relaxed">No applications in this stage.</span>
                    </div>
                  ) : (
                    columnApps.map(app => (
                      <motion.div
                        layoutId={app.id}
                        key={app.id}
                        className="glass-card p-4 space-y-3 shadow-sm hover:shadow-md transition duration-200 border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)]"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-extrabold text-[var(--color-text-primary)] leading-tight">{app.role}</h4>
                            <span className="text-[10px] font-mono text-[#6D5DF6] font-bold block mt-0.5">{app.company}</span>
                          </div>
                        </div>

                        {app.salary && (
                          <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-500 font-bold">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>{app.salary}</span>
                          </div>
                        )}

                        {app.notes && (
                          <p className="text-[9.5px] text-[var(--color-text-secondary)] leading-relaxed font-sans border-t border-[var(--color-border)]/40 pt-2 font-medium">
                            {app.notes}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)]/20">
                          <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{app.appliedDate}</span>
                          </span>

                          {/* Quick stage controls */}
                          <div className="flex items-center space-x-1">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                              className="text-[9px] font-mono bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-lg p-1 text-[var(--color-text-secondary)] font-bold outline-none"
                            >
                              {STATUS_COLUMNS.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Application Modal Overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px] animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-md p-6 space-y-5 text-left relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-[var(--color-border)] pb-3">
                <h3 className="text-sm font-mono uppercase tracking-wider font-black flex items-center space-x-2">
                  <Briefcase className="w-4.5 h-4.5 text-[#6D5DF6]" />
                  <span>Add Application</span>
                </h3>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Pipeline Stage</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none font-bold"
                    >
                      {STATUS_COLUMNS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Salary / Budget</label>
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. $120k/yr"
                      className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Applied Date</label>
                  <input
                    type="date"
                    value={appliedDate}
                    onChange={(e) => setAppliedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase">Notes / Reminders</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Interview details, referrals, follow-up dates..."
                    className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none resize-none font-sans font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 clay-btn clay-btn-primary text-xs uppercase tracking-wider font-semibold text-white shadow-md flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Add to Pipeline</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
