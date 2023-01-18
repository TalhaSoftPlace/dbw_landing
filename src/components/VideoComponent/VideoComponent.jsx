import * as React from 'react';
import { Typography } from '@mui/material';
import { Wrapper } from './VideoComponent.style';
export const VideoComponent = ({ title, url }) => {
  return (
    <Wrapper>
      <Typography className="heading">{title}</Typography>
      <img src={url} alt="img" width="100%" height="100%" />
    </Wrapper>
  );
};
