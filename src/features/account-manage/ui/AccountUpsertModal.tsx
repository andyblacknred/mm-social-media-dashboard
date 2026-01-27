import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Stack } from '@mui/material';
import { Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { type Account, type AccountPlatform, type AccountUpsert } from '@/entities/account';
import { useAccounts } from "@/entities/account/model/useAccounts.ts";
import { accountManageActions, selectEditingId, selectUpsertOpen } from '@/features/account-manage';
import { useAppDispatch, useAppSelector } from "@/shared/lib/storeHooks.ts";

const platforms: AccountPlatform[] = ['Instagram', 'TikTok', 'YouTube', 'X', 'Facebook', 'LinkedIn'];

const schema = Yup.object({
  platform: Yup.string().oneOf(platforms).required('Platform is required'),
  name: Yup.string().min(2, 'Too short').max(60, 'Too long').required('Name is required'),
  followers: Yup.number().label('Followers').min(0).required('Followers is required'),
  engagementRate: Yup.number().label('Engagement rate').min(0).max(100).required('Engagement rate is required'),
  postsLast7Days: Yup.number().label('Number of posts').min(0).required('Posts (last 7 days) is required'),
});

export function AccountUpsertModal() {
  const dispatch = useAppDispatch();

  const isOpened = useAppSelector(selectUpsertOpen);
  const editingId = useAppSelector(selectEditingId);
  const { items: accounts, update: updateAccount, create: createAccount } = useAccounts();

  const editing: Account | undefined =
    editingId ? accounts.find((x) => x.id === editingId) : undefined;

  const initialValues: AccountUpsert = {
    platform: editing?.platform ?? platforms[0],
    name: editing?.name ?? '',
    followers: editing?.followers ?? 0,
    engagementRate: editing?.engagementRate ?? 0,
    postsLast7Days: editing?.postsLast7Days ?? 0,
  };

  const title = editing ? 'Edit account' : 'Add account';

  const handleFormikSubmit = 
    async (
      values: AccountUpsert,
      helpers: FormikHelpers<AccountUpsert>
    ): Promise<void> => {
      try {
        if (editingId) {
          await updateAccount(editingId, values)
        } else {
          await createAccount(values)
        }
        dispatch(accountManageActions.closeUpsert());
      } catch (e) {
        helpers.setStatus({ submitError: e instanceof Error ? e.message : 'Submit failed' });
      }
    }
    
  const handleClose = (): void => {
    dispatch(accountManageActions.closeUpsert())
  }

  return (
    <Dialog open={isOpened} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleFormikSubmit}
      >
        {({ values, handleChange, handleSubmit, touched, errors, isSubmitting, status }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Stack spacing={2}>
                <TextField
                  select
                  name="platform"
                  label="Platform"
                  value={values.platform}
                  onChange={handleChange}
                  error={touched.platform && Boolean(errors.platform)}
                  helperText={touched.platform ? errors.platform : ''}
                >
                  {platforms.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="name"
                  label="Account name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : ''}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    name="followers"
                    label="Followers"
                    type="number"
                    value={values.followers}
                    onChange={handleChange}
                    error={touched.followers && Boolean(errors.followers)}
                    helperText={touched.followers ? errors.followers : ''}
                    fullWidth
                  />
                  <TextField
                    name="engagementRate"
                    label="Engagement rate (%)"
                    type="number"
                    value={values.engagementRate}
                    onChange={handleChange}
                    error={touched.engagementRate && Boolean(errors.engagementRate)}
                    helperText={touched.engagementRate ? errors.engagementRate : ''}
                    fullWidth
                  />
                </Stack>

                <TextField
                  name="postsLast7Days"
                  label="Posts (last 7 days)"
                  type="number"
                  value={values.postsLast7Days}
                  onChange={handleChange}
                  error={touched.postsLast7Days && Boolean(errors.postsLast7Days)}
                  helperText={touched.postsLast7Days ? errors.postsLast7Days : ''}
                />

                {status?.submitError ? (
                  <div className="text-danger">{status.submitError}</div>
                ) : null}
              </Stack>
            </DialogContent>

            <DialogActions className="px-4 pb-4 pt-0">
              <Button
                onClick={handleClose} 
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
