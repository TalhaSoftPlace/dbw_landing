import React, { useCallback, useMemo } from 'react';
import {
  ApprovalLevelsAccordion,
  Button,
  ContentSection,
} from '../../components';

import { Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { workflowBuilderAtom } from '../../atoms';
import { useLocalization } from '../../hooks';

export const ApprovalSelectionStep = React.memo(({ setActive }) => {
  const handleNext = React.useCallback(() => {
    setActive(3);
  }, [setActive]);

  const [
    { firstApprovals, secondApprovals, thirdApprovals, selectedUsers },
    setBuilderState,
  ] = useRecoilState(workflowBuilderAtom);

  const allApprovals = useMemo(
    () => [...firstApprovals, ...secondApprovals, ...thirdApprovals],
    [firstApprovals, secondApprovals, thirdApprovals]
  );

  const setThirdApprovals = useCallback(
    (items) => {
      setBuilderState((state) => ({ ...state, thirdApprovals: items }));
    },
    [setBuilderState]
  );

  const setSecondApprovals = useCallback(
    (items) => {
      if (!items.length) {
        setThirdApprovals([]);
      }
      setBuilderState((state) => ({ ...state, secondApprovals: items }));
    },
    [setBuilderState, setThirdApprovals]
  );

  const setFirstApprovals = useCallback(
    (items) => {
      if (!items.length) {
        setSecondApprovals([]);
      }
      setBuilderState((state) => ({ ...state, firstApprovals: items }));
    },
    [setBuilderState, setSecondApprovals]
  );
  const { t } = useLocalization();

  return (
    <ContentSection
      maxWidth="xl"
      heading={<>{t.container.workflowBuilder.newWorkFlowCmpnt}</>}
      subHeading={'You can fill the details to add new workflow'}
    >
      <ApprovalLevelsAccordion
        firstApprovals={firstApprovals}
        setFirstApprovals={setFirstApprovals}
        secondApprovals={secondApprovals}
        setSecondApprovals={setSecondApprovals}
        thirdApprovals={thirdApprovals}
        setThirdApprovals={setThirdApprovals}
        allApprovals={allApprovals}
        selectedUsers={selectedUsers}
      />
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button onClick={handleNext} variant="primaryLight">
        {t.container.workflowBuilder.continueBtn}
        </Button>
      </Box>
    </ContentSection>
  );
});
