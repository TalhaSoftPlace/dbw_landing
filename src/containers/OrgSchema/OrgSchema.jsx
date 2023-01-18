import React, { useCallback, useState } from 'react';
import { ContentSection, OrgSchemaTreeView } from '../../components';
import { useLocalization } from '../../hooks';
import { HeaderActionButton } from '../AddNewCard/AddNewCard.styles';
import { AddCircleOutlineStyled } from './OrgSchema.styles';

export const OrgSchema = React.memo(() => {
  const { t } = useLocalization();

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [setIsEdit, isEdit]);

  return (
    <ContentSection
      heading={t.orgSchema.heading}
      subHeading={t.orgSchema.subHeading}
      headerAction={
        <HeaderActionButton onClick={handleEdit}>
          <AddCircleOutlineStyled color="text.light" /> {!isEdit ? t.general.edit : t.general.save}
        </HeaderActionButton>
      }
    >
      <OrgSchemaTreeView isEdit={isEdit} />
    </ContentSection>
  );
});
