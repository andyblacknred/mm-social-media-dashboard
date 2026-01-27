import { Button } from '@mui/material';

import { accountManageActions } from '@/features/account-manage';
import { useAppDispatch } from "@/shared/lib/storeHooks.ts";

export function AddAccountButton() {
  const dispatch = useAppDispatch();

  return (
    <Button variant="contained" onClick={() => dispatch(accountManageActions.openCreate())}>
      Add account
    </Button>
  );
}
