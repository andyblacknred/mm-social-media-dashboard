import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ManageState = {
  upsertOpen: boolean;
  deleteOpen: boolean;
  editingId: string | null;
  deletingId: string | null;
};

const initialState: ManageState = {
  upsertOpen: false,
  deleteOpen: false,
  editingId: null,
  deletingId: null,
};

const accountManageSlice = createSlice({
  name: 'accountManage',
  initialState,
  reducers: {
    openCreate(state) {
      state.upsertOpen = true;
      state.editingId = null;
    },
    openEdit(state, action: PayloadAction<string>) {
      state.upsertOpen = true;
      state.editingId = action.payload;
    },
    closeUpsert(state) {
      state.upsertOpen = false;
      state.editingId = null;
    },
    openDelete(state, action: PayloadAction<string>) {
      state.deleteOpen = true;
      state.deletingId = action.payload;
    },
    closeDelete(state) {
      state.deleteOpen = false;
      state.deletingId = null;
    },
  },
});

export const accountManageActions = accountManageSlice.actions;
export const accountManageReducer = accountManageSlice.reducer;
