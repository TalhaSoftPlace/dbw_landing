import React, { useCallback , useState , useEffect } from 'react';
import { Wrapper, Title, VideoWrapper } from './WelcomeVideo.style';
import { Button, WithBGIcons } from '../../components';
import { useLocalization , useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Container, Box } from '@mui/material';

export const WelcomeVideo = React.memo(() => {
  const { t } = useLocalization();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videoUrl , setVideoUrl] = useState();

  const handleClick = useCallback(() => {
    navigate('/admin/view-videos');
  }, [navigate]);

  const handleClickDomain = useCallback(() => {
    navigate('/admin/domain-settings');
  }, [navigate]);

  const dominVideo = React.useCallback(()=>{
  let godadyVideo = "https://www.youtube.com/watch?v=swmP30YObDw";
  let namecheepVideo = "https://www.youtube.com/watch?v=bSiPS-xrpWo";
  let hostGatorVideo = "https://www.youtube.com/watch?v=tF7q7gmaJuY";
  let googleDomainVideo = "https://www.youtube.com/watch?v=hq2d8Uzf6do";
  let godady = user?.domainModel?.registrarName?.includes('GoDaddy');
  let namecheap = user?.domainModel?.registrarName?.includes('NAMECHEAP');
  let hostGator = user?.domainModel?.registrarName?.includes('PublicDomainRegistry');
  let googleDomain = user?.domainModel?.registrarName?.includes('Google LLC');
  
      if(godady){
        setVideoUrl(godadyVideo);
      }else if(namecheap){
        setVideoUrl(namecheepVideo);
      }else if(hostGator){
        setVideoUrl(hostGatorVideo);
      }else if(googleDomain){
        setVideoUrl(googleDomainVideo);
      }
      else{
        setVideoUrl('');
        navigate('/admin/view-videos');
      }
  } ,[navigate, user?.domainModel?.registrarName])
  
  useEffect(()=>{
    dominVideo();
  },[dominVideo]);

  return (
    <Wrapper>
      <Container maxWidth="lgx">
        <Title>{t.WelcomeVideo.title}</Title>
        <WithBGIcons size={12}>
          <VideoWrapper>
            <ReactPlayer
              loop
              controls
              height="100%"
              width="100%"
              url={videoUrl}
            />
            
          </VideoWrapper>
        </WithBGIcons>
        <Box className="welcomebtn">
          <Button onClick={handleClick} variant="primary">
            {t.WelcomeVideo.btnText}
          </Button>
          <Button onClick={handleClickDomain} variant="primary" sx={{ml:2}}>
            {t.WelcomeVideo.domainbtnText}
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
});
