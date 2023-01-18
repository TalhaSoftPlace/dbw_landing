import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  ContentSection,
  CustomTreeView,
  WorkflowSelectedItem,
} from '../../components';
import {
  Column,
  Icon,
  IconWrapper,
  UserSelectionWrapper,
  HeadText,
} from './WorkflowBuilder.styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import HeightIcon from '@mui/icons-material/Height';
import { useOrginazationSchema, useUserGroups, useUsers } from '../../queries';
import { transformToSchema } from '../../utils';
import { Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { workflowBuilderAtom } from '../../atoms';
import { useLocalization } from '../../hooks';

export const UserSelectionStep = React.memo(({ setActive }) => {
  const { data: orgSchema } = useOrginazationSchema();
  const { data: groups = [] } = useUserGroups();
  const { data: { users = [] } = {} } = useUsers();

  const [{ selectedUsers }, setBuilderState] = useRecoilState(
    workflowBuilderAtom
  );

  const groupsSchema = useMemo(() => {
    return transformToSchema(groups, 'Groups', item => item.groupName);
  }, [groups]);

  useEffect(() => {
    if (selectedUsers.find(({ from }) => from === 'user' || from === 'group')) {
      setBuilderState(state => ({
        ...state,
        firstApprovals: state.firstApprovals?.filter(
          x => x.node_id !== 'unitmanager'
        ),
        secondApprovals: state.secondApprovals?.filter(
          x => x.node_id !== 'unitmanager'
        ),
        thirdApprovals: state.thirdApprovals?.filter(
          x => x.node_id !== 'unitmanager'
        ),
      }));
    }
  }, [selectedUsers, setBuilderState]);

  const usersSchema = useMemo(() => {
    return transformToSchema(users, 'Users', item => item.firstName);
  }, [users]);

  const topNode = React.useMemo(() => {
    return { ...orgSchema?.children?.[0], name: 'All', node_id: 'all' };
  }, [orgSchema?.children]);

  const handleUserSelect = useCallback(
    item => {
      if (item.node_id) {
        setBuilderState(state =>
          !!state.selectedUsers.find(
            ({ node_id, from }) => node_id === item.node_id && from === 'user'
          )
            ? state
            : {
                ...state,
                selectedUsers: [
                  ...state.selectedUsers,
                  { ...item, from: 'user' },
                ],
              }
        );
      }
    },
    [setBuilderState]
  );

  const handleGroupsSelect = useCallback(
    item => {
      if (item.node_id) {
        setBuilderState(state =>
          !!state.selectedUsers.find(
            ({ node_id, from }) => node_id === item.node_id && from === 'group'
          )
            ? state
            : {
                ...state,
                selectedUsers: [
                  ...state.selectedUsers,
                  { ...item, from: 'group' },
                ],
              }
        );
      }
    },
    [setBuilderState]
  );

  const handleOrgNodeSelect = useCallback(
    item => {
      setBuilderState(state =>
        !!state.selectedUsers.find(
          ({ node_id, from }) =>
            node_id === item.node_id && (from === 'org' || from === 'all')
        )
          ? state
          : {
              ...state,
              selectedUsers: [
                ...state.selectedUsers,
                { ...item, from: item.node_id === 'all' ? 'all' : 'org' },
              ],
            }
      );
    },
    [setBuilderState]
  );

  const handleRemove = useCallback(
    field => {
      setBuilderState(state => ({
        ...state,
        selectedUsers: [
          ...state.selectedUsers.filter(f => f.node_id !== field.node_id),
        ],
      }));
    },
    [setBuilderState]
  );

  const handleNext = React.useCallback(() => {
    setActive(2);
  }, [setActive]);
  const { t } = useLocalization();

  return (
    <ContentSection
      maxWidth="xl"
      heading={<>{t.container.workflowBuilder.newWorkFlowCmpnt}</>}
      subHeading={'You can fill the details to add new workflow'}
    >
      <UserSelectionWrapper>
        <HeadText>
          <span>{t.container.workflowBuilder.dblClickToSelect}</span>
        </HeadText>
        <Column>
          <CustomTreeView
            onSelect={handleOrgNodeSelect}
            schema={topNode}
            hasUsers
          />
          <CustomTreeView onSelect={handleGroupsSelect} schema={groupsSchema} />
          <CustomTreeView onSelect={handleUserSelect} schema={usersSchema} />
        </Column>
        <IconWrapper>
          <Icon>
            <ArrowRightAltIcon />
            <span>{t.container.workflowBuilder.dblClickToSelect}</span>
          </Icon>
        </IconWrapper>
        <HeadText>
          <Icon>
            <HeightIcon />
          </Icon>
        </HeadText>
        <Column>
          {selectedUsers?.map((item, idx) => (
            <WorkflowSelectedItem
              item={item}
              key={item.node_id + idx + item.item}
              onRemove={handleRemove}
            />
          ))}
        </Column>
      </UserSelectionWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button onClick={handleNext} variant="primaryLight">
          {t.container.workflowBuilder.continueBtn}
        </Button>
      </Box>
    </ContentSection>
  );
});
