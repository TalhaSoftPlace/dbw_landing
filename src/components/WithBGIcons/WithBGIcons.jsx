import React from 'react';

import { Wrapper, Left, Right, Content } from './WithBGIcons.styles';

export const WithBGIcons = React.memo(({ size, children }) => {
  return (
    <Wrapper>
      <Left size={size}>
        <Right size={size}>
          <Content size={size}>{children}</Content>
        </Right>
      </Left>
    </Wrapper>
  );
});
