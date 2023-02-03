import { PrivacyIcon , StyledLink } from './HomeEndUserSection.style';
import * as React from 'react';
import { Typography } from '@mui/material';
export const HomeEndUserSection = ({ children, ...rest }) => {
  return (
    <PrivacyIcon sx={{ px: 1 }}>
      <div sx={{ mt: 4 }}>{children}</div>
      <div sx={{ mt: 0, pt: 0 }}>
        <Typography variant="h4" sx={{color:'#9a9ea5 !important'}}>{rest.title}</Typography>
      </div>
      <div sx={{ mt: 0, pt: 0 }}>
        <Typography variant="h6"><StyledLink to="/privacy">{rest.subtitle}</StyledLink></Typography>
      </div>
    </PrivacyIcon>
  );
};
