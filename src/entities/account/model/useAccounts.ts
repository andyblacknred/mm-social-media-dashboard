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
      const created = await accountApi.create(payload); // todo - try/catch
      dispatch(addAccount(created));
      return created;
    },
    [addAccount, dispatch, setError],
  );

  const update = useCallback(
    async (id: string, payload: AccountUpsert) => {
      dispatch(setError(null));
      const updated = await accountApi.update(id, payload); // todo - try/catch
      dispatch(updateAccountLocal(updated));
      return updated;
    },
    [dispatch, setError, updateAccountLocal],
  );

  const remove = useCallback(
    async (id: string) => {
      dispatch(setError(null));
      await accountApi.remove(id); // todo - try/catch
      dispatch(removeAccount(id));
    },
    [dispatch, removeAccount, setError],
  );

  return { items, loading, error, refresh, create, update, remove };
}
