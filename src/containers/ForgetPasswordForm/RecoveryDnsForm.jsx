import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Button, CopyToClipboard } from '../../components';
import { ConfirmationDialog } from '..';
import { useLocalization } from '../../hooks';
import { HeadingWrapper, StyledTableCell } from './ForgetPasswordForm.styles';
import { ReactComponent as SuccessIcon } from '../../images/SuccessIcon.svg';
import { useDomain } from '../../queries';
import { enterToFormikSubmit } from '../../utils';
export const RecoveryDnsForm = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const { data: domainInfo } = useDomain();
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useLocalization();
    const recaptchaRef = React.useRef();

    const handleClose = React.useCallback(() => {
      setOpenDialog(false);
    }, []);
    const handleOpen = useCallback(() => {
      setOpenDialog(true);
    }, []);
    useEffect(() => {
      // recaptchaRef?.current?.executeAsync().then((token) => {
      //   setFieldValue('recaptchaToken', token);
      // });
    }, [recaptchaRef, setFieldValue]);

    const handleNextClick = useCallback(() => {
      setOpenDialog(false);
      setFieldValue('step', 'reset-password');
    }, [setFieldValue]);

    const handleKeyPress = useCallback(
      e => enterToFormikSubmit(handleNextClick)(e),
      [handleNextClick]
    );
    return (
      <div onKeyDown={handleKeyPress}>
        <HeadingWrapper>
          <h2>{t.container.forgetPasswordForm.accRecovery}</h2>
          <p>
          {t.container.forgetPasswordForm.accRecoveryTxt}
          </p>
          <p className="finalstep">
          {t.container.forgetPasswordForm.finalStepTxt}
          </p>
        </HeadingWrapper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t.verifyDomain.type}</StyledTableCell>
                <StyledTableCell>{t.verifyDomain.hostName}</StyledTableCell>
                <StyledTableCell>{t.verifyDomain.value}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                {t.container.forgetPasswordForm.txtRecord}
                </StyledTableCell>
                <StyledTableCell>@</StyledTableCell>
                <StyledTableCell>
                  <CopyToClipboard
                    text={`deepbluework-verification=${domainInfo?.verificationCode}`}
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 3 }}>
          <Button
            sx={{ height: 44, marginTop: 2, width: '110px', mr: 2 }}
            fullWidth
            variant="primaryGrey"
          >
            {t.container.forgetPasswordForm.cancelButton}
          </Button>
          <Button
            sx={{ height: 44, marginTop: 2, width: '110px' }}
            variant="primary"
            onClick={handleOpen}
          >
            {t.container.forgetPasswordForm.applyButton}
          </Button>
        </Box>

        <ConfirmationDialog
          title="Congratulations !"
          subtitle="Your account has been verified"
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleNextClick}
          deletebtn="Set new password"
        >
          <SuccessIcon />
        </ConfirmationDialog>
      </div>
    );
  }
);
