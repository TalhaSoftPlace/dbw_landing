import React from 'react';
import { Wrapper, StyledButton } from './NotesResponsiveCalenderView.styles';
import { Box } from '@mui/material';
export const NotesResponsiveCalenderView = React.memo(
  ({ children, handleOpen, dayselct, monthbtn }) => {
    return (
      <>
        <Wrapper>
          <StyledButton
            onClick={handleOpen}
            className="new_notes"
            texttransform="none"
            fullWidth
            variant="primary"
            size="large"
          >
            New Notes
          </StyledButton>
          <Box sx={{ width: '110px' }}>{children}</Box>
          <StyledButton variant="primary" transform="none" onClick={dayselct}>
            {monthbtn}
          </StyledButton>
        </Wrapper>
      </>
    );
  }
);
