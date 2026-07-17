export class ApiService {
  private static getBaseUrl() {
    // In our container sandbox, port 3000 is directly reverse-proxied
    return "";
  }

  static setToken(token?: string) {
    if (token) {
      localStorage.setItem("skillbridge_jwt_token", token);
    }
  }

  static getToken() {
    return localStorage.getItem("skillbridge_jwt_token") || "";
  }

  static getHeaders(extraHeaders: Record<string, string> = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...extraHeaders
    };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  static getAuthHeaders(extraHeaders: Record<string, string> = {}) {
    const headers: Record<string, string> = { ...extraHeaders };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  static clearToken() {
    localStorage.removeItem("skillbridge_jwt_token");
  }

  static async registerUser(uid: string, email: string, displayName?: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email, displayName })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to register profile");
    }
    const data = await res.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  static async loginUser(uid: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve user profile");
    }
    const data = await res.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  static async getProfile(uid: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/auth/me?uid=${encodeURIComponent(uid)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to load user profile");
    }
    return res.json();
  }

  static async uploadResume(userId: string, fileName: string, contentOrFile: string | File) {
    let body: any;
    let headers: Record<string, string> = this.getAuthHeaders();

    if (contentOrFile instanceof File) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("fileName", fileName);
      formData.append("resume", contentOrFile);
      body = formData;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({ userId, fileName, content: contentOrFile });
    }

    const res = await fetch(`${this.getBaseUrl()}/api/resumes/upload`, {
      method: "POST",
      headers,
      body
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to parse and upload resume");
    }
    return res.json();
  }

  static async analyzeQuality(resumeId: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/analysis/quality/${resumeId}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Quality analysis failed");
    }
    return res.json();
  }

  static async getAtsScore(resumeId: string, jobDescription: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/analysis/ats-score`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ resumeId, jobDescription, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "ATS evaluation failed");
    }
    return res.json();
  }

  static async matchJobs(resumeId: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/jobs/match`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ resumeId, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Job matching failed");
    }
    return res.json();
  }

  static async getTopMatches(userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/jobs/top-matches?userId=${encodeURIComponent(userId)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve top job matches");
    }
    return res.json();
  }

  static async analyzeSkillGaps(resumeId: string, targetRole: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/skills/gap-analysis`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ resumeId, targetRole, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Skill gap analysis failed");
    }
    return res.json();
  }

  static async getLearningRoadmap(assessmentId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/skills/learning-roadmap/${assessmentId}`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to load learning roadmap");
    }
    return res.json();
  }

  static async getCareerRoadmaps(userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/career-roadmap/all?userId=${encodeURIComponent(userId)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to load career roadmaps");
    }
    return res.json();
  }

  static async generateCareerRoadmap(resumeId: string, targetPath: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/career-roadmap/generate`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ resumeId, targetPath, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate career path roadmap");
    }
    return res.json();
  }

  static async getRoadmapProgress(userId: string, careerId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/career-roadmap/progress?userId=${encodeURIComponent(userId)}&careerId=${encodeURIComponent(careerId)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to load roadmap progress");
    }
    return res.json();
  }

  static async saveRoadmapProgress(userId: string, careerId: string, completedMilestones: number[]) {
    const res = await fetch(`${this.getBaseUrl()}/api/career-roadmap/progress`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ userId, careerId, completedMilestones })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to save roadmap progress");
    }
    return res.json();
  }

  static async chatWithMentor(prompt: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/mentor/chat`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to talk to career mentor");
    }
    return res.json();
  }

  static async getInterviewQuestions(resumeId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/interview/questions?resumeId=${encodeURIComponent(resumeId)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate interview questions");
    }
    return res.json();
  }

  static async evaluateInterviewAnswer(questionText: string, expectedPoints: string[], userAnswer: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/interview/evaluate`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ questionText, expectedPoints, userAnswer })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to evaluate interview answer");
    }
    return res.json();
  }

  static async generateInterviewReport(interviewType: string, questionsAndAnswers: any[]) {
    const res = await fetch(`${this.getBaseUrl()}/api/interview/report`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ interviewType, questionsAndAnswers })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate final report");
    }
    return res.json();
  }

  static async predictHiringProbability(resumeId: string, jobTitle: string, company: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/hiring/probability/${resumeId}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ jobTitle, company, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Hiring probability prediction failed");
    }
    return res.json();
  }

  static async matchOpportunities(resumeId: string, userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/opportunities/match`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ resumeId, userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Opportunities matching failed");
    }
    return res.json();
  }

  static async getLatestOpportunities(userId: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/opportunities/latest?userId=${encodeURIComponent(userId)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve recommended opportunities");
    }
    return res.json();
  }

  static async getAllOpportunities() {
    const res = await fetch(`${this.getBaseUrl()}/api/opportunities/all`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve raw opportunities database");
    }
    return res.json();
  }

  static async getPlatformStats() {
    const res = await fetch(`${this.getBaseUrl()}/api/stats`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve platform statistics");
    }
    return res.json();
  }

  static async getDashboardStats() {
    const res = await fetch(`${this.getBaseUrl()}/api/dashboard/stats`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to retrieve dashboard stats");
    }
    return res.json();
  }

  static async updateProfile(uid: string, displayName: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/profile/update`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ uid, displayName })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to update profile");
    }
    return res.json();
  }

  static async resetResumeData(uid: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/profile/reset-data`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ uid })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to reset resume data");
    }
    return res.json();
  }

  // --- NEW PRODUCTION ENDPOINTS ---

  static async getDashboardInsights() {
    const res = await fetch(`${this.getBaseUrl()}/api/dashboard/insights`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve dashboard insights");
    }
    return res.json();
  }

  static async getApplications() {
    const res = await fetch(`${this.getBaseUrl()}/api/applications/all`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve applications list");
    }
    return res.json();
  }

  static async addApplication(app: { company: string; role: string; status: string; salary?: string; appliedDate?: string; notes?: string }) {
    const res = await fetch(`${this.getBaseUrl()}/api/applications/add`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(app)
    });
    if (!res.ok) {
      throw new Error("Failed to add application");
    }
    return res.json();
  }

  static async updateApplicationStatus(id: string, status: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/applications/update-status`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, status })
    });
    if (!res.ok) {
      throw new Error("Failed to update application status");
    }
    return res.json();
  }

  static async getResumes() {
    const res = await fetch(`${this.getBaseUrl()}/api/resumes/all`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve resumes list");
    }
    return res.json();
  }

  static async renameResume(id: string, newName: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/resumes/rename`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, newName })
    });
    if (!res.ok) {
      throw new Error("Failed to rename resume");
    }
    return res.json();
  }

  static async duplicateResume(id: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/resumes/duplicate`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id })
    });
    if (!res.ok) {
      throw new Error("Failed to duplicate resume");
    }
    return res.json();
  }

  static async deleteResume(id: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/resumes/delete`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id })
    });
    if (!res.ok) {
      throw new Error("Failed to delete resume");
    }
    return res.json();
  }

  static async getInterviewHistory() {
    const res = await fetch(`${this.getBaseUrl()}/api/interview/history`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve interview history");
    }
    return res.json();
  }

  static async saveInterview(payload: { role: string; difficulty: string; overallScore: number; metrics: any; strengths: string[]; weaknesses: string[]; improvementSuggestions: string[]; recommendedResources: any[] }) {
    const res = await fetch(`${this.getBaseUrl()}/api/interview/save`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error("Failed to save interview session");
    }
    return res.json();
  }

  static async getNotifications(limit = 20, offset = 0, search = "", category = "") {
    const res = await fetch(`${this.getBaseUrl()}/api/notifications/all?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve notifications");
    }
    return res.json();
  }

  static async createNotification(title: string, message: string, type: string, priority = "normal", icon = "bell") {
    const res = await fetch(`${this.getBaseUrl()}/api/notifications/add`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ title, message, type, priority, icon })
    });
    if (!res.ok) {
      throw new Error("Failed to create notification");
    }
    return res.json();
  }

  static async markNotificationRead(id?: string, all?: boolean) {
    const res = await fetch(`${this.getBaseUrl()}/api/notifications/mark-read`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, all })
    });
    if (!res.ok) {
      throw new Error("Failed to mark notifications read");
    }
    return res.json();
  }

  static async archiveNotification(id?: string, all?: boolean) {
    const res = await fetch(`${this.getBaseUrl()}/api/notifications/archive`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, all })
    });
    if (!res.ok) {
      throw new Error("Failed to archive notification");
    }
    return res.json();
  }

  static async deleteNotification(id?: string, all?: boolean) {
    const res = await fetch(`${this.getBaseUrl()}/api/notifications/delete`, {
      method: "DELETE",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, all })
    });
    if (!res.ok) {
      throw new Error("Failed to delete notification");
    }
    return res.json();
  }

  static async exportUserData() {
    const res = await fetch(`${this.getBaseUrl()}/api/profile/export-data`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to export user data");
    }
    return res.json();
  }

  static async deleteAccount() {
    const res = await fetch(`${this.getBaseUrl()}/api/profile/delete-account`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to delete account");
    }
    return res.json();
  }

  static async submitFeedback(type: string, feedbackText: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/feedback/submit`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ type, feedbackText })
    });
    if (!res.ok) {
      throw new Error("Failed to submit feedback");
    }
    return res.json();
  }

  static async globalSearch(queryStr: string) {
    const res = await fetch(`${this.getBaseUrl()}/api/search/global?q=${encodeURIComponent(queryStr)}`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to perform global search");
    }
    return res.json();
  }

  static async getAdminStats() {
    const res = await fetch(`${this.getBaseUrl()}/api/admin/stats`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve admin stats");
    }
    return res.json();
  }

  static async getAdminSystemHealth() {
    const res = await fetch(`${this.getBaseUrl()}/api/admin/system-health`, {
      headers: this.getHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve system health logs");
    }
    return res.json();
  }

  static async verifySuccess() {
    const res = await fetch(`${this.getBaseUrl()}/api/auth/verify-success`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to update verification status on database");
    }
    return res.json();
  }
}
