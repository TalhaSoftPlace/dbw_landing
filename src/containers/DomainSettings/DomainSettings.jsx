import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Steps } from '../../components';
import { SelecteDomainStep } from './SelectDomainStep';
import { VerifyDomainStep } from './VerifyDomainStep';
import { SetupMXStep } from './SetupMXStep';
import { SetupSPFStep } from './SetupSPFStep';
import { SetupDKIMStep } from './SetupDKIMStep';
import { SetupDMARCStep } from './SetuDMARCStep';
import { useAuth } from '../../hooks';
import { useDomain } from '../../queries';

const StepContents = [
  SelecteDomainStep,
  VerifyDomainStep,
  SetupMXStep,
  SetupSPFStep,
  SetupDKIMStep,
  SetupDMARCStep,
];

export const DomainSettings = React.memo(() => {
  const { data: domainInfo } = useDomain();
  const [stepStatus, setStepStatus] = useState({
    verification: false,
    mx: false,
    spf: false,
  });
  const steps = useMemo(
    () => [
      {
        id: 1,
        completed: stepStatus.verification,
        activated:
          domainInfo?.status === 'ACTIVE' ||
          domainInfo?.status === 'SUBSCRIBED',
        title: 'Step 1',
        subtitle: 'Verify Domain',
      },
      {
        id: 2,
        completed: stepStatus.verification && stepStatus.mx,
        activated:
          domainInfo?.status === 'ACTIVE' ||
          domainInfo?.status === 'SUBSCRIBED',
        title: 'Step 2',
        subtitle: 'MX Records',
      },
      {
        id: 3,
        completed: stepStatus.verification && stepStatus.mx && stepStatus.spf,
        activated:
          domainInfo?.status === 'ACTIVE' ||
          domainInfo?.status === 'SUBSCRIBED',
        title: 'Step 3',
        subtitle: 'SPF Records',
      },
      {
        id: 4,
        completed: false,
        optional: stepStatus.verification && stepStatus.mx && stepStatus.spf,
        activated:
          domainInfo?.status === 'ACTIVE' ||
          domainInfo?.status === 'SUBSCRIBED',
        title: 'Step 4',
        subtitle: 'DKIM Records',
      },
      {
        id: 5,
        completed: false,
        optional: stepStatus.verification && stepStatus.mx && stepStatus.spf,
        activated:
          domainInfo?.status === 'ACTIVE' ||
          domainInfo?.status === 'SUBSCRIBED',
        title: 'Step 5',
        subtitle: 'DMARC Records',
      },
    ],
    [domainInfo, stepStatus]
  );

  const [active, setActive] = useState(1);
  const handleSelect = useCallback(
    id => {
      setActive(id);
    },
    [setActive]
  );
  const Content = useMemo(() => StepContents[active], [active]);
  const { user = {} } = useAuth();
  const activeStep = useMemo(() => steps.find(({ id }) => id === active), [
    active,
    steps,
  ]);
  return (
    <Box mt={3}>
      <Box mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Steps steps={steps} active={active} onSelect={handleSelect} />
      </Box>
      <Container maxWidth="lg">
        {Content && (
          <Content
            step={activeStep}
            setActive={setActive}
            domain={user?.domainModel?.domainName}
            setStepStatus={setStepStatus}
          />
        )}
      </Container>
    </Box>
  );
});
