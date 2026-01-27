import { Card, styled } from "@mui/material";

export const HoverCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));