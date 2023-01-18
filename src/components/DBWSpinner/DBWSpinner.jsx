import React from 'react';
import { StyledBox } from './DBWSpinner.styles';

import { ReactComponent as Circle } from '../../images/circle.svg';
import { ReactComponent as Grid } from '../../images/grid.svg';

export const DBWSpinner = React.memo(({ size = 60, color = '#ffff' }) => {
  return (
    <StyledBox size={size} color={color}>
      <Circle className="circle" />
      <Grid className="grid" />
    </StyledBox>
  );
});
