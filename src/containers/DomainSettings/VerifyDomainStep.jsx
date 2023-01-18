import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  CopyToClipboard,
  ContentSection,
} from '../../components';
import { StyledTableCell } from './DomainSettings.styles';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDNSStatusRecheck, useLocalization } from '../../hooks';
import { useCheckDNSStatus, useDomain } from '../../queries';
import { dnsRecheckAtom } from '../../atoms';
import { useRecoilState } from 'recoil';
import { LoadingModal } from './LoadingModal';

export const VerifyDomainStep = React.memo(
  ({ setActive, domain, setStepStatus }) => {
    const { t } = useLocalization();
    const {
      data: verficationStatus,
      refetch: reCheck,
      isFetching: verficationStatusLoading,
    } = useCheckDNSStatus({
      recordType: 'VERIFICATION',
    });

    const completed = useMemo(() => verficationStatus === 'OK', [
      verficationStatus,
    ]);

    useEffect(() => {
      setStepStatus(statuses => ({ ...statuses, verification: completed }));
    }, [completed, setStepStatus]);

    const { data: domainInfo, isLoading } = useDomain();
    const [recheckStatus, setRecheckStatus] = useRecoilState(dnsRecheckAtom);
    const [openDialog, setOpenDialog] = useState(false);
    useDNSStatusRecheck({
      recheckStatus,
      setRecheckStatus,
      completed,
      reCheck,
    });

    const handleNext = useCallback(() => {
      if (completed) {
        setActive(2);
      } else {
        setRecheckStatus({ checking: true, count: 0 });
        setOpenDialog(true);
      }
    }, [completed, setActive, setRecheckStatus]);
    const handleCancel = useCallback(() => {
      setRecheckStatus({ checking: false, count: 0 });
      setOpenDialog(false);
    }, [setRecheckStatus]);
    return (
      <ContentSection subHeading={t.SelectDomainStep.DMARC.subtitle}>
        <Stack mb={4} sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info" type="info">
            {t.verifyDomain?.alert1(domain, 'TXT')}
          </Alert>
          <Alert severity="warning" type="warning">
            {t.verifyDomain?.alert2('TXT')}
          </Alert>
        </Stack>
        <span>{t.verifyDomain.addRecords}</span>
        <br />
        <br />
        {!!domainInfo?.verificationCode ? (
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
                    {t.container.domainSetting.textRecord}
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
        ) : (
          <Box p={2}>
            <LinearProgress />
          </Box>
        )}
        <Stack mt={4} mb={4} sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning" type="warning">
            {t.verifyDomain.alert3}
          </Alert>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            gap: '6px',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
          }}
        >
          {openDialog && (
            <LoadingModal handleCancel={handleCancel} completed={completed} />
          )}
          {domainInfo?.status === 'ACTIVE' ? (
            <Button disabled variant="primary">
              {t.verifyDomain.activated}
            </Button>
          ) : (
            <Button
              disabled={verficationStatusLoading || isLoading}
              onClick={handleNext}
              variant="primary"
            >
              {recheckStatus?.checking ? (
                <>
                  <CircularProgress size={12} color="inherit" />
                </>
              ) : completed ? (
                `${t.verifyDomain.next}`
              ) : (
                `${t.verifyDomain.check}`
              )}
            </Button>
          )}
        </Box>
      </ContentSection>
    );
  }
);
