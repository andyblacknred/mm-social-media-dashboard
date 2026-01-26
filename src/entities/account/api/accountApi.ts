import type { Account, AccountUpsert } from "@/entities/account/model/types.ts";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const accountApi = {
  getAll(): Promise<Account[]> {
    return request<Account[]>(`${API_URL}/accounts`);
  },

  create(payload: AccountUpsert): Promise<Account> {
    return request<Account>(`${API_URL}/accounts`, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        updatedAt: new Date().toISOString(),
      }),
    });
  },

  update(id: string, payload: AccountUpsert): Promise<Account> {
    return request<Account>(`${API_URL}/accounts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...payload,
        updatedAt: new Date().toISOString(),
      }),
    });
  },

  remove(id: string): Promise<void> {
    return request<void>(`${API_URL}/accounts/${id}`, {
      method: 'DELETE',
    });
  },
};
