import React, { useCallback } from 'react';
import { Wrapper, Title, Subtitle, SubHeading } from './AdminWelcome.style';
import Box from '@mui/material/Box';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDomain } from '../../queries';
import { CircularProgress } from '@mui/material';

export const AdminWelcome = React.memo(() => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const { data: domainInfo, isLoading } = useDomain();
  const gotoIntro = useCallback(() => {
    navigate('/admin/welcome-video');
  }, [navigate]);

  const gotoSettings = useCallback(() => {
    navigate('/admin/domain-settings');
  }, [navigate]);

  const gotoWorkspace = useCallback(() => {
    navigate('/workspace');
  }, [navigate]);

  return (
    <Wrapper>
      <Box>
        <SubHeading>{t.WelcomeAdmin.subHeading}</SubHeading>
        <Title>{t.WelcomeAdmin.title}</Title>
        <Subtitle>{t.WelcomeAdmin.subtitle}</Subtitle>
        {isLoading ? (
          <Box className="welcomebtn">
            <CircularProgress size={30} color="inherit" />
          </Box>
        ) : domainInfo?.status === 'PENDING' ? (
          <>
            <Box className="welcomebtn">
              <Button onClick={gotoIntro} variant="primary">
                {t.WelcomeAdmin.gettingStarted}
              </Button>
            </Box>
            <Box className="welcomebtn">
              <Button onClick={gotoSettings} variant="primary">
                {t.WelcomeAdmin.verifyBtn}
              </Button>
            </Box>
          </>
        ) : (
          <Box className="welcomebtn">
          <Button onClick={gotoWorkspace} variant="primary">
            Workspace
          </Button>
        </Box>
        )}
      </Box>
    </Wrapper>
  );
});
