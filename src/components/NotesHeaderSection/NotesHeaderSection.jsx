import React from 'react';
import { Box, Container  } from '@mui/material';
import { Wrapper } from './NotesHeaderSection.styles';
import {
  StepContent,
  StepHeader,
  StepWrapper,
  RightGrid,
} from './NotesHeaderSection.styles';

export const NotesHeaderSection = React.memo(
  ({ heading, subHeading, headerAction, children, style }) => {
    return (
      <Wrapper>
        <Container maxWidth="lgx" className="notesarea">
          <StepWrapper>
            <StepHeader style={style}>
                <Box className="notes-header">
                  <Box className="headertext">
                    <label>{heading}</label>
                  </Box>
                  <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                    <span>{subHeading}</span>
                  </Box>
                </Box>
                <RightGrid>
                  {headerAction}
                </RightGrid>
            </StepHeader>
            <StepContent sx={{ paddingBlock: 3, paddingInline: 1 }}>
              {children}
            </StepContent>
          </StepWrapper>
        </Container>
      </Wrapper>
    );
  }
);
