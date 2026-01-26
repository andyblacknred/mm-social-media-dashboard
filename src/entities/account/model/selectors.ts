import type { RootState } from "@/app/store/store.ts";

export const selectAccounts = (state: RootState) => state.accounts.items;
export const selectAccountsLoading = (state: RootState) => state.accounts.loading;
export const selectAccountsError = (state: RootState) => state.accounts.error;
