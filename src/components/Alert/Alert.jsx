import React from 'react';
import { StyledAlert } from './Alert.styles';

export const Alert = React.memo(({ children, ...props }) => {
  return <StyledAlert {...props}>{children}</StyledAlert>;
});