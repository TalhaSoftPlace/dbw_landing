import styled from '@emotion/styled';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

export const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, value }) => ({
    height: 9,
    borderRadius: 4,
    border: `2px solid ${
      value < 25
        ? theme.palette.background.redbg
        : value < 75
        ? theme.palette.background.yellowbg
        : theme.palette.background.greenbg
    }`,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.background.primary,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 4,
      backgroundColor:
        value < 25
          ? theme.palette.background.redbg
          : value < 75
          ? theme.palette.background.yellowbg
          : theme.palette.background.greenbg,
    },
  })
);
