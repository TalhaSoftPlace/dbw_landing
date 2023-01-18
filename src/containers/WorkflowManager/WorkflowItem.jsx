import React, { useCallback, useMemo } from 'react';
import {
  IconWrapper,
  ItemWrapper,
  PublishedIcon,
  TextWrapper,
  SpanText,
  MoreHorizIcons
} from './Workflows.styles';
import {
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
} from '../../mutations'; 
import { useSetRecoilState } from 'recoil';
import { workflowBuilderAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { ContextMenu } from '../../components';
import { IconButton } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {WorkflowIcon} from './WorkflowManager.styles';

export const WorkflowItem = React.memo(({ workflow }) => {
  const setBuilderState = useSetRecoilState(workflowBuilderAtom);
  const { mutateAsync: deleteWorkflow } = useDeleteWorkflowMutation();
  const { mutateAsync: updateWorkflow } = useUpdateWorkflowMutation();
  const navigate = useNavigate();
  const handleDelete = useCallback(() => {
    deleteWorkflow({ id: workflow.id });
  }, [deleteWorkflow, workflow.id]);

  const handlePublish = useCallback(() => {
    updateWorkflow({ ...workflow, workflowId: workflow.id, status: 'P' });
  }, [updateWorkflow, workflow]);

  const handlUnpublish = useCallback(() => {
    updateWorkflow({ ...workflow, workflowId: workflow.id, status: 'U' });
  }, [updateWorkflow, workflow]);

  const handleSelect = useCallback(() => {
    const selectedUsers =
      workflow?.workFlowUsers?.map((item) => ({
        node_id: item.unit,
        name:
          item.unitType === 'user'
            ? item.unit
            : item.unitName ?? `${item.unitType}: ${item.unit}`,
        from: item.unitType,
      })) || [];

    const selectedApp =
      workflow?.workFlowApprovals?.map((item) => ({
        node_id: item.unit,
        from: item.unitType,
        name:
          item.unitType === 'user'
            ? item.unit
            : item.unitName ?? `${item.unitType}: ${item.unit}`,
        level: item.level,
      })) || [];
    const firstApprovals = selectedApp.filter((item) => item.level === 1);
    const secondApprovals = selectedApp.filter((item) => item.level === 2);
    const thirdApprovals = selectedApp.filter((item) => item.level === 3);
    const selectedfields =
      workflow?.workFlowViews?.map((item) => ({
        node_id: item.columnKey,
        from: 'fields',
        name: item.columnName,
      })) || [];
    setBuilderState((state) => ({
      ...state,
      workflow,
      selectedUsers,
      firstApprovals,
      secondApprovals,
      thirdApprovals,
      selectedfields,
    }));
    navigate('add-new');
  }, [navigate, setBuilderState, workflow]);

  const menuItems = useMemo(
    () => [
      {
        name: workflow?.status === 'P' ? 'Unpublish' : 'Publish',
        onClick: () =>
          workflow?.status === 'P' ? handlUnpublish() : handlePublish(),
      },
      { name: 'Delete', onClick: handleDelete },
    ],
    [handlUnpublish, handleDelete, handlePublish, workflow?.status]
  );
  const noAction = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const isPublished = useMemo(
    () => workflow?.status === 'P',
    [workflow?.status]
  );
  return (
    <ItemWrapper className={isPublished ? 'published' : ''}>
      <IconWrapper onClick={noAction}>
        <ContextMenu menuItems={menuItems} anchorOrigin="left">
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="1"
            aria-haspopup="true"
            color="inherit"
          >
            <MoreHorizIcons  />
          </IconButton>
        </ContextMenu>
      </IconWrapper>
      <TextWrapper onClick={handleSelect}>
      <WorkflowIcon /> <SpanText class>{workflow.description}</SpanText>
      </TextWrapper>
      {isPublished && (
        <PublishedIcon>
          <CheckCircleTwoToneIcon />
        </PublishedIcon>
      )}
    </ItemWrapper>
  );
});
