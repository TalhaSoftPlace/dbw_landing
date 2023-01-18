import React, { useCallback } from 'react';
import {
  Wrapper,
  SubHeading,
  VideoSection,
  VideoWrapper,
} from './DashboardVideoScreen.style';
import Box from '@mui/material/Box';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import ReactPlayer from 'react-player';
export const DashboardVideoScreen = React.memo(() => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/admin/domain-settings');
  }, [navigate]);
  return (
    <VideoWrapper>
      <Wrapper>
        <Container maxWidth="lgx">
        <SubHeading>{t.VideoScreen.title}</SubHeading>
          <Box className="welcomebtn">
            <Button onClick={handleClick} variant="primary">
              {t.VideoScreen.btnText}
            </Button>
          </Box>
        </Container>
      </Wrapper>
      <VideoSection className="video-grid">
        <Grid maxWidth="lgx" container spacing={4} className="videolist">
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <ReactPlayer
              loop
              controls
              height={200}
              width="100%"
              url="https://www.youtube.com/watch?v=swmP30YObDw"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <ReactPlayer
              loop
              controls
              height={200}
              width="100%"
              url="https://www.youtube.com/watch?v=bSiPS-xrpWo"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <ReactPlayer
              loop
              controls
              height={200}
              width="100%"
              url="https://www.youtube.com/watch?v=tF7q7gmaJuY"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <ReactPlayer
              loop
              controls
              height={200}
              width="100%"
              url="https://www.youtube.com/watch?v=hq2d8Uzf6do"
            />
          </Grid>
          
        </Grid>
      </VideoSection>
    </VideoWrapper>
  );
});
