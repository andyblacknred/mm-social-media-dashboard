import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createAccount, deleteAccount, fetchAccounts, updateAccount } from './thunks.ts';
import { type Account } from './types.ts';

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
  name: 'account',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch accounts';
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const idx = state.items.findIndex((x) => x.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
      });
  },
});

export const { setAccounts } = accountsSlice.actions;
export const accountsReducer = accountsSlice.reducer;
