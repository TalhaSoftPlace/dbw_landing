import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import { Button as CustomButton } from '../../components';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useLocalization } from '../../hooks';
import {
  Box,
  DialogContent,
  Grid,
  InputLabel,
  Typography,
} from '@mui/material';
import {
  CloseIconStyled,
  DialogStyled,
  FileInformation,
  FileUploadButtonWrapper,
  LogoPlaceHolderWrapper,
  LogoUploaderWrapper,
} from './LogoUploader.styles';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageCropper } from '../ImageCropper';
import { validImageBase64 } from '../../utils';

export const LogoUploader = React.memo(
  ({ setFieldValue, defaultLogo, handleDialogCloseRef }) => {
    const [fileName, setFileName] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [croppedImage, setCroppedImage] = useState('');
    const [defaultImage, setDefaultImage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const { t } = useLocalization();
    const hiddenFileInput = React.useRef(null);
    const LogoPlaceHolder = useMemo(() => {
      return <LogoPlaceHolderWrapper>Logo</LogoPlaceHolderWrapper>;
    }, []);

    const handleClick = useCallback(() => {
      hiddenFileInput.current.click();
    }, [hiddenFileInput]);

    const filesUploaded = React.useCallback(
      (file) => {
        if (file?.target?.files) {
          setFileName(file.target.files[0].name);
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => setImgSrc(reader.result.toString() || ''),
            setDialogOpen(true)
          );
          reader.readAsDataURL(file.target.files[0]);
          setTimeout(() => {
            file.target.value = null;
          }, 100);
        }
      },
      [setFileName]
    );

    const handleWrapperReset = useCallback(() => {
      setImgSrc('');
      setCroppedImage('');
      setFileName('');
    }, []);

    useEffect(() => {
      if (!defaultLogo) {
        setDefaultImage('');
        handleWrapperReset();
      }
      if (defaultLogo && !validImageBase64(defaultLogo))
        setDefaultImage(`data:image/png;base64,${defaultLogo}`);
      else if (defaultLogo && validImageBase64(defaultLogo))
        setDefaultImage(`${defaultLogo}`);
    }, [defaultLogo, handleWrapperReset, setDefaultImage]);

    const handleDialogClose = useCallback(() => {
      setDialogOpen(false);
      handleWrapperReset();
      setFieldValue('logo', '');
    }, [setFieldValue, handleWrapperReset]);

    const toggleDialog = useCallback(() => {
      setDialogOpen(!dialogOpen);
      setFieldValue('logo', croppedImage);
    }, [dialogOpen, croppedImage, setFieldValue]);

    const getImageToDisplay = useMemo(() => {
      if (croppedImage) {
        return (
          <LogoPlaceHolderWrapper>
            <img alt="comoany_logo" src={croppedImage} />
          </LogoPlaceHolderWrapper>
        );
      } else if (defaultImage) {
        return (
          <LogoPlaceHolderWrapper>
            <img alt="comoany_logo" src={defaultImage} />
          </LogoPlaceHolderWrapper>
        );
      } else {
        return LogoPlaceHolder;
      }
    }, [croppedImage, defaultImage, LogoPlaceHolder]);

    useEffect(() => {
      handleDialogCloseRef.current = handleWrapperReset;
    }, [handleDialogCloseRef, handleWrapperReset]);

    return (
      <LogoUploaderWrapper>
        <Box>
          <input
            ref={hiddenFileInput}
            onChange={filesUploaded}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            style={{ display: 'none' }}
          />
          <InputLabel
            sx={{
              fontSize: 18,
              color: 'text.light',
              textTransform: 'uppercase',
              marginTop: '22px',
            }}
          >
            {t.companySettings.uploadlogo}
          </InputLabel>

          <FileUploadButtonWrapper>
            <Button
              onClick={handleClick}
              className="logo-uploader"
              variant="outlined"
              startIcon={<FileUploadIcon />}
            >
              {t.companySettings.choose}
            </Button>
            <FileInformation>
              {fileName ? (
                <p className="no-file">{fileName}</p>
              ) : (
                <>
                  <p className="no-file">{t.companySettings.nofile}</p>
                  <p className="file-guide">{t.companySettings.filesize}</p>
                </>
              )}
            </FileInformation>
          </FileUploadButtonWrapper>
        </Box>

        <Box>{getImageToDisplay}</Box>

        <DialogStyled
          open={dialogOpen}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Crop Logo</Typography>
            <CloseIconStyled onClick={handleDialogClose} />
          </Box>
          {dialogOpen && (
            <DialogContent>
              <Grid container sx={{ pt: 2 }}>
                <Grid item lg={12}>
                  <ImageCropper
                    imgSrc={imgSrc}
                    setCroppedImage={setCroppedImage}
                  />
                </Grid>
                <Grid item lg={10} />
                <Grid item lg={2}>
                  <CustomButton
                    fullWidth
                    size="small"
                    variant="primary"
                    onClick={toggleDialog}
                  >
                    Save
                  </CustomButton>
                </Grid>
              </Grid>
            </DialogContent>
          )}
        </DialogStyled>
      </LogoUploaderWrapper>
    );
  }
);
