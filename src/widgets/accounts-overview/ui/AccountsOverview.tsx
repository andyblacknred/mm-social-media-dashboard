import { Alert, CircularProgress } from '@mui/material';
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
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Social Media Overview</h1>
        <AddAccountButton />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <CircularProgress />
        </div>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      {!loading && !error && items.length === 0 ? <Alert severity="info">No accounts yet</Alert> : null}

      <div className="row g-3 mt-1">
        {items.map((account) => (
          <div key={account.id} className="col-12 col-md-6 col-xl-4">
            <AccountCard account={account} actions={<AccountActions accountId={account.id} />} />
          </div>
        ))}
      </div>

      {/* Modals */}
      <AccountUpsertModal />
      <DeleteAccountConfirmModal />
    </div>
  );
}
