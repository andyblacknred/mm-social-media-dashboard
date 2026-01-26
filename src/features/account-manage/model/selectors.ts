import { type RootState } from '@/app/store/store';

export const selectUpsertOpen = (state: RootState) => state.accountManage.upsertOpen;
export const selectDeleteOpen = (state: RootState) => state.accountManage.deleteOpen;
export const selectEditingId = (state: RootState) => state.accountManage.editingId;
export const selectDeletingId = (state: RootState) => state.accountManage.deletingId;
