import React, { useEffect } from 'react';
import { Grid, MenuItem, useTheme, Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { CalenderFooter } from '..';
import {
  SelectStyled,
  SidebarFooter,
  Wrapper,
  SidePanel,
} from './WorkflowSidepanel.styles';
import { makeStyles } from '@mui/styles';
import { userWorkflowAtom  , workflowDocumentsPaginationAtom} from '../../atoms';
import { FillWorkflowForm } from '../FillWorkflowForm';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 254,
  },
}));
export const WorkflowSidepanel = React.memo(
  ({ workflow, isLoading, selectedWorkflowDocument }) => {
    const muiTheme = useTheme();
    const classes = useStyles();
    const [{ status }, setWorflowState] = useRecoilState(userWorkflowAtom);
    const navigate = useNavigate();
    const [, setPagination] = useRecoilState(
      workflowDocumentsPaginationAtom
    );

    useEffect(() => {
      if (!workflow && !isLoading) {
        navigate(`/workspace/workflow/`);
      }
    }, [isLoading, navigate, workflow]);

    const setType = React.useCallback(
      event => {
        const selectedTag = event.target.value;
        setWorflowState(state => ({
          ...state,
          status: selectedTag,
        }));
        setPagination(state => ({
          ...state,
          page:1,
        }));
      },
      [setPagination, setWorflowState]
    );
    const selectEventTag = React.useMemo(() => {
      return (
        <SelectStyled
          disabled={!!selectedWorkflowDocument}
          background={muiTheme.palette.background.primary}
          caretcolor={muiTheme.palette.text.light}
          value={status}
          onChange={setType}
          MenuProps={{ classes: { paper: classes.menuPaper } }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="C">Waiting for approval</MenuItem>
          <MenuItem value="M">My Requests</MenuItem>
          <MenuItem value="A">Approved</MenuItem>
          <MenuItem value="R">Rejected</MenuItem>
        </SelectStyled>
      );
    }, [classes.menuPaper, muiTheme.palette.background.primary, muiTheme.palette.text.light, selectedWorkflowDocument, setType, status]);
    return (
      <>
        <SidePanel
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
          }}
        >
          <Wrapper>
            <Grid container sx={{ pt: 1 }}>
              <Grid item xs={12} md={12} sx={{ pl: 2, pr: 2 }}>
                <FillWorkflowForm
                  workflow={workflow}
                  selectedWorkflowDocument={selectedWorkflowDocument}
                />
              </Grid>

              <Grid item xs={12} md={12} sx={{ pl: 2, pr: 2, pt: 1 }}>
                {selectEventTag}
              </Grid>

              <SidebarFooter item xs={12}>
                <CalenderFooter />
              </SidebarFooter>
            </Grid>
          </Wrapper>
        </SidePanel>
        <Box sx={{ display: { sm: 'block', md: 'none', lg: 'none' } }}>
          <Grid container sx={{ pt: 1 }}>
            <Grid item xs={6} md={6} sx={{ pl: 2, pr: 2 }}>
              <FillWorkflowForm
                workflow={workflow}
                selectedWorkflowDocument={selectedWorkflowDocument}
              />
            </Grid>

            <Grid item xs={6} md={6} sx={{ pl: 2, pr: 2 }}>
              {selectEventTag}
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
);
