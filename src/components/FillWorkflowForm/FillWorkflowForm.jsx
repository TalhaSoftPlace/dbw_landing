import { Box, DialogContent } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';

import { Button, FormViewer } from '../../components';
import { useToggle } from '../../hooks';
import { useCreateWorkflowDocumentMutation } from '../../mutations';
import { CloseIconStyled, DialogStyled } from './FillWorkflowForm.styles';

export const FillWorkflowForm = React.memo(
  ({ workflow, selectedWorkflowDocument }) => {
    const [data, setData] = useState({});
    const {
      mutateAsync: createDocument,
      isLoading,
    } = useCreateWorkflowDocumentMutation();
    const [showForm, toggleShowForm] = useToggle(false);

    const json = useMemo(
      () =>
        workflow?.formDesignJson
          ? JSON.parse(workflow?.formDesignJson)
          : undefined,
      [workflow]
    );

    const handleChange = useCallback(
      ({ formData }) => {
        setData(formData);
        !isLoading &&
          createDocument({
            workFlowId: workflow?.id,
            formDesignJson: workflow?.formDesignJson,
            formDataJSON: JSON.stringify(formData),
            description: workflow?.description,
          }).then(() => {
            setData({});
            toggleShowForm();
          });
      },
      [
        createDocument,
        isLoading,
        toggleShowForm,
        workflow?.description,
        workflow?.formDesignJson,
        workflow?.id,
      ]
    );
    return (
      <>
        <Button
          sx={{ lineHeight: '15px !important' }}
          disabled={!workflow?.user || !!selectedWorkflowDocument}
          onClick={toggleShowForm}
          texttransform="none"
          fullWidth
          variant="primary"
          size="large"
        >
          Submit Document
        </Button>
        {workflow?.user && showForm && (
          <DialogStyled open={showForm} keepMounted fullWidth>
            <Box
              sx={{
                position: 'absolute',
                top: '5px',
                right: '0px',
              }}
            >
              <CloseIconStyled sx={{ flexGrow: 0 , zIndex:'5'}} onClick={toggleShowForm} />
            </Box>
            <DialogContent sx={{ paddingBlock: '16px', paddingInline: '12px' }}>
              {showForm && (
                <Box sx={{zIndex:'4'}}>
                  {json && (
                    <FormViewer
                      readOnly={isLoading}
                      json={json}
                      onSubmit={handleChange}
                      formData={data}
                    />
                  )}
                </Box>
              )}
            </DialogContent>
          </DialogStyled>
        )}
      </>
    );
  }
);
