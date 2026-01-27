import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Account } from './types';

type AccountsState = {
  items: Account[];
  loading: boolean;
  error: string | null;
};

const initialState: AccountsState = {
  items: [],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.items = action.payload;
    },
    addAccount(state, action: PayloadAction<Account>) {
      state.items.push(action.payload);
    },
    updateAccountLocal(state, action: PayloadAction<Account>) {
      const idx = state.items.findIndex((x) => x.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
  },
});

export const accountsActions = accountsSlice.actions;
export const accountsReducer = accountsSlice.reducer;
