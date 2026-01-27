import type { Account, AccountUpsert } from "@/entities/account/model/types.ts";
import { request } from "@/shared/api/httpClient.ts";
import { API_URL } from "@/shared/config/env.ts";

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
