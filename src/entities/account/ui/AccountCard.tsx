import { Box, CardContent, Chip, Stack, Tooltip, Typography } from '@mui/material';

import type { Account } from "@/entities/account";
import { HoverCard } from "@/entities/account/ui/HoverCard.ts";
import { formatCompactNumber, isCompactApplied } from "@/shared/lib/formatNumber.ts";

type Props = {
  account: Account;
  actions?: React.ReactNode;
};

const buttonsSectionWidth = 80; // px

export function AccountCard({ account, actions }: Props) {
  const postsLast7Days = formatCompactNumber(account.postsLast7Days);
  const followers = formatCompactNumber(account.followers);

  return (
    <HoverCard variant="outlined" className="h-full">
      <CardContent  className="h-full flex flex-col justify-between items-start w-full">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" width="100%" spacing={2}>
          <Box maxWidth={`calc(100% - ${buttonsSectionWidth}px)`}>
            <Typography variant="h6">{account.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip size="small" label={account.platform} />
              <Tooltip
                title={postsLast7Days.full}
                arrow disableFocusListener={!isCompactApplied(postsLast7Days)}
                disableHoverListener={!isCompactApplied(postsLast7Days)}
                disableTouchListener={!isCompactApplied(postsLast7Days)}
              >
                <Chip size="small" label={`Posts (last 7d): ${postsLast7Days.short}`} />
              </Tooltip>
            </Stack>
          </Box>

          {actions ? <Box className="hidden sm:flex m-0 justify-end" minWidth={buttonsSectionWidth}>{actions}</Box> : null}
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mt: 2 }} width="100%">
          <Box>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
            <Tooltip
              title={followers.full}
              arrow disableFocusListener={!isCompactApplied(followers)}
              disableHoverListener={!isCompactApplied(followers)}
              disableTouchListener={!isCompactApplied(followers)}
            >
              <Typography variant="h6">{followers.short.toLocaleString()}</Typography>
            </Tooltip>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Engagement
            </Typography>
            <Typography variant="h6">{account.engagementRate}%</Typography>
          </Box>

          {
            actions ?
              <Box className="sm:hidden flex items-end w-full justify-end" sx={{ ml: 'auto' }}>
                {actions}
              </Box> 
              : null
          }
        </Stack>
      </CardContent>
    </HoverCard>
  );
}
