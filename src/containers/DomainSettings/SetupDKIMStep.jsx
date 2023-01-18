import React, { useCallback } from 'react';
import {
  Alert,
  Button,
  ContentSection,
  CopyToClipboard,
} from '../../components';
import { StyledTableCell } from './DomainSettings.styles';
import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useLocalization } from '../../hooks';
import { useDomainDNS } from '../../queries';

export const SetupDKIMStep = React.memo(({ setActive, domain, step }) => {
  const { t } = useLocalization();
  const { data: { dkim } = {}, isLoading } = useDomainDNS({ domain });
  const handleNext = useCallback(() => {
    if (step.optional || step.completed) {
      setActive(5);
    } else {
      if (step.refetchStatus) {
        step.refetchStatus();
      }
    }
  }, [setActive, step]);
  const handleBack = useCallback(() => setActive(3), [setActive]);
  return (
    <ContentSection
      heading={domain}
      subHeading={t.SelectDomainStep.DMARC.subtitle}
    >
      <Stack mb={4} sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info" type="info">
          {t?.verifyDomain?.alert1(domain, 'DKIM')}
        </Alert>
        <Alert severity="warning" type="warning">
          {t?.verifyDomain?.alert2('DKIM')}
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
            {dkim &&
              Object.entries(dkim).map(([key, value]) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={value + key}
                >
                  <StyledTableCell component="th" scope="row">
                    {t?.container?.domainSetting?.textRecord}
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
            <Button onClick={handleNext} variant="primary">
              {t.verifyDomain.next}
            </Button>
          </>
        )}
      </Box>
    </ContentSection>
  );
});
