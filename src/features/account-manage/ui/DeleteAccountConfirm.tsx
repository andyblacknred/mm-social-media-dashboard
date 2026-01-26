import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { deleteAccount, selectAccounts } from '@/entities/account';
import { accountManageActions, selectDeleteOpen, selectDeletingId } from '@/features/account-manage';

export function DeleteAccountConfirm() {
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectDeleteOpen);
  const deletingId = useAppSelector(selectDeletingId);
  const accounts = useAppSelector(selectAccounts);

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
            await dispatch(deleteAccount(deletingId)).unwrap();
            dispatch(accountManageActions.closeDelete());
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
