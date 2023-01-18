import React from 'react';
import {
  FieldGrid,
  FieldLabel,
  Wrapper,
  StyledBox,
  ButtonGrid,
  StyledButton,
} from './ProfileSettingSkin.styles';
import { Grid, Box } from '@mui/material';
import { useGetUserSettings } from '../../queries';
import { useUpdateUserSettings } from '../../mutations';
export const ProfileSettingSkin = React.memo(() => {
  const { data: userSettings = {} } = useGetUserSettings();
  const { mutateAsync: updateUserSettings } = useUpdateUserSettings();
  const [skinValue, setSkinValue] = React.useState(userSettings?.skin);
  const whiteSkin = React.useCallback(() => {
    setSkinValue('light');
  }, []);
  const darkSkin = React.useCallback(() => {
    setSkinValue('dark');
  }, []);
  const handleSubmit = () => {
    updateUserSettings({
      username: userSettings?.userName ?? '',
      firstName: userSettings?.firstName ?? '',
      timezone: userSettings?.timezone ?? '',
      lang: userSettings?.lang ?? '',
      country: userSettings?.country ?? '',
      skin: skinValue,
      signature: userSettings?.signature ?? '',
      autoReply: userSettings?.autoReply ?? '',
      autoReplyText: userSettings?.autoReplyText ?? '',
      autoReplyStartDate: userSettings?.autoReplyStartDate ?? '',
      autoReplyEndDate: userSettings?.autoReplyEndDate ?? '',
    }).then(() => {});
  };
  return (
    <>
      <StyledBox sx={{ display: 'flex', justifyContent: 'center' }}>
        <Wrapper>
          <Box className="wrapper">
            <FieldGrid item xs={12} sx={{ mt: 2 }}>
              <FieldLabel>Please select your appearence:</FieldLabel>
              <Grid className="Appearance" sx={{}}>
                <Box onClick={darkSkin} sx={{ cursor: 'pointer' }}>
                  <Box
                    className={
                      skinValue === 'dark' ? 'active' : 'AppearanceBox'
                    }
                    sx={{ backgroundColor: '#202641' }}
                  ></Box>
                  <Box sx={{ textAlign: 'center' }}>Deep Blue</Box>
                </Box>
                <Box onClick={whiteSkin} sx={{ cursor: 'pointer' }}>
                  <Box
                    className={
                      skinValue === 'light' ? 'active' : 'AppearanceBox'
                    }
                    sx={{ backgroundColor: '#f6f6f6' }}
                  ></Box>
                  <Box sx={{ textAlign: 'center' }}>Light</Box>
                </Box>
              </Grid>
            </FieldGrid>
            <ButtonGrid>
              <StyledButton variant="primary" onClick={handleSubmit}>
                Apply
              </StyledButton>
            </ButtonGrid>
          </Box>
        </Wrapper>
      </StyledBox>
    </>
  );
});
