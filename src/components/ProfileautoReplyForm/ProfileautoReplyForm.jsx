import React, { useCallback } from 'react';
import { DatePicker } from '..';
import {
  FieldGrid,
  FieldLabel,
  Wrapper,
  StyledButton,
  StyledBox,
  ButtonGrid,
} from './ProfileautoReplyForm.styles';
import { Grid, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from 'notistack';
import { RichTextarea } from '../../components';
export const ProfileautoReplyForm = React.memo(
  ({ values, setFieldValue, handleSubmit, touched, errors }) => {
    const { enqueueSnackbar } = useSnackbar();

    const submit = useCallback(() => {
      Object.values(errors).forEach((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit(values);
    }, [enqueueSnackbar, errors, handleSubmit, values]);

    const handleCheckbox = useCallback((e) => {
      setFieldValue("autoReply", e.target.checked);
    }, [setFieldValue])

    return (
      <>
        <StyledBox sx={{ display: 'flex', justifyContent: 'center' }}>
          <Wrapper>
            <Box className="wrapper">
              <Grid container spacing={6} sx={{ mt: 2 }}>
                <FieldGrid item xs={12} md={4} lg={2} sx={{ mt: 1 }}>
                  <FieldLabel>Auto Reply:</FieldLabel>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Checkbox
                      size="small"
                      name="autoReply"
                      checked={values.autoReply}
                      onChange={handleCheckbox}
                    />
                    
                  </Box>
                  
                </FieldGrid>
                <FieldGrid item xs={12} md={8} lg={10}>
                <Grid container spacing={6} sx={{ mt: 0 }}>
                    <FieldGrid item xs={12} md={6}>
                      <FieldLabel>Start Date:</FieldLabel>
                      <DatePicker
                        size="small"
                        value={values.autoReplyStartDate}
                        disabled={!values.autoReply}
                        onChange={(value) =>
                          setFieldValue('autoReplyStartDate', value, true)
                        }
                        className="dark"
                      />
                    </FieldGrid>
                    <FieldGrid item xs={12} md={6}>
                      <FieldLabel>End Date:</FieldLabel>
                      <DatePicker
                        size="small"
                        value={values.autoReplyEndDate}
                        disabled={!values.autoReply}
                        onChange={(value) =>
                          setFieldValue('autoReplyEndDate', value, true)
                        }
                        className="dark"
                      />
                    </FieldGrid>
                  </Grid>
                </FieldGrid>
                <FieldGrid item xs={12} md={12}>
                <FieldLabel>Auto Reply Text:</FieldLabel>
                
                    <RichTextarea
                    name="autoReplyText"
                    values={values}
                    setFieldValue={setFieldValue}
                    disabledEditor={!values.autoReply}
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
