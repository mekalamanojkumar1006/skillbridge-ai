import React, { useState } from "react";
import { DollarSign, Sparkles, TrendingUp, MapPin, Building, RefreshCw, Award, CheckCircle2 } from "lucide-react";
import { ApiService } from "../services/api";

interface SalaryPredictorProps {
  user: any;
  resume: any;
}

export default function SalaryPredictor({ user, resume }: SalaryPredictorProps) {
  const [roleTitle, setRoleTitle] = useState(resume?.parsedData?.role || "Senior Full Stack Engineer");
  const [experienceYears, setExperienceYears] = useState(3);
  const [location, setLocation] = useState("Remote / US / Global Tech Hubs");
  const [companyTier, setCompanyTier] = useState("Tier 1 Product Companies & High-Growth Startups");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const skills = resume?.parsedData?.skills ? (Array.isArray(resume.parsedData.skills) ? resume.parsedData.skills : Object.values(resume.parsedData.skills).flat()) : ["React", "Node.js", "Python", "Cloud"];
      const res = await ApiService.predictSalary({
        roleTitle,
        skills,
        experienceYears,
        location,
        companyTier
      });
      setPrediction(res);
    } catch (err: any) {
      console.error(err);
      setError("Failed to predict salary range: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <span>AI Market Salary Predictor &amp; Compensation Intelligence</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Estimate realistic compensation benchmarks, skill value multipliers, and negotiation strategies based on live global market telemetry.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Input Parameters */}
        <form onSubmit={handlePredict} className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2">
            Prediction Parameters
          </h3>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Role Title *</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer, DevOps Architect"
              required
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Years of Experience</label>
            <input
              type="number"
              min={0}
              max={30}
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseInt(e.target.value, 10) || 0)}
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Location / Remote</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            >
              <option value="Remote / US / Global Tech Hubs">Remote / US / Global Tech Hubs</option>
              <option value="United States (SF / NYC / Seattle)">United States (SF / NYC / Seattle)</option>
              <option value="Europe / UK (London / Berlin)">Europe / UK (London / Berlin)</option>
              <option value="India (Bangalore / Hyderabad / Remote)">India (Bangalore / Hyderabad / Remote)</option>
              <option value="Asia Pacific / Singapore">Asia Pacific / Singapore</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Company Tier</label>
            <select
              value={companyTier}
              onChange={(e) => setCompanyTier(e.target.value)}
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            >
              <option value="Tier 1 Product Companies & High-Growth Startups">Tier 1 Product / Unicorn Startups</option>
              <option value="FAANG / Big Tech">FAANG / Big Tech (Google, Meta, MSFT)</option>
              <option value="Enterprise / MNC Services">Enterprise / Global Consultancies</option>
              <option value="Early Stage Startup">Early Stage Startup (Seed / Series A)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Market Salaries...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Predict Compensation Range</span>
              </>
            )}
          </button>
        </form>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {prediction ? (
            <div className="space-y-6">
              {/* Salary Band Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-5 border border-blue-500/20 bg-blue-500/5 text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase font-black text-blue-500">Minimum Salary</span>
                  <div className="text-xl font-black text-[var(--color-text-primary)]">
                    ${prediction.minSalary?.toLocaleString() || "75,000"}
                  </div>
                  <span className="text-[8px] font-mono text-[var(--color-text-tertiary)]">Entry threshold</span>
                </div>

                <div className="glass-card p-5 border border-emerald-500/30 bg-emerald-500/10 text-center space-y-1 scale-[1.03] shadow-lg">
                  <span className="text-[9.5px] font-mono uppercase font-black text-emerald-500">Expected Median</span>
                  <div className="text-2xl font-black text-emerald-500">
                    ${prediction.expectedSalary?.toLocaleString() || "115,000"}
                  </div>
                  <span className="text-[8.5px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Target Compensation</span>
                </div>

                <div className="glass-card p-5 border border-purple-500/20 bg-purple-500/5 text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase font-black text-purple-500">Maximum Ceiling</span>
                  <div className="text-xl font-black text-[var(--color-text-primary)]">
                    ${prediction.maxSalary?.toLocaleString() || "155,000"}
                  </div>
                  <span className="text-[8px] font-mono text-[var(--color-text-tertiary)]">Top performance offer</span>
                </div>
              </div>

              {/* Skill Value Premium */}
              {prediction.skillPremium && prediction.skillPremium.length > 0 && (
                <div className="glass-card p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Skill Salary Multipliers</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {prediction.skillPremium.map((sp: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/40 flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-[var(--color-text-primary)] truncate">{sp.skill}</span>
                        <span className="text-emerald-500 font-black">{sp.valueBoost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Negotiation Advice */}
              {prediction.negotiationTips && (
                <div className="glass-card p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#6D5DF6]" />
                    <span>Salary Negotiation Strategy</span>
                  </h3>
                  <div className="space-y-2">
                    {prediction.negotiationTips.map((tip: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs font-sans text-[var(--color-text-secondary)]">
                        <CheckCircle2 className="w-4 h-4 text-[#6D5DF6] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-3 opacity-60 min-h-[350px]">
              <DollarSign className="w-12 h-12 text-[var(--color-text-tertiary)]" />
              <p className="text-xs font-mono">Set parameters and click Predict Compensation Range to view market telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
