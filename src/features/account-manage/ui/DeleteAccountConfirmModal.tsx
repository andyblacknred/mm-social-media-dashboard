import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

import { useAccounts } from "@/entities/account/model/useAccounts.ts";
import { accountManageActions, selectDeleteOpen, selectDeletingId } from '@/features/account-manage';
import { useAppDispatch, useAppSelector } from "@/shared/lib/storeHooks.ts";

export function DeleteAccountConfirmModal() {
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectDeleteOpen);
  const deletingId = useAppSelector(selectDeletingId);

  const { items: accounts, remove: deleteAccount } = useAccounts();
  const account = deletingId ? accounts.find((x) => x.id === deletingId) : undefined;

  const handleCancel = (): void => {
    dispatch(accountManageActions.closeDelete());
  }

  const handleDelete = async (): Promise<void> => {
    if (!deletingId) return;
    await deleteAccount(deletingId);
    dispatch(accountManageActions.closeDelete());
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <b>{account?.name ?? 'this account'}</b>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
