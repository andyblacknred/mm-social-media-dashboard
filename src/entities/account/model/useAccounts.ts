import { useCallback } from 'react';

import { accountApi } from "@/entities/account/api/accountApi.ts";
import { useAppDispatch, useAppSelector } from "@/shared/lib/storeHooks.ts";

import { selectAccounts, selectAccountsError, selectAccountsLoading } from './selectors';
import { accountsActions } from './slice';

import type { AccountUpsert } from './types';

export function useAccounts() {
  const dispatch = useAppDispatch();
  const {
    setLoading,
    setError,
    setAccounts,
    addAccount,
    removeAccount,
    updateAccountLocal
  } = accountsActions;

  const items = useAppSelector(selectAccounts);
  const loading = useAppSelector(selectAccountsLoading);
  const error = useAppSelector(selectAccountsError);

  const refresh = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await accountApi.getAll();
      dispatch(setAccounts(data));
    } catch (e) {
      dispatch(setError(e instanceof Error ? e.message : 'Failed to fetch accounts'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setAccounts, setError, setLoading]);

  const create = useCallback(
    async (payload: AccountUpsert) => {
      dispatch(setError(null));

      try {
        const created = await accountApi.create(payload);
        dispatch(addAccount(created));
        return created;
      } catch (e) {
        dispatch(setError(e instanceof Error ? e.message : 'Failed to create account'));
        throw e;
      }
    },
    [addAccount, dispatch, setError],
  );

  const update = useCallback(
    async (id: string, payload: AccountUpsert) => {
      dispatch(setError(null));

      try {
        const updated = await accountApi.update(id, payload);
        dispatch(updateAccountLocal(updated));
        return updated;
      } catch (e) {
        dispatch(setError(e instanceof Error ? e.message : 'Failed to update account'));
        throw e;
      }
    },
    [dispatch, setError, updateAccountLocal],
  );

  const remove = useCallback(
    async (id: string) => {
      dispatch(setError(null));

      try {
        await accountApi.remove(id);
        dispatch(removeAccount(id));
      } catch (e) {
        dispatch(setError(e instanceof Error ? e.message : 'Failed to delete account'));
        throw e;
      }
    },
    [dispatch, removeAccount, setError],
  );


  return { items, loading, error, refresh, create, update, remove };
}
