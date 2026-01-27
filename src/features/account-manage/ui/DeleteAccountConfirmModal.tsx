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

  return (
    <Dialog open={open} onClose={() => dispatch(accountManageActions.closeDelete())}>
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <b>{account?.name ?? 'this account'}</b>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(accountManageActions.closeDelete())}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={async () => {
            if (!deletingId) return;
            await deleteAccount(deletingId);
            dispatch(accountManageActions.closeDelete());
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
