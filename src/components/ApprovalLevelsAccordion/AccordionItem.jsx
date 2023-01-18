import React, { useCallback, useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  Column,
  Icon,
  IconWrapper,
  Item,
  StyleAccordionDetails,
  UserSelectionWrapper,
  HeadText,
} from './ApprovalLevelsAccordion.style';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import HeightIcon from '@mui/icons-material/Height';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useOrginazationSchema, useUserGroups, useUsers } from '../../queries';
import { transformToSchema } from '../../utils';
import { CustomTreeView } from '../CustomTreeView';
import { WorkflowSelectedItem } from '../WorkflowSelectedItem';
import { useDoubleClick } from '../../hooks';
import { useLocalization } from '../../hooks';
export const AccordionItem = React.memo(
  ({
    expanded,
    onChange,
    item,
    selectedItems,
    setSelectedItems,
    allApprovals,
    selectedUsers,
  }) => {
    const { data: groups = [] } = useUserGroups();
    const { data: { users = [] } = {} } = useUsers();
    const { data: orgSchema } = useOrginazationSchema();

    const showUnitManager = useMemo(
      () =>
        !selectedUsers.find(({ from }) => from === 'user' || from === 'group'),
      [selectedUsers]
    );

    const groupsSchema = useMemo(() => {
      return transformToSchema(groups, 'Groups', item => item.groupName);
    }, [groups]);

    const usersSchema = useMemo(() => {
      return transformToSchema(users, 'Users', item => item.firstName);
    }, [users]);

    const handleUserSelect = useCallback(
      item => {
        if (item.node_id) {
          setSelectedItems(
            !!allApprovals?.find(
              ({ node_id, from }) => node_id === item.node_id && from === 'user'
            )
              ? selectedItems
              : [...selectedItems, { ...item, from: 'user' }]
          );
        }
      },
      [selectedItems, setSelectedItems, allApprovals]
    );

    const handleGroupsSelect = useCallback(
      item => {
        if (item.node_id) {
          setSelectedItems(
            !!allApprovals.find(
              ({ node_id, from }) =>
                node_id === item.node_id && from === 'group'
            )
              ? selectedItems
              : [...selectedItems, { ...item, from: 'group' }]
          );
        }
      },
      [selectedItems, setSelectedItems, allApprovals]
    );

    const handleOrgNodeSelect = useCallback(
      item => {
        setSelectedItems(
          !!allApprovals.find(
            ({ node_id, from }) => node_id === item.node_id && from === 'org'
          )
            ? selectedItems
            : [...selectedItems, { ...item, from: 'org' }]
        );
      },
      [selectedItems, setSelectedItems, allApprovals]
    );

    const handleUnitManagerSelect = useCallback(() => {
      setSelectedItems(
        !!allApprovals.find(
          ({ node_id, from }) =>
            node_id === 'unitmanager' && from === 'unitmanager'
        )
          ? selectedItems
          : [
              {
                node_id: 'unitmanager',
                name: 'Unit Manager',
                from: 'unitmanager',
              },
              ...selectedItems,
            ]
      );
    }, [selectedItems, setSelectedItems, allApprovals]);

    const handleRemove = useCallback(
      field =>
        setSelectedItems(
          selectedItems.filter(f => f.node_id !== field.node_id)
        ),
      [selectedItems, setSelectedItems]
    );

    const topNode = React.useMemo(
      () => ({
        ...orgSchema?.children?.[0],
        name: 'Select Unit Manager',
        node_id: 'all',
        disabled: true,
      }),
      [orgSchema?.children]
    );

    const unitManagerRef = React.useRef();
    useDoubleClick({
      onSingleClick: () => {},
      onDoubleClick: handleUnitManagerSelect,
      ref: unitManagerRef,
    });
    const { t } = useLocalization();
    return (
      <Accordion expanded={expanded} onChange={onChange} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`0-content`}
          id={`0-header`}
          className={`accrodionHeader ${selectedItems.length ? 'filled' : ''}`}
        >
          <h3>{item.name}</h3>
        </AccordionSummary>
        <StyleAccordionDetails>
          <UserSelectionWrapper>
            <HeadText>
              <span>{t.components.accordionItem.doubleClick}</span>
            </HeadText>
            <Column>
              {showUnitManager && (
                <Item ref={unitManagerRef}>
                  {t.components?.accordionItem.unitManager}
                </Item>
              )}
              <CustomTreeView
                onSelect={handleOrgNodeSelect}
                schema={topNode}
                hasUsers
              />
              <CustomTreeView
                onSelect={handleUserSelect}
                schema={usersSchema}
              />
              <CustomTreeView
                onSelect={handleGroupsSelect}
                schema={groupsSchema}
              />
            </Column>
            <IconWrapper>
              <Icon>
                <ArrowRightAltIcon />
                <span>{t.components.accordionItem.doubleClick}</span>
              </Icon>
            </IconWrapper>
            <HeadText>
              <Icon>
                <HeightIcon />
              </Icon>
            </HeadText>
            <Column>
              {selectedItems?.map((item, idx) => (
                <WorkflowSelectedItem
                  item={item}
                  onRemove={handleRemove}
                  key={item.node_id + idx + item.item}
                />
              ))}
            </Column>
          </UserSelectionWrapper>
        </StyleAccordionDetails>
      </Accordion>
    );
  }
);
