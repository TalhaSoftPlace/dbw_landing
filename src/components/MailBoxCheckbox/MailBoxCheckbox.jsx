import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Divider, Box } from '@mui/material';
import { Wrapper, StyledCircle, NumberCount } from './MailBoxCheckbox.style';

export const MailBoxCheckbox = React.memo(({ checked, onChange, isEmail }) => {
  const emailCount = React.useMemo(() => {
    return <NumberCount>{isEmail}</NumberCount>;
  }, [isEmail]);
  return (
    <Wrapper>
      <Checkbox
        checked={!!checked}
        icon={<Box sx={{height:'35px'}}>{isEmail ? emailCount : <StyledCircle />}</Box>}
        checkedIcon={emailCount}
        onChange={onChange}
        size="medium"
      />
      <Divider orientation="vertical" />
    </Wrapper>
  );
});
