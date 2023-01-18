import React, { useCallback } from 'react';
import {
  FormControl,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import { Button, Logo } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  TypographyStyled,
  Textarea,
  FromWrapper,
  StyledSelect,
} from './FeedBackDialog.styles';
import {
  enterToFormikSubmit,
  getErrorsArrayfromFormikErrors,
} from '../../utils';
import { useSnackbar } from 'notistack';
export const FeedbackForm = React.memo(
  ({ values, handleChange, handleSubmit, isLoading, errors }) => {
    const { enqueueSnackbar } = useSnackbar();
    const submit = useCallback(() => {
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit]);
    const handleKeyPress = useCallback(e => enterToFormikSubmit(submit)(e), [
      submit,
    ]);
    const { t } = useLocalization();

    return (
      <>
        <form onKeyDown={handleKeyPress}>
          <FromWrapper>
            <HeadingWrapper>
              <Logo variant="dark" />
            </HeadingWrapper>
            <Box sx={{ color: 'text.blueLight', fontSize: '22px' }}>
              {t.container.feedbackDialog.feedBackMsg}
            </Box>
            <Fileds className="disable-hover" mt={3} w={100}>
              <TypographyStyled mt={2}>
              {t.container.feedbackDialog.feedBackSelectCategory}
              </TypographyStyled>
              <FormControl
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <StyledSelect
                  labelId="category"
                  id="category"
                  name="category"
                  value={values?.category}
                  className="field"
                  onChange={handleChange}
                  placeholder={t.loginForm?.usernamePlaceholder}
                >
                  <MenuItem value="category">{t.container.feedbackDialog.feedBackCategory}</MenuItem>
                  <MenuItem value="Feature Request">{t.container.feedbackDialog.feedBackFeatureRequest}</MenuItem>
                  <MenuItem value="Recommendation">{t.container.feedbackDialog.feedBackRecommendation}</MenuItem>
                  <MenuItem value="General">{t.container.feedbackDialog.feedBackGeneral}</MenuItem>
                  <MenuItem value="Question">{t.container.feedbackDialog.feedBackQuestions}</MenuItem>
                </StyledSelect>
              </FormControl>
              <TypographyStyled mt={2}>{t.container.feedbackDialog.feedBackContenr}</TypographyStyled>
              <FormControl size="small" fullWidth>
                <Textarea
                  autoFocus
                  multiline
                  rows={3}
                  maxRows={3}
                  name="feedbacknote"
                  onChange={handleChange}
                  placeholder="Enter Text Here"
                  labelId="feedbacknote"
                  id="feedbacknote"
                  value={values?.feedbacknote}
                />
              </FormControl>

              <Button
                disabled={isLoading}
                onClick={submit}
                sx={{ height: 44, marginTop: 4 }}
                fullWidth
                variant="primary"
              >
                {isLoading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  'Send'
                )}
              </Button>
            </Fileds>
          </FromWrapper>
        </form>
      </>
    );
  }
);
