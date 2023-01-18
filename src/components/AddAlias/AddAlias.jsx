import React, { useState } from 'react';
import { DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CloseIconStyled, DialogStyled } from './AddAlias.styles';
import { FieldGrid, FieldLabel, StyledTextField } from './AddAlias.styles';
import { Button } from '../Button';
import { useLocalization } from '../../hooks';

export const AddAlias = React.memo(({ values, setFieldValue }) => {
  const [aliasDialog, setAliasDialog] = useState(false);
  const [addAliasTextField, setAddAliasTextField] = useState('');

  const handleChange = React.useCallback(e => {
    setAddAliasTextField(e.target.value);
  }, []);

  const addAlias = React.useCallback(() => {
    setFieldValue('alias', [...values.alias, addAliasTextField]);
    setAliasDialog(false);
    setAddAliasTextField('');
  }, [addAliasTextField, setFieldValue, values.alias]);

  const handleClose = React.useCallback(() => {
    setAliasDialog(false);
    setAddAliasTextField('');
  }, [setAliasDialog]);

  const handleOpen = React.useCallback(() => {
    setAliasDialog(true);
  }, [setAliasDialog]);
  const { t } = useLocalization();

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <AddIcon
          sx={{
            color: 'text.blueLight',
          }}
        />
      </IconButton>

      <DialogStyled
        open={aliasDialog}
        keepMounted
        aria-describedby=""
        fullWidth
      >
        <DialogTitle sx={{ pb: 0 }}>
          <CloseIconStyled onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <FieldLabel sx={{ mb: 1 }}>
                {t.components.addAlias.enterAlias}
              </FieldLabel>
              <StyledTextField
                value={addAliasTextField}
                onChange={handleChange}
              />
            </Grid>
            <FieldGrid item xs={4}>
              <Button
                onClick={addAlias}
                fullWidth
                size="small"
                variant="primary"
              >
                {t.components.addAlias.saveTxt}
              </Button>
            </FieldGrid>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </>
  );
});
