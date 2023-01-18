import React from 'react';
import { AdminFooterItems } from '../AdminFooterItems';
import { NormalHr, Wrapper } from './CalenderFooter.styles';

export const CalenderFooter = React.memo(() => {
  return (
    <Wrapper>
      <NormalHr />
      <AdminFooterItems open={true} paddingtop={0} />
    </Wrapper>
  );
});
