import { IconButton, Stack, Tooltip } from '@mui/material';

import { accountManageActions } from '@/features/account-manage';
import { useAppDispatch } from "@/shared/lib/storeHooks.ts";

type Props = {
  accountId: string;
};

export function AccountActions({ accountId }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => dispatch(accountManageActions.openEdit(accountId))}>
          <div>edit icon (todo)</div>
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton size="small" onClick={() => dispatch(accountManageActions.openDelete(accountId))}>
          <div>delete icon (todo)</div>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
