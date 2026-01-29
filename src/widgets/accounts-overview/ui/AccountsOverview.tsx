import {Alert, Box, CircularProgress, Typography} from '@mui/material';
import { useEffect } from 'react';

import { AccountCard } from '@/entities/account';
import { useAccounts } from "@/entities/account/model/useAccounts.ts";
import {
  AccountActions,
  AccountUpsertModal,
  AddAccountButton,
  DeleteAccountConfirmModal,
} from '@/features/account-manage';

export function AccountsOverview() {
  const { items, loading, error, refresh } = useAccounts();

  useEffect(() => {
    const init = async (): Promise<void> => {
      await refresh();
    }

    void init();
  }, [refresh]);

  return (
    <Box className="container py-4">
      <Box className="d-flex align-items-center justify-content-between mb-3">
        <Typography variant="h1" fontSize={32}>Social Media Overview</Typography>
        <AddAccountButton />
      </Box>

      {loading ? (
        <Box className="d-flex justify-content-center py-5">
          <CircularProgress />
        </Box>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      {!loading && !error && items.length === 0 ? <Alert severity="info">No accounts yet</Alert> : null}

      <Box className="row g-3 mt-1">
        {items.map((account) => (
          <Box key={account.id} className="col-12 col-md-6 col-xl-4">
            <AccountCard account={account} actions={<AccountActions accountId={account.id} />} />
          </Box>
        ))}
      </Box>

      {/* Modals */}
      <AccountUpsertModal />
      <DeleteAccountConfirmModal />
    </Box>
  );
}
