import React, { useEffect } from 'react';
import { AddNew, Wrapper } from './Workflows.styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { WorkflowItem } from './WorkflowItem';
import { useWorkflows } from '../../queries';
import { useSetRecoilState } from 'recoil';
import { workflowBuilderAtom, workflowPaginationAtom } from '../../atoms';
import { Loading, WorkflowsPagination } from '../../components';
export const Workflows = React.memo(() => {
  const setBuilderState = useSetRecoilState(workflowBuilderAtom);
  const navigate = useNavigate();
  const handleNew = React.useCallback(() => {
    setBuilderState(state => ({
      ...state,
      workflow: undefined,
      json: { schema: {}, uischema: {} },
      selectedUsers: [],
      firstApprovals: [],
      secondApprovals: [],
      thirdApprovals: [],
      selectedfields: [],
    }));
    navigate('add-new');
  }, [navigate, setBuilderState]);

  const {
    data: { content: workflows = [], totalElements = 0 } = {},
    isFetching,
  } = useWorkflows();
  const setPagination = useSetRecoilState(workflowPaginationAtom);
  useEffect(() => {
    setPagination(state => ({ ...state, total: totalElements }));
  }, [setPagination, totalElements]);
  return (
    <>
      <Wrapper>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <AddNew onClick={handleNew}>
              <AddIcon fontSize="large" />
            </AddNew>
            {workflows.map(workflow => (
              <WorkflowItem key={workflow.id} workflow={workflow} />
            ))}
          </>
        )}
      </Wrapper>
      <WorkflowsPagination />
    </>
  );
});
