import { Alert, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AccountCard, fetchAccounts, selectAccounts, selectAccountsError, selectAccountsLoading } from '@/entities/account';

export function AccountsOverview() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectAccounts);
  const loading = useAppSelector(selectAccountsLoading);
  const error = useAppSelector(selectAccountsError);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Social Media Overview</h1>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <CircularProgress />
        </div>
      ) : null}

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <Alert severity="info">No accounts yet</Alert>
      ) : null}

      <div className="row g-3 mt-1">
        {items.map((account) => (
          <div key={account.id} className="col-12 col-md-6 col-xl-4">
            <AccountCard account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}
