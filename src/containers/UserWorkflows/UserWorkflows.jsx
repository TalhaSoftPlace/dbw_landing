import React, { useCallback, useEffect } from 'react';
import {
  Wrapper,
  WorkflowsWrapper,
  WorkflowItem,
  IconWrapper,
  TextWrapper,
  WorkflowIcon,
} from './UserWorkflows.style';
import { ContentSection, Loading, WorkflowsPagination } from '../../components';
import { useWorkflows } from '../../queries';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { workflowPaginationAtom } from '../../atoms';

export const UserWorkflows = React.memo(() => {
  const {
    data: { content: workflows = [], totalElements = 0 } = {},
    isFetching,
  } = useWorkflows();
  const navigate = useNavigate();
  const setPagination = useSetRecoilState(workflowPaginationAtom);
  useEffect(() => {
    setPagination(state => ({ ...state, total: totalElements }));
  }, [setPagination, totalElements]);

  const handleSelect = useCallback(
    workflow => {
      navigate(`details/${workflow?.id}`);
    },
    [navigate]
  );

  return (
    <Wrapper>
      <ContentSection
        heading={'Forms'}
        subHeading={'You can manage workflow forms here'}
      >
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <WorkflowsWrapper>
              {workflows?.map((workflow, idx) => (
                <WorkflowItem
                  onClick={() => handleSelect(workflow)}
                  key={idx}
                  className={workflow?.status === 'P' ? 'published' : ''}
                >
                  <IconWrapper>
                    <WorkflowIcon />
                  </IconWrapper>
                  <TextWrapper>{workflow.description}</TextWrapper>
                </WorkflowItem>
              ))}
            </WorkflowsWrapper>
            <WorkflowsPagination />
          </>
        )}
      </ContentSection>
    </Wrapper>
  );
});
