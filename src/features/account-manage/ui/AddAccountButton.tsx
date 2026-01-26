import { Button } from '@mui/material';

import { useAppDispatch } from '@/app/store/hooks';
import { accountManageActions } from '@/features/account-manage';

export function AddAccountButton() {
  const dispatch = useAppDispatch();

  return (
    <Button variant="contained" onClick={() => dispatch(accountManageActions.openCreate())}>
      Add account
    </Button>
  );
}
