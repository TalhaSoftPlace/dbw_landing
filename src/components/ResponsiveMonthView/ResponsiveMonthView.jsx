import React from 'react';
import { Wrapper, StyledButton } from './ResponsiveMonthView.styles';
import { Box } from '@mui/material';
import { AddEvent } from '../../containers';
export const ResponsiveMonthView = React.memo(
  ({ children, dayselct, monthbtn }) => {
    return (
      <>
        <Wrapper>
          <AddEvent />

          <Box sx={{ width: '110px' }}>{children}</Box>
          <StyledButton variant="primary" transform="none" onClick={dayselct}>
            {monthbtn}
          </StyledButton>
        </Wrapper>
      </>
    );
  }
);
