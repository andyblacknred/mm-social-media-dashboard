import { createAsyncThunk } from '@reduxjs/toolkit';

import { accountApi } from "@/entities/account/api/accountApi.ts";

import { type Account, type AccountUpsert } from './types.ts';

export const fetchAccounts = createAsyncThunk<Account[]>(
  'account/fetchAll',
  async () => accountApi.getAll(),
);

export const createAccount = createAsyncThunk<Account, AccountUpsert>(
  'account/create',
  async (payload) => accountApi.create(payload),
);

export const updateAccount = createAsyncThunk<Account, { id: string; payload: AccountUpsert }>(
  'account/update',
  async ({ id, payload }) => accountApi.update(id, payload),
);

export const deleteAccount = createAsyncThunk<string, string>(
  'account/delete',
  async (id) => {
    await accountApi.remove(id);
    return id;
  },
);
