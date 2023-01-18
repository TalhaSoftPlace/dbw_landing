import React from 'react';
import { StyledButton } from './Button.styles';

export const Button = React.memo(({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
});
