// src/services/api.ts
import { create } from "zustand";

/////////////////////
// Zustand Store
/////////////////////
interface User {
  id: string;
  username: string;
  email: string;
  monthlyIncome?: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  getUserId: () => string | null;
  getToken: () => string | null;
}
interface Budget {
  id: string;  // Make sure this is included
  category: string;
  percentage: number;
  spent?: number;
  remaining?: number;
  status?: 'on_track' | 'warning' | 'exceeded';
}
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    set({ user, token });
    localStorage.setItem("wf_token", token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("wf_token");
  },
  getUserId: () => {
    const token = get().token || localStorage.getItem("wf_token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch {
      return null;
    }
  },
  getToken: () => {
    return get().token || localStorage.getItem("wf_token");
  },
}));

/////////////////////
// Request Helper
/////////////////////
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


function authHeaders(): HeadersInit {
  const token = useUserStore.getState().getToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      useUserStore.getState().logout();
      throw new Error("Session expired. Please login again.");
    }
    
    const body = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(body.message || `HTTP ${res.status}`);
  }

  return res.json();
}

/////////////////////
// Auth API
/////////////////////
export const authApi = {
  register: (data: { username: string; email: string; monthly_income?: number }) =>
    request<{ user: User; token: string }>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (email: string) =>
    request<{ user: User; token: string }>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  getUser: (id: string) => request<User>(`/users/${id}`),
};

/////////////////////
// Accounts API
/////////////////////
export const accountsApi = {
  getAll: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any[]>(`/accounts/user/${userId}`);
  },
  create: (data: { name: string; type: string; balance?: number }) =>
    request<any>("/accounts", { method: "POST", body: JSON.stringify(data) }),
};

/////////////////////
// Transactions API
/////////////////////
export const transactionsApi = {
  getAll: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any[]>(`/transactions/user/${userId}`);
  },
  create: (data: { accountId?: string; amount: number; type: string; category: string; description?: string }) =>
    request<any>("/transactions", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: { accountId?: string; amount?: number; type?: string; category?: string; description?: string; transactionDate?: string }) =>
    request<any>(`/transactions/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/transactions/${id}`, { method: "DELETE" }),
};

/////////////////////
// Goals API
/////////////////////
export const goalsApi = {
  getAll: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any[]>(`/goals/user/${userId}`);
  },
  create: (data: { title: string; targetAmount: number; targetDate?: string }) =>
    request<any>("/goals", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, amount: number) =>
    request<any>(`/goals/${id}`, { method: "PATCH", body: JSON.stringify({ amount }) }),
  delete: (id: string) => request<any>(`/goals/${id}`, { method: "DELETE" }),
};


/////////////////////
// Budgets API
/////////////////////
export const budgetsApi = {
  getAll: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any[]>(`/budgets/user/${userId}`);
  },
  
  create: (data: { category: string; percentage: number; recommended_percentage?: number }) =>
    request<any>("/budgets", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, percentage: number) => 
    request<any>(`/budgets/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ percentage }) // Send as object with percentage field
    }),
  

  delete: (id: string) => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any>(`/budgets/${id}`, { method: "DELETE" });
  },

  analyze: async (month?: string) => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    
    const url = month ? `/budgets/analyze?month=${month}` : '/budgets/analyze';
    return request<any>(url);
  },

  checkPurchase: async (data: { amount: number; category?: string }) => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    
    return request<any>('/budgets/check-purchase', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
};

/////////////////////
// Notifications API
/////////////////////
export const notificationsApi = {
  getAll: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    return request<any[]>(`/notifications/user/${userId}`);
  },
  create: (data: { type: string; message: string }) =>
    request<any>("/notifications", { method: "POST", body: JSON.stringify(data) }),
};


/////////////////////
// AI API
/////////////////////

// Define the AIAnalysis interface with proper types
export interface AIAnalysis {
  insight: string;
  spendingAnalysis: Array<{
    category: string;
    trend: 'up' | 'down' | 'stable';
    percentageChange: number;
    recommendation: string;
  }>;
  anomalies: Array<{
    id: string;
    date: Date;
    amount: number;
    category: string | null;
    description: string | null;
    reason: string;
  }>;
  budgetHealth: Array<{
    category: string;
    budgeted: number;
    spent: number;
    remaining: number;
    status: 'on_track' | 'overspending' | 'under_spending';
  }>;
  savingsOpportunities: Array<{
    type: string;
    potentialSavings: number;
    suggestion: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  cashFlowForecast: {
    projectedBalance: number;
    daysUntilZero: number | null;
    riskLevel: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
}

export const aiApi = {
  analyze: () => {
    const userId = useUserStore.getState().getUserId();
    if (!userId) throw new Error("User not logged in");
    // Now expecting the full AIAnalysis type
    return request<AIAnalysis>(`/ai/analyze?userId=${userId}`);
  },
};