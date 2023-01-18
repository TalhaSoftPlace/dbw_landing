import React from 'react';
import { ContentSection } from '../../components';
import { Workflows } from './Workflows';
import { useLocalization } from '../../hooks';

export const WorkflowManager = React.memo(() => {
  const { t } = useLocalization();
  return (
    <ContentSection
      maxWidth="xl"
      heading={<>{t.container.workflowManager.workflowManagementCmpnt}</>}
      subHeading={'You can manage workflows here'}
    >
      <Workflows />
    </ContentSection>
  );
});
