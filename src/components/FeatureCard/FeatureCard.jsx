import * as React from 'react';

import { FatureStyledCard, StyledCardContent } from './FeatureCard.styles';
import { Typography } from '@mui/material';

export const FeatureCard = ({ children, title, body }) => {
  return (
    <FatureStyledCard>
      <StyledCardContent sx={{ mx: 2 }} className="cardicon">
        {children}
      </StyledCardContent>
      <StyledCardContent sx={{ mx: 2, mt: 0, pt: 0 }}>
        <Typography variant="h4">{title}</Typography>
      </StyledCardContent>
      <StyledCardContent sx={{ mx: 2, mt: 0, pt: 0 }} >
        <Typography sx={{color:'#9a9ea5 !important'}} className="text-justify">{body}</Typography>
      </StyledCardContent>
    </FatureStyledCard>
  );
};
