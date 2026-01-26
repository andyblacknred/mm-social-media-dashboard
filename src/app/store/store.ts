import { configureStore } from '@reduxjs/toolkit'

import { accountsReducer } from "@/entities/account";
import { accountManageReducer } from "@/features/account-manage";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    accountManage: accountManageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch