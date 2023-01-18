import React, {useCallback } from 'react';
import { Grid ,CircularProgress , Box ,FormControl , OutlinedInput} from '@mui/material';
import {FieldLabel} from './CreateEmailFolder.styles';
import { Button } from '../../components';
import { useLocalization } from '../../hooks';
import { useSnackbar } from 'notistack';
import { enterToFormikSubmit } from '../../utils';
export const CreateFolderForm = React.memo(
  ({ handleChange, values, handleSubmit, errors , touched , isLoading }) => {
  const { t } = useLocalization();
  const { enqueueSnackbar } = useSnackbar();
    const submit = useCallback(() => {
      Object.values(errors).forEach((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);

    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleSubmit)(e),
      [handleSubmit]
    );
    return (
        <>
            <Grid item md={12} xs={12} sx={{pb:3}}>
            <FieldLabel>{t.container.createFolderForm.newFolderName}</FieldLabel>
            <FormControl size="small" fullWidth onKeyDown={handleKeyPress}>
                <OutlinedInput
                  autoFocus
                  variant="outlined"
                  error={!!errors.foldername && !!touched.foldername}
                  value={values.foldername}
                  onChange={handleChange}
                  type="text"
                name="foldername"
                placeholder="Folder Name"
                sx={{height: '50px' , color:'text.primaryText'}}
                />
              </FormControl>
            </Grid>
            <Box sx={{display:'flex', justifyContent:'center' , width:'100%'}}>
                <Button
                    onClick={submit}
                    variant="primaryLight"
                    sx={{ width: '110px', lineHeight: 0 }}
                >
                  {isLoading ? <CircularProgress size={30} color="inherit" /> : 'Create'}
                </Button>
            </Box>
    </>
    );
  }
);
