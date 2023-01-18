import React, { useCallback } from 'react';
import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Button, Logo } from '../../components';
import { useLocalization } from '../../hooks';
import {
  Fileds,
  HeadingWrapper,
  TypographyStyled,
  Textarea,
  FormHeader,
  FromWrapper,
} from './FeedbackForm.styles';
import {
  enterToFormikSubmit,
  getErrorsArrayfromFormikErrors,
} from '../../utils';
import { useSnackbar } from 'notistack';
export const Form = React.memo(
  ({ values, handleChange, handleBlur, handleSubmit, isLoading, errors, setFieldValue }) => {
    const { t } = useLocalization();
    const { enqueueSnackbar } = useSnackbar();
    const submit = useCallback(() => {
      setFieldValue('step', 'feedback');
      getErrorsArrayfromFormikErrors(errors).forEach(error => {
        enqueueSnackbar(error, { variant: 'error' });
      });
      handleSubmit();
    }, [enqueueSnackbar, errors, handleSubmit, setFieldValue]);

    const handleKeyPress = useCallback(e => enterToFormikSubmit(submit)(e), [
      submit,
    ]);

    return (
      <>
        <form onKeyDown={handleKeyPress}>
          <FormHeader>{t.container.feedbackDialog.feedBackMsg}</FormHeader>
          <FromWrapper>
            <HeadingWrapper>
              <Logo variant="dark" />
            </HeadingWrapper>
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
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={values?.category}
                  className="field"
                  onChange={handleChange}
                  placeholder={t.loginForm?.usernamePlaceholder}
                  sx={{color:'text.primaryText'}}
                >
                  <MenuItem value="category">{t.container.feedbackDialog.feedBackCategory}</MenuItem>
                  <MenuItem value="Feature Request">{t.container.feedbackDialog.feedBackFeatureRequest}</MenuItem>
                  <MenuItem value="Recommendation">{t.container.feedbackDialog.feedBackRecommendation}</MenuItem>
                  <MenuItem value="General">{t.container.feedbackDialog.feedBackGeneral}</MenuItem>
                  <MenuItem value="Question">{t.container.feedbackDialog.feedBackQuestions}</MenuItem>
                </Select>
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
                  sx={{color:'text.primaryText'}}
                />
              </FormControl>
              <TypographyStyled mt={2}>Enter your email</TypographyStyled>
              <FormControl size="small" fullWidth>
                <OutlinedInput
                  variant="outlined"
                  id="username"
                  name="username"
                  value={values?.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={values?.username ? 'text' : 'username'}
                  placeholder="your email"
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
