import React, { useCallback } from 'react';
import { Button, ContentSection, WorkflowSelectedItem } from '../../components';
import {
  Column,
  Icon,
  IconWrapper,
  Item,
  UserSelectionWrapper,
  HeadText,
} from './WorkflowBuilder.styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import HeightIcon from '@mui/icons-material/Height';
import { Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { workflowBuilderAtom } from '../../atoms';
import { useMemo } from 'react';
import {
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
} from '../../mutations';
import { useAuth, useLocalization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const getFieldsArrayFromProperties = properties => {
  const fields = [];
  Object.entries(properties).forEach(([key, value]) => {
    if (!!value.properties) {
      const innerFields = getFieldsArrayFromProperties(value.properties);
      innerFields.forEach(field => {
        fields.push({ key: key + '.' + field.key, title: field.title });
      });
    } else {
      fields.push({ key, title: value.title });
    }
  });
  return fields;
};

export const FieldsSelectionStep = React.memo(() => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: createWorkflow } = useCreateWorkflowMutation();
  const { mutateAsync: updateWorkflow } = useUpdateWorkflowMutation();
  const [
    {
      json,
      selectedUsers,
      firstApprovals,
      secondApprovals,
      thirdApprovals,
      selectedfields,
      workflow,
    },
    setBuilderState,
  ] = useRecoilState(workflowBuilderAtom);
  const handleSelect = useCallback(
    ({ key, title }) => {
      setBuilderState(state => {
        if (state.selectedfields.length < 3) {
          return !!state.selectedfields.find(({ node_id }) => node_id === key)
            ? state
            : {
                ...state,
                selectedfields: [
                  ...state.selectedfields,
                  { node_id: key, name: title, from: 'fields' },
                ],
              };
        } else {
          enqueueSnackbar('You can not select more than 3 fields', {
            variant: 'error',
          });
          return state;
        }
      });
    },
    [enqueueSnackbar, setBuilderState]
  );

  const handleRemove = useCallback(
    field => {
      setBuilderState(state => ({
        ...state,
        selectedfields: [
          ...state.selectedfields.filter(f => f.node_id !== field.node_id),
        ],
      }));
    },
    [setBuilderState]
  );

  const handleNext = React.useCallback(() => {
    const workFlowUsers = selectedUsers.map(u => {
      if (u.node_id === 'all') {
        return {
          unit: 'all',
          unitType: 'custom',
          isForAll: true,
          domainName: user?.domainModel.domainName,
        };
      }
      return {
        unit: u.node_id.toString(),
        unitType: u.from,
        domainName: user?.domainModel.domainName,
        isForAll: false,
      };
    });

    const workFlowFirstAppovals = firstApprovals.map(app => {
      if (app.from === 'org') {
        return {
          level: '1',
          unit: app.node_id.toString(),
          unitType: app.from,
          isUnitManager: true,
          isUpperUnitManager: false,
        };
      }
      return {
        level: '1',
        unit: app.node_id.toString(),
        unitType: app.from === 'unitmanager' ? 'custom' : app.from,
        isUnitManager: app.from === 'unitmanager' ? true : false,
        isUpperUnitManager: false,
      };
    });
    const workFlowSecondAppovals = secondApprovals.map(app => {
      if (app.from === 'org') {
        return {
          level: '2',
          unit: app.node_id.toString(),
          unitType: app.from,
          isUnitManager: true,
          isUpperUnitManager: false,
        };
      }
      return {
        level: '2',
        unit: app.node_id,
        unitType: app.from === 'unitmanager' ? 'custom' : app.from,
        isUnitManager: app.from === 'unitmanager' ? true : false,
        isUpperUnitManager: false,
      };
    });
    const workFlowThirdAppovals = thirdApprovals.map(app => {
      if (app.from === 'org') {
        return {
          level: '3',
          unit: app.node_id.toString(),
          unitType: app.from,
          isUnitManager: true,
          isUpperUnitManager: false,
        };
      }
      return {
        level: '3',
        unit: app.node_id.toString(),
        unitType: app.from === 'unitmanager' ? 'custom' : app.from,
        isUnitManager: app.from === 'unitmanager' ? true : false,
        isUpperUnitManager: false,
      };
    });

    const workFlowViews = selectedfields.map(field => {
      return {
        columnName: field.name,
        columnKey: field.node_id,
        isSortable: false,
      };
    });
    if (!!workflow) {
      updateWorkflow({
        workflowId: workflow.id,
        formDesignJson: json,
        workFlowUsers,
        approvalLevels: workFlowThirdAppovals.length
          ? '3'
          : workFlowSecondAppovals.length
          ? '2'
          : workFlowFirstAppovals.length
          ? '1'
          : undefined,
        workFlowApprovals: [
          ...workFlowFirstAppovals,
          ...workFlowSecondAppovals,
          ...workFlowThirdAppovals,
        ],
        workFlowViews,
      }).then(() => {
        navigate('/admin/work-flow');
      });
    } else {
      createWorkflow({
        formDesignJson: json,
        workFlowUsers,
        approvalLevels: workFlowThirdAppovals.length
          ? '3'
          : workFlowSecondAppovals.length
          ? '2'
          : workFlowFirstAppovals.length
          ? '1'
          : undefined,
        workFlowApprovals: [
          ...workFlowFirstAppovals,
          ...workFlowSecondAppovals,
          ...workFlowThirdAppovals,
        ],
        workFlowViews,
      }).then(() => {
        navigate('/admin/work-flow');
      });
    }
  }, [
    selectedUsers,
    firstApprovals,
    secondApprovals,
    thirdApprovals,
    selectedfields,
    workflow,
    user?.domainModel.domainName,
    updateWorkflow,
    json,
    navigate,
    createWorkflow,
  ]);
  const fieldsArray = useMemo(
    () =>
      json?.schema?.properties
        ? getFieldsArrayFromProperties(json.schema.properties)
        : [],
    [json.schema.properties]
  );

  const items = useMemo(
    () =>
      fieldsArray.map(({ key, title }) => (
        <Item key={key} onClick={() => handleSelect({ key, title })}>
          {title}
        </Item>
      )),
    [fieldsArray, handleSelect]
  );
  const { t } = useLocalization();
  return (
    <ContentSection
      maxWidth="xl"
      heading={<>{t.container.workflowBuilder.newWorkFlowCmpnt}</>}
      subHeading={'You can fill the details to add new workflow'}
    >
      <UserSelectionWrapper>
        <HeadText>
          <span>{t.container.workflowBuilder.selectButton}</span>
        </HeadText>
        <Column>{items}</Column>
        <IconWrapper>
          <Icon>
            <ArrowRightAltIcon />
            <span>{t.container.workflowBuilder.selectButton}</span>
          </Icon>
        </IconWrapper>
        <HeadText>
          <Icon>
            <HeightIcon />
          </Icon>
        </HeadText>
        <Column>
          {selectedfields?.map((item, idx) => (
            <WorkflowSelectedItem
              item={item}
              onRemove={handleRemove}
              key={item.node_id + idx + item.item}
            />
          ))}
        </Column>
      </UserSelectionWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button onClick={handleNext} variant="primaryLight">
          {t.container.workflowBuilder.saveBtn}
        </Button>
      </Box>
    </ContentSection>
  );
});
