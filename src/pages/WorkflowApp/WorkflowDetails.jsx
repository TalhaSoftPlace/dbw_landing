import React, { useCallback, useEffect, useMemo } from 'react';
import { StyledSpan, WorkflowArea } from './WorkflowApp.styles';
import { Box, IconButton, useTheme } from '@mui/material';
import {
  ContentSection,
  DBWTable,
  LoadingOverlay,
  WorkflowSidepanel,
  ContextMenu,
  ViewWorkflowForm,
  Loading,
  WorkflowDocumentsPagination,
} from '../../components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../../hooks';
import { useRecoilState } from 'recoil';
import { workflowDocumentsPaginationAtom } from '../../atoms';
import { useWorkflowDocuments } from '../../queries/useWorkflowDocuments';
import CsvLink from 'react-csv-export';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkflows } from '../../queries';
import { useDeleteWorkflowDocumentMutation } from '../../mutations';
import moment from 'moment';

const getVal = (data, keys) => {
  if (keys.length === 1) {
    return data[keys[0]];
  } else {
    return data[keys[0]]
      ? getVal(data[keys[0]], keys.slice(1, keys.length))
      : undefined;
  }
};

export const WorkflowDetails = React.memo(() => {
  const { user } = useAuth({ redirect: true });
  const { mutateAsync: deleteDocument } = useDeleteWorkflowDocumentMutation();
  const { isAdmin } = useAuth();
  const { workflowId, workflowDocumentId } = useParams();
  const { data: { content: workflows = [] } = {}, isLoading } = useWorkflows({
    workflowId,
  });
  const workflow = useMemo(() => workflows[0], [workflows]);
  const [{ page }, setPaginationState] = useRecoilState(
    workflowDocumentsPaginationAtom
  );
  const {
    data: { items: content = [], totalpages } = {},
    isLoading: isDocumentLoading,
  } = useWorkflowDocuments({
    workflowId: workflow?.id,
    page,
  });
  const selectedWorkflowDocument = useMemo(
    () => content?.find(x => x?.id === parseInt(workflowDocumentId)),
    [content, workflowDocumentId]
  );
  useEffect(() => {
    setPaginationState(state => ({
      ...state,
      total: content.length,
      totalPage: totalpages,
    }));
  }, [content.length, setPaginationState, totalpages]);
  const documents = useMemo(
    () =>
      content.map(doc => ({
        ...doc,
        id: doc.id,
        name: doc.workFlowDocName,
        data: doc?.formDataJSON ? JSON.parse(doc?.formDataJSON) : undefined,
        status: doc.lastStatus,
      })),
    [content]
  );

  const muiTheme = useTheme();

  const dynamicColumns = useCallback(
    row => {
      const columns = {};
      workflow?.workFlowViews?.forEach(view => {
        const keys = view.columnKey.split('.');
        const value = row?.data ? getVal(row?.data, keys) : undefined;
        columns[view.columnKey] = (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            {typeof value === 'string' ? value : ''}
          </StyledSpan>
        );
      });

      return columns;
    },
    [workflow?.workFlowViews]
  );

  const dataToExport = useMemo(() => {
    return documents.map(doc => {
      const columns = {};
      workflow?.workFlowViews?.forEach(view => {
        const keys = view.columnKey.split('.');
        const value = doc?.data ? getVal(doc?.data, keys) : undefined;
        columns[view.columnName] = value;
      });

      return {
        id: doc.id,
        name: doc.name,
        user: doc.userName,
        status: doc.status,
        ...columns,
      };
    });
  }, [documents, workflow?.workFlowViews]);
  const navigate = useNavigate();
  const generateRowContent = useCallback(
    row => {
      const menuItems = [
        {
          name: 'View',
          onClick: () => {
            navigate(`${row.id}`);
          },
        },
        isAdmin && {
          name: 'Delete',
          onClick: () => {
            deleteDocument({ documentId: row.id });
          },
        },
      ];
      const creationDate = row.approvalHistory?.find(
        ({ status }) => status === 'C'
      )?.creationDateTime;

      return {
        user: <StyledSpan>{row.userName}</StyledSpan>,
        submission: (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            {(creationDate && moment(creationDate).format('YYYY.MM.DD')) ||
              '- -'}
          </StyledSpan>
        ),
        status: <StyledSpan>{row.statusText}</StyledSpan>,
        ...dynamicColumns(row),

        action: (
          <ContextMenu menuItems={menuItems} anchorOrigin="left">
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="1"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </ContextMenu>
        ),
      };
    },
    [deleteDocument, dynamicColumns, isAdmin, navigate]
  );

  const dynamicHeaders = useMemo(() => {
    const headers = {};
    workflow?.workFlowViews?.forEach(view => {
      headers[view.columnKey] = (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          {view.columnName}
        </StyledSpan>
      );
    });
    return headers;
  }, [workflow?.workFlowViews]);

  const generateHeader = useCallback(() => {
    return {
      user: <StyledSpan sx={{ pl: 2 }}>User</StyledSpan>,
      submission: (
        <StyledSpan
          sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
        >
          Date
        </StyledSpan>
      ),
      status: <StyledSpan>Status</StyledSpan>,
      ...dynamicHeaders,
      action: <StyledSpan>Actions</StyledSpan>,
    };
  }, [dynamicHeaders]);

  const handleClickBack = () => {
    navigate('/workspace/workflow');
  };
  return (
    <>
      {!user || isLoading ? (
        <LoadingOverlay />
      ) : (
        <WorkflowArea>
          <Box className="workflow-view">
            <Box
              sx={{
                display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
              }}
            >
              <WorkflowSidepanel
                selectedWorkflowDocument={selectedWorkflowDocument}
                workflow={workflow}
                isLoading={isLoading}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  display: { sm: 'block', md: 'none', lg: 'none' },
                }}
              >
                <WorkflowSidepanel
                  selectedWorkflowDocument={selectedWorkflowDocument}
                  workflow={workflow}
                  is={isLoading}
                />
              </Box>
              {selectedWorkflowDocument ? (
                <ViewWorkflowForm
                  selectedWorkflowDocument={selectedWorkflowDocument}
                />
              ) : (
                <ContentSection
                  heading={workflow?.description}
                  subHeading={''}
                  isBack={true}
                  handleBack={handleClickBack}
                  headerAction={
                    <CsvLink
                      data={dataToExport}
                      fileName={workflow?.description}
                      withTimeStamp
                    >
                      Export CSV
                    </CsvLink>
                  }
                >
                  <Box sx={{ mb: 1 }} className="workflow-table">
                    {isDocumentLoading ? (
                      <Loading />
                    ) : (
                      <DBWTable
                        generateRowContent={generateRowContent}
                        data={documents}
                        generateHeader={generateHeader}
                        headingBackground={muiTheme.palette.background.dark}
                        itemBackground={muiTheme.palette.background.tableitembg}
                        headingColor={muiTheme.palette.text.grey}
                        itemColor={muiTheme.palette.text.grey}
                        padding={20}
                      />
                    )}
                  </Box>
                  <WorkflowDocumentsPagination />
                </ContentSection>
              )}
            </Box>
          </Box>
        </WorkflowArea>
      )}
    </>
  );
});
