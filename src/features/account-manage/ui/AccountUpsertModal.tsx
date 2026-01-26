import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Stack } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { createAccount, selectAccounts, updateAccount, type AccountPlatform } from '@/entities/account';
import { accountManageActions, selectEditingId, selectUpsertOpen } from '@/features/account-manage';

const platforms: AccountPlatform[] = ['Instagram', 'TikTok', 'YouTube', 'X', 'Facebook', 'LinkedIn'];

const schema = Yup.object({
  platform: Yup.string().oneOf(platforms).required('Platform is required'),
  name: Yup.string().min(2, 'Too short').max(60, 'Too long').required('Name is required'),
  followers: Yup.number().min(0).required('Followers is required'),
  engagementRate: Yup.number().min(0).max(100).required('Engagement rate is required'),
  postsLast7Days: Yup.number().min(0).required('Posts (last 7 days) is required'),
});

export function AccountUpsertModal() {
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectUpsertOpen);
  const editingId = useAppSelector(selectEditingId);
  const accounts = useAppSelector(selectAccounts);

  const editing = editingId ? accounts.find((x) => x.id === editingId) : undefined;

  const initialValues = {
    platform: editing?.platform ?? platforms[0],
    name: editing?.name ?? '',
    followers: editing?.followers ?? 0,
    engagementRate: editing?.engagementRate ?? 0,
    postsLast7Days: editing?.postsLast7Days ?? 0,
  };

  const title = editing ? 'Edit account' : 'Add account';

  return (
    <Dialog open={open} onClose={() => dispatch(accountManageActions.closeUpsert())} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, helpers) => {
          try {
            if (editingId) {
              await dispatch(updateAccount({ id: editingId, payload: values })).unwrap();
            } else {
              await dispatch(createAccount(values)).unwrap();
            }
            dispatch(accountManageActions.closeUpsert());
          } catch (e) {
            helpers.setStatus({ submitError: e instanceof Error ? e.message : 'Submit failed' });
          }
        }}
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

            <DialogActions>
              <Button onClick={() => dispatch(accountManageActions.closeUpsert())} disabled={isSubmitting}>
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
