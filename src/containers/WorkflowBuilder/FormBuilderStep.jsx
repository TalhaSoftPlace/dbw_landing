import { Box, Modal } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeModeAtom, workflowBuilderAtom } from '../../atoms';
import { Button, ContentSection, FormViewer } from '../../components';
import { useToggle, useLocalization } from '../../hooks';
import { HeaderAction } from '../HeaderAction';
import {
  CloseIconStyled,
  FormbuilderWrapper,
  FormModal,
} from './WorkflowBuilder.styles';

export const FormBuilderStep = React.memo(({ setActive }) => {
  const mode = useRecoilValue(themeModeAtom);
  const [showModal, toggleModal] = useToggle(false);
  const [{ json, workflow }, setBuilderState] = useRecoilState(
    workflowBuilderAtom
  );

  const onFormChange = useCallback(
    event => {
      const data = (event?.data && JSON.parse(event?.data)) || undefined;
      if (data) {
        const schema = !!data?.schema ? JSON.parse(data?.schema) : undefined;
        const uiSchema = !!data?.uischema
          ? JSON.parse(data?.uischema)
          : undefined;
        !!schema &&
          !!uiSchema &&
          setBuilderState(state => ({
            ...state,
            json: {
              schema,
              uiSchema,
            },
          }));
      }
    },
    [setBuilderState]
  );

  useEffect(() => {
    window.addEventListener('message', onFormChange, false);
    return () => window.removeEventListener('message', onFormChange, false);
  }, [onFormChange]);

  const handleClick = React.useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const handleNext = React.useCallback(() => {
    setActive(1);
  }, [setActive]);

  const url = useMemo(
    () =>
      `/form-builder/index.html?mode=${mode}&schema=${encodeURIComponent(
        workflow?.formDesignJson ?? JSON.stringify(json) ?? ''
      )}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { t } = useLocalization();

  return (
    <ContentSection
      maxWidth="xl"
      heading={<>{t.container.workflowBuilder.newWorkFlowCmpnt}</>}
      subHeading={'You can fill the details to add new workflow'}
      headerAction={
        <HeaderAction icon={<></>} text="Preview form" onClick={handleClick} />
      }
    >
      <Modal open={showModal} onClose={toggleModal}>
        <FormModal>
          <CloseIconStyled onClick={toggleModal} />
          <FormViewer json={json} />
        </FormModal>
      </Modal>
      <FormbuilderWrapper>
        <iframe title="Form builder" src={url} />
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button onClick={handleNext} variant="primaryLight">
            {t.container.workflowBuilder.continueBtn}
          </Button>
        </Box>
      </FormbuilderWrapper>
    </ContentSection>
  );
});
