import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { Wrapper } from './ContentSection.styles';
import {
  StepContent,
  StepHeader,
  StepWrapper,
  RightGrid,
  StyledBackIcon
} from './ContentSection.styles';

export const ContentSection = React.memo(
  ({
    heading,
    subHeading,
    headerAction,
    isBack,
    children,
    style,
    handleBack,
    maxWidth = 'lgx',
  }) => {
    return (
      <Wrapper mt={3}>
        <Container maxWidth={maxWidth}>
          <StepWrapper>
           { !!isBack && (
            <Box onClick={handleBack} sx={{ cursor: 'pointer', pt:1, pl:1 }}>
              <StyledBackIcon />
              Back
            </Box>
           ) }
            <StepHeader style={style}>
              <Grid container>
                <Grid item xs={8} md={8}>
                  <Box>
                    <label>{heading}</label>
                    <br />
                    <span>{subHeading}</span>
                  </Box>
                </Grid>
                <RightGrid item xs={4} md={4}>
                  {headerAction}
                </RightGrid>
              </Grid>
            </StepHeader>
            <StepContent sx={{ paddingBlock: 2, paddingInline: 6 }}>
              {children}
            </StepContent>
          </StepWrapper>
        </Container>
      </Wrapper>
    );
  }
);
