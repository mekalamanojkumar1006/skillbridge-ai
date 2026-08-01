import React, { useState } from "react";
import { DollarSign, Sparkles, TrendingUp, MapPin, Building, RefreshCw, Award, CheckCircle2, Globe } from "lucide-react";
import { ApiService } from "../services/api";

interface SalaryPredictorProps {
  user: any;
  resume: any;
}

export default function SalaryPredictor({ user, resume }: SalaryPredictorProps) {
  const [roleTitle, setRoleTitle] = useState(resume?.parsedData?.role || "Senior Full Stack Engineer");
  const [experienceYears, setExperienceYears] = useState(3);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Telangana");
  const [city, setCity] = useState("Hyderabad");
  const [companyType, setCompanyType] = useState("Product Startup");
  const [education, setEducation] = useState("Bachelor's Degree");
  
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const skills = resume?.parsedData?.skills
        ? Array.isArray(resume.parsedData.skills)
          ? resume.parsedData.skills
          : Object.values(resume.parsedData.skills).flat()
        : ["React", "Node.js", "Python", "Cloud"];

      const res = await ApiService.predictSalary({
        roleTitle,
        skills,
        experienceYears,
        country,
        state,
        city,
        companyType,
        education,
        location: `${city ? city + ", " : ""}${country}`
      });

      setPrediction(res);
    } catch (err: any) {
      console.error(err);
      setError("Failed to predict salary range: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick preset location selection
  const handleQuickLocation = (locCountry: string, locCity: string, locState: string = "") => {
    setCountry(locCountry);
    setCity(locCity);
    setState(locState);
  };

  const getSymbol = () => prediction?.currencySymbol || (country === "India" ? "₹" : "$");
  const getSuffix = () => prediction?.salarySuffix || (country === "India" ? " LPA" : "");

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <span>AI Location-Aware Market Salary Predictor</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Estimate realistic compensation benchmarks, skill value multipliers, and localized salary ceilings based on live market telemetry.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Input Form */}
        <form onSubmit={handlePredict} className="glass-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-[#6D5DF6]" />
              <span>Location & Role Parameters</span>
            </h3>

            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Role Title *</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer, Product Manager"
                required
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Years Experience</label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value, 10) || 0)}
                  className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const c = e.target.value;
                    setCountry(c);
                    if (c === "India") setCity("Hyderabad");
                    else if (c === "USA") setCity("San Francisco");
                    else if (c === "United Kingdom") setCity("London");
                    else if (c === "Europe") setCity("Berlin");
                  }}
                  className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none cursor-pointer"
                >
                  <option value="India">India (₹ LPA)</option>
                  <option value="USA">United States ($ USD)</option>
                  <option value="United Kingdom">United Kingdom (£ GBP)</option>
                  <option value="Europe">Europe (€ EUR)</option>
                  <option value="Canada">Canada ($ CAD)</option>
                  <option value="Australia">Australia ($ AUD)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City (e.g. Hyderabad)"
                  className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">State / Region</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State (Optional)"
                  className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Location Shortcuts */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Popular Hubs:</span>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: "Hyderabad 🇮🇳", country: "India", city: "Hyderabad", state: "Telangana" },
                  { label: "Bangalore 🇮🇳", country: "India", city: "Bangalore", state: "Karnataka" },
                  { label: "San Francisco 🇺🇸", country: "USA", city: "San Francisco", state: "California" },
                  { label: "London 🇬🇧", country: "United Kingdom", city: "London", state: "" }
                ].map((hub) => (
                  <button
                    key={hub.label}
                    type="button"
                    onClick={() => handleQuickLocation(hub.country, hub.city, hub.state)}
                    className="px-2 py-0.5 rounded bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[9px] font-mono hover:text-[#6D5DF6] cursor-pointer"
                  >
                    {hub.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Company Type / Tier</label>
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none cursor-pointer"
              >
                <option value="Product Startup">Tier 1 Product Startup</option>
                <option value="FAANG / Big Tech">FAANG / Tier-1 Big Tech</option>
                <option value="Enterprise / MNC">Enterprise / MNC Services</option>
                <option value="Early Stage Startup">Early Stage (Seed / Series A)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md mt-4"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Fetching Market Salaries...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Predict Compensation ({country === "India" ? "₹ LPA" : "$ USD"})</span>
              </>
            )}
          </button>
        </form>

        {/* Prediction Results Display */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          {prediction ? (
            <div className="space-y-6">
              
              {/* Location Badge Header */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="text-sm font-black text-[var(--color-text-primary)]">{prediction.roleTitle}</h3>
                    <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                      Market Benchmark for {prediction.location} ({prediction.currencyCode})
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-xl text-[10px] font-mono font-black uppercase shadow-xs">
                  {prediction.marketDemand}
                </span>
              </div>

              {/* 3 Salary Band Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                
                {/* Min */}
                <div className="glass-card p-5 border border-blue-500/20 bg-blue-500/5 text-center space-y-1 flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase font-black text-blue-500">Minimum Floor</span>
                  <div className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)]">
                    {getSymbol()}{typeof prediction.minSalary === "number" ? prediction.minSalary.toLocaleString() : prediction.minSalary}{getSuffix()}
                  </div>
                  <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] font-semibold">Entry threshold</span>
                </div>

                {/* Avg (Highlighted) */}
                <div className="glass-card p-5 border border-emerald-500/30 bg-emerald-500/10 text-center space-y-1 scale-[1.02] shadow-lg flex flex-col justify-between">
                  <span className="text-[9.5px] font-mono uppercase font-black text-emerald-500">Expected Average</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-500">
                    {getSymbol()}{typeof prediction.avgSalary === "number" ? prediction.avgSalary.toLocaleString() : (prediction.avgSalary || prediction.expectedSalary)}{getSuffix()}
                  </div>
                  <span className="text-[8.5px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Target Compensation</span>
                </div>

                {/* Max */}
                <div className="glass-card p-5 border border-purple-500/20 bg-purple-500/5 text-center space-y-1 flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase font-black text-purple-500">Maximum Ceiling</span>
                  <div className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)]">
                    {getSymbol()}{typeof prediction.maxSalary === "number" ? prediction.maxSalary.toLocaleString() : prediction.maxSalary}{getSuffix()}
                  </div>
                  <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] font-semibold">Top offer ceiling</span>
                </div>

              </div>

              {/* Salary Breakdown (Base / Bonus / Equity) */}
              {prediction.salaryBreakdown && (
                <div className="glass-card p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Estimated Compensation Breakdown</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)]">
                      <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Base Salary</span>
                      <span className="text-xs font-mono font-black text-[var(--color-text-primary)]">
                        {getSymbol()}{prediction.salaryBreakdown.basePay?.toLocaleString()}{getSuffix()}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)]">
                      <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Annual Bonus</span>
                      <span className="text-xs font-mono font-black text-emerald-500">
                        {getSymbol()}{prediction.salaryBreakdown.bonusAnnual?.toLocaleString()}{getSuffix()}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)]">
                      <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Equity / Stock</span>
                      <span className="text-xs font-mono font-black text-[#6D5DF6]">
                        {getSymbol()}{prediction.salaryBreakdown.equityValue?.toLocaleString()}{getSuffix()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Hiring Cities */}
              {prediction.topHiringCities && prediction.topHiringCities.length > 0 && (
                <div className="glass-card p-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                    Top Hiring Hubs in {country}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prediction.topHiringCities.map((city: string, i: number) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] text-[9.5px] font-mono font-bold">
                        📍 {city}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-3 opacity-70 min-h-[400px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <DollarSign className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[var(--color-text-primary)]">Location-Aware Compensation Telemetry</h3>
                <p className="text-xs font-sans text-[var(--color-text-secondary)] mt-1 max-w-sm">
                  Select your target country (India ₹ LPA, USA $ USD, UK £, Europe €) and city to generate realistic market compensation predictions.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
