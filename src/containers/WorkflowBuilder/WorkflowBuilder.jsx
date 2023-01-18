import React, { useCallback, useMemo, useState } from 'react';
import { Box} from '@mui/material';
import { Steps } from '../../components';
import { FormBuilderStep } from './FormBuilderStep';
import { UserSelectionStep } from './UserSelectionStep';
import { ApprovalSelectionStep } from './ApprovalSelectionStep';
import { FieldsSelectionStep } from './FieldsSelectionStep';
import { Wrapper } from './WorkflowBuilder.styles';

const StepContents = [
  FormBuilderStep,
  UserSelectionStep,
  ApprovalSelectionStep,
  FieldsSelectionStep,
];

export const WorkflowBuilder = React.memo(() => {
  const steps = useMemo(
    () => [
      {
        id: 0,
        title: 'Step 1',
        subtitle: 'Form Design',
        optional: true,
      },
      {
        id: 1,
        title: 'Step 2',
        subtitle: 'User',
        optional: true,
      },
      {
        id: 2,
        title: 'Step 3',
        subtitle: 'Approval',
        optional: true,
      },
      {
        id: 3,
        title: 'Step 4',
        subtitle: 'View',
        optional: true,
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const handleSelect = useCallback(
    (id) => {
      setActive(id);
    },
    [setActive]
  );
  const Content = useMemo(() => StepContents[active], [active]);

  return (
    <Box mt={3} sx={{ height: '100%' }}>
      <Box mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Steps steps={steps} active={active} onSelect={handleSelect} />
      </Box>
      <Wrapper>
          {Content && <Content setActive={setActive} />}
      </Wrapper>
    </Box>
  );
});
