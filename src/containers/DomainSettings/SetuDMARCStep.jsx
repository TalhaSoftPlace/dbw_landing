import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  ContentSection,
  CopyToClipboard,
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
import { useDomain, useDomainDNS } from '../../queries';
import { useActivateDomainMutation } from './../../mutations';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dnsRecheckAtom } from '../../atoms';
import { LoadingModal } from './LoadingModal';

export const SetupDMARCStep = React.memo(({ setActive, domain, step }) => {
  const { t } = useLocalization();
  const { enqueueSnackbar } = useSnackbar();
  const { data: domainInfo, isLoading: isDomainLoading } = useDomain();
  const { data: { dmarc } = {}, isLoading } = useDomainDNS({ domain });

  const {
    mutateAsync: activateDomain,
    isLoading: isActivating,
  } = useActivateDomainMutation();
  const completed = useMemo(() => domainInfo?.status === 'ACTIVE', [
    domainInfo?.status,
  ]);

  const [recheckStatus, setRecheckStatus] = useRecoilState(dnsRecheckAtom);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleBack = useCallback(() => setActive(4), [setActive]);

  const handleComplete = useCallback(() => {
    domain &&
      activateDomain({ domain }).then(res => {
        if (res === 'OK') {
          enqueueSnackbar(t.verifyDomain.activateSuccess, {
            variant: 'success',
          });
        }
      });
  }, [activateDomain, domain, enqueueSnackbar, t.verifyDomain.activateSuccess]);

  const handleNext = useCallback(() => {
    if (completed) {
      setTimeout(() => navigate('/workspace'), 1000);
    } else {
      setRecheckStatus({ checking: true, count: 1 });
      setOpenDialog(true);
    }
  }, [completed, navigate, setRecheckStatus]);

  useDNSStatusRecheck({
    recheckStatus,
    setRecheckStatus,
    completed,
    reCheck: handleComplete,
    retry: 6,
  });

  const handleCancel = useCallback(() => {
    if (completed) {
      setTimeout(() => navigate('/workspace'), 1000);
    } else {
      setRecheckStatus({ checking: false, count: 0 });
      setOpenDialog(false);
    }
  }, [setRecheckStatus, setOpenDialog, navigate, completed]);

  return (
    <ContentSection
      heading={domain}
      subHeading={t.SelectDomainStep.DMARC.subtitle}
    >
      <Stack mb={4} sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info" type="info">
          {t?.verifyDomain?.alert1(domain, 'DMARC')}
        </Alert>
        <Alert severity="warning" type="warning">
          {t.verifyDomain.alert2('DMARC')}
        </Alert>
      </Stack>
      <span>{t.verifyDomain.addRecords}</span>
      <br />
      <br />
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
            {dmarc &&
              Object.entries(dmarc).map(([key, value]) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={value + key}
                >
                  <StyledTableCell component="th" scope="row">
                    TXT Record
                  </StyledTableCell>
                  <StyledTableCell>
                    <CopyToClipboard text={key ?? ''} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CopyToClipboard text={value ?? ''} />
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <Box p={2}>
          <LinearProgress />
        </Box>
      )}
      <Stack mt={4} mb={4} sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning" type="warning">
          {t.verifyDomain.alert3}
        </Alert>
      </Stack>
      {openDialog && (
        <LoadingModal handleCancel={handleCancel} completed={completed} />
      )}
      <Box
        sx={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'flex-end',
          marginLeft: 'auto',
        }}
      >
        {step.activated ? (
          <Button disabled variant="primary">
            {t.verifyDomain.activated}
          </Button>
        ) : (
          <>
            <Button onClick={handleBack} variant="outlined">
              {t.verifyDomain.previous}
            </Button>
            <Button
              onClick={handleNext}
              disabled={isActivating || isDomainLoading || completed}
              variant="primary"
            >
              {recheckStatus?.checking ? (
                <CircularProgress size={30} color="inherit" />
              ) : completed ? (
                `${t.verifyDomain.activated}`
              ) : (
                `${t.verifyDomain.activate}`
              )}
            </Button>
          </>
        )}
      </Box>
    </ContentSection>
  );
});
