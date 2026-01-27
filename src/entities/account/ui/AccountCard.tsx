import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';

import type { Account } from "@/entities/account";

type Props = {
  account: Account;
  actions?: React.ReactNode;
};

export function AccountCard({ account, actions }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <div>
            <Typography variant="h6">{account.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip size="small" label={account.platform} />
              <Chip size="small" label={`Posts (last 7 days): ${account.postsLast7Days}`} />
            </Stack>
          </div>

          {actions ? <div>{actions}</div> : null}
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
          <div>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
            <Typography variant="h6">{account.followers.toLocaleString()}</Typography>
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Engagement
            </Typography>
            <Typography variant="h6">{account.engagementRate}%</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
