import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FieldGrid,
  TextFieldStyled,
  FieldLabel,
  SelectStyled,
  Wrapper,
  StyledButton,
  StyledBox,
  ButtonGrid,
  FileUploadButtonWrapper,
} from './ProfileGeneralForm.styles';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Grid, MenuItem, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import { translations } from '../../constants';
import { RichTextarea, Button } from '../../components';
import countryList from 'react-select-country-list';
import { useProfilePicture } from '../../queries';
import {
  useAddProfilePictureMutation,
  useUpdateProfilePictureMutation,
} from '../../mutations';

export const ProfileGeneralForm = React.memo(
  ({ handleChange, values, setFieldValue, handleSubmit, touched, errors }) => {
    const { enqueueSnackbar } = useSnackbar();
    const hiddenFileInput = React.useRef(null);
    const { data: picture } = useProfilePicture();
    const { mutateAsync: uploadPic } = useAddProfilePictureMutation();
    const { mutateAsync: updatePic } = useUpdateProfilePictureMutation();
    const moment = require('moment-timezone');
    const timeZones = moment.tz.names();
    const { data: countryData } = countryList();

    const [imgSrc, setImgSrc] = useState('');
    useEffect(() => {
      if (!!imgSrc) {
        if (!picture) {
          uploadPic({ picture: imgSrc });
        } else {
          updatePic({ picture: imgSrc });
        }
      }
    }, [imgSrc, picture, updatePic, uploadPic]);

    const filesUploaded = React.useCallback(file => {
      if (file?.target?.files) {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
          setImgSrc(/,(.*\w+)/.exec(reader.result.toString() || '')[1])
        );
        reader.readAsDataURL(file.target.files[0]);
        setTimeout(() => {
          file.target.value = null;
        }, 100);
      }
    }, []);
    const handleClick = useCallback(() => {
      hiddenFileInput.current.click();
    }, [hiddenFileInput]);

    const submit = useCallback(() => {
      Object.values(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit(values);
    }, [enqueueSnackbar, errors, handleSubmit, values]);

    const options = useMemo(
      () =>
        Object.entries(translations).map(([key, { name = 'No name' }]) => (
          <MenuItem key={key} value={key}>
            {name}
          </MenuItem>
        )),
      []
    );

    return (
      <>
        <StyledBox sx={{ display: 'flex', justifyContent: 'center' }}>
          <Wrapper>
            <Box className="wrapper">
              <Grid container sx={{ p: 1 }} className="Avtarbox">
                <Avatar
                  src={picture ? `data:image/png;base64,${picture}` : undefined}
                  className="avatarstyle"
                />
              </Grid>
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                  ref={hiddenFileInput}
                  onChange={filesUploaded}
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  style={{ display: 'none' }}
                />

                <FileUploadButtonWrapper>
                  <Button
                    onClick={handleClick}
                    className="logo-uploader"
                    variant="outlined-upload"
                    startIcon={<FileUploadIcon color="text.light" />}
                  >
                    Upload
                  </Button>
                </FileUploadButtonWrapper>
              </Box>
              <Grid container spacing={6} sx={{ mt: 1 }}>
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>Full Name:</FieldLabel>
                  <TextFieldStyled
                    name="firstName"
                    autoFocus
                    error={!!errors.firstName && touched.firstName}
                    value={values.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                </FieldGrid>
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>Language</FieldLabel>
                  <SelectStyled
                    fullWidth
                    name="lang"
                    value={values.lang}
                    onChange={handleChange}
                    MenuProps={{ classes: { paper: 'pagination-page' } }}
                  >
                    {options}
                  </SelectStyled>
                </FieldGrid>
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>Organization Unit</FieldLabel>
                  <SelectStyled
                    fullWidth
                    readOnly
                    name="orgUnitName"
                    value={values.orgUnitName}
                    onChange={handleChange}
                    MenuProps={{ classes: { paper: 'pagination-page' } }}
                  >
                    <MenuItem value={values.orgUnitName}>
                      {values.orgUnitName}
                    </MenuItem>
                  </SelectStyled>
                </FieldGrid>
                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>Country</FieldLabel>
                  <SelectStyled
                    fullWidth
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    MenuProps={{ classes: { paper: 'pagination-page' } }}
                  >
                    {countryData.map(item => {
                      return (
                        <MenuItem key={item} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </SelectStyled>
                </FieldGrid>

                <FieldGrid item xs={12} md={6}>
                  <FieldLabel>Time Zone:</FieldLabel>
                  <SelectStyled
                    fullWidth
                    name="timezone"
                    value={values.timezone}
                    onChange={handleChange}
                    MenuProps={{ classes: { paper: 'pagination-page' } }}
                  >
                    {timeZones.map(item => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </SelectStyled>
                </FieldGrid>
              </Grid>
              <Grid container spacing={6} sx={{ mt: 2 }}>
                <FieldGrid item xs={12} md={12}>
                  <FieldLabel>Signature:</FieldLabel>
                  <RichTextarea
                    name="signature"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </FieldGrid>
              </Grid>
              <ButtonGrid>
                <StyledButton variant="primary" onClick={submit}>
                  Submit
                </StyledButton>
              </ButtonGrid>
            </Box>
          </Wrapper>
        </StyledBox>
      </>
    );
  }
);
