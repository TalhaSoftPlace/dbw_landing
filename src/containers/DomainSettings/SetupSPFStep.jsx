import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useCheckDNSStatus, useDomainDNS } from '../../queries';
import { useRecoilState } from 'recoil';
import { dnsRecheckAtom } from '../../atoms';
import { LoadingModal } from './LoadingModal';

export const SetupSPFStep = React.memo(
  ({ setActive, domain, setStepStatus, step }) => {
    const { t } = useLocalization();
    const {
      data: spfStatus,
      refetch: reCheck,
      isFetching: checking,
    } = useCheckDNSStatus({
      recordType: 'SPF',
    });
    const { data: { spf } = {}, isLoading } = useDomainDNS({ domain });

    const completed = useMemo(() => spfStatus === 'OK', [spfStatus]);

    useEffect(() => {
      setStepStatus(statuses => ({ ...statuses, spf: completed }));
    }, [completed, setStepStatus]);

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
        setActive(4);
      } else {
        setRecheckStatus({ checking: true, count: 0 });
        setOpenDialog(true);
      }
    }, [completed, setActive, setRecheckStatus]);

    const handleCancel = useCallback(() => {
      setRecheckStatus({ checking: false, count: 0 });
      setOpenDialog(false);
    }, [setRecheckStatus]);
    const handleBack = useCallback(() => setActive(2), [setActive]);
    return (
      <ContentSection
        heading={domain}
        subHeading={t.SelectDomainStep.DMARC.subtitle}
      >
        <Stack mb={4} sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info" type="info">
            {t?.verifyDomain?.alert1(domain, 'TXT')}
          </Alert>
          <Alert severity="warning" type="warning">
            {t?.verifyDomain?.alert2('TXT')}
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
              {spf && (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {t.container.domainSetting.textRecord}
                  </StyledTableCell>
                  <StyledTableCell>
                    {t.container.domainSetting.styledTblCell}
                  </StyledTableCell>
                  <StyledTableCell>
                    <CopyToClipboard text={spf} />
                  </StyledTableCell>
                </TableRow>
              )}
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
                {'<'} {t.verifyDomain.previous}
              </Button>
              {openDialog && (
                <LoadingModal
                  handleCancel={handleCancel}
                  completed={completed}
                />
              )}
              <Button
                disabled={checking || isLoading}
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
            </>
          )}
        </Box>
      </ContentSection>
    );
  }
);
