import { Box } from '@mui/system';
import React from 'react';
import { Wrapper , CloseIconStyled } from './AlertPopup.styles';
import { invoicesPaginationAtom } from '../../atoms';
import { useSetRecoilState } from 'recoil';
import { setCookie } from '../../utils';
export const AlertPopup = React.memo(() => {
  const setPopupState = useSetRecoilState(invoicesPaginationAtom);
  const handleClick = React.useCallback(() => {
    setCookie('cookieeApproval', 'true');
    setPopupState({ unpaidInvoice: false });
  }, [setPopupState]);
  return (
    <Wrapper>
      <Box>
        <Box className="alertpopup">
          <Box sx={{ textAlign: 'center' , pr:5 }} className="alerttext">
            You have an overdue invoice. Please take action not to have interruption in your DeepBlueWork experience.
          </Box>
          <Box >
          <CloseIconStyled onClick={handleClick} />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
});
