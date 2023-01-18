import { Box } from '@mui/system';
import React from 'react';
import { StyledButton, Wrapper, StyledLink } from './CookiesPopup.styles';
import { cookiesApprovalAtom } from './../../atoms';
import { Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { setCookie } from '../../utils';
import { useLocalization } from '../../hooks';
export const CookiesPopup = React.memo(() => {
  const setPopupState = useSetRecoilState(cookiesApprovalAtom);
  const { t } = useLocalization();
  const handleClick = React.useCallback(() => {
    setCookie('cookieeApproval', 'true');
    setPopupState({ isPopup: false });
  }, [setPopupState]);
  return (
    <Wrapper>
      <Box>
        <Box className="dialoguecontent">
          <Box sx={{ textAlign: 'left' }}>
            {t.container.cookiesPopUp.cookieDesc}
          </Box>
          <Box sx={{ fontWeight:'700' , }}>
          {t.container.cookiesPopUp.seeOur} <StyledLink to="/privacy">{t.container.cookiesPopUp.privacyPolicy}</StyledLink> {t.container.cookiesPopUp.and} 
            <StyledLink to="/terms">{t.container.cookiesPopUp.termsOfServices}</StyledLink>.
          </Box>
          <Grid
            container
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              pt: 1,
            }}
          >
            <StyledButton
              variant="primary"
              className="deletebtn"
              fullWidth
              onClick={handleClick}
            >
              {t.container.cookiesPopUp.okAccept}
            </StyledButton>
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
});
