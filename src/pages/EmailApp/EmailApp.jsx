import { Grid, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  SendNewEmail,
  WorkspaceActionBar,
  SingleEmailView,
  EmailList,
} from '../../containers';
import {
  EmptyMailboxScreen,
  LoadingOverlay,
  WorkspaceActionPagination,
} from '../../components';
import { useEmails } from '../../queries';
import { useAuth, useWindowResize } from '../../hooks';
import { StyledBox, EmailWrapper, EmailFullWapper } from './EmailApp.styles';
import Split from 'react-split';
import { emailPaginationAtom, selectedEmailAtom } from '../../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useDebounce } from './../../hooks/useDebounce';

export const EmailApp = React.memo(() => {
  const winSize = useWindowResize();
  const muiTheme = useTheme();
  const { user } = useAuth({ redirect: true });
  const [{ pageNumber, pageSize, folder, total }, setPagination] = useRecoilState(
    emailPaginationAtom
  );
  const { flag } = useRecoilValue(emailPaginationAtom);
  const [selectedEmaill, setSelectedEmail] = useRecoilState(selectedEmailAtom);
  const payLoad = useDebounce({
    mailBoxFolder: folder,
    pageSize,
    pageNumber,
    flag,
  }, 800);
  const { data: { emails = [], size = 0 } = {}, isFetching } = useEmails(payLoad);
  const selectedEmail = useMemo(
    () =>
      typeof selectedEmaill === 'number'
        ? emails.find(email => email?.uid === selectedEmaill)
        : selectedEmaill,
    [emails, selectedEmaill]
  );

  const handleBack = useCallback(() => {
    setSelectedEmail(undefined);
  }, [setSelectedEmail]);

  useEffect(() => {
    if (size !== total)
      setPagination(state => ({ ...state, total: size, email: emails }));
  }, [emails, setPagination, size, total]);

  return (
    <>
      <WorkspaceActionBar />
      {!user ? (
        <LoadingOverlay zIndex={9} />
      ) : (
          <>
            {winSize.width <= muiTheme.breakpoints.values.md ? (
              <Grid
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                }}
                container
                spacing={0}
              >
                <Grid item sm={12} md={4}>
                  <EmailList
                    isFetching={isFetching}
                    emails={emails}
                    selectedEmailId={selectedEmail?.uid}
                    setSelectedEmail={setSelectedEmail}
                  />
                  <WorkspaceActionPagination />
                </Grid>
                <Grid item sm={12} md={8}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      {selectedEmail?.uid ? (
                        <EmailWrapper>
                          <SingleEmailView
                            selectedEmail={selectedEmail}
                            selectedEmailId={selectedEmail?.uid}
                            mailBoxFolder={folder}
                            onClose={handleBack}
                          />
                        </EmailWrapper>
                      ) : (
                        <EmptyMailboxScreen />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
                <StyledBox
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
            spacing={0}
          >
            <Split
              sizes={[33, 67]}
              minSize={[550, 700]}
              direction="horizontal"
              cursor="col-resize"
              className="split-flex"
            >
              <div>
                <EmailList
                  isFetching={isFetching}
                  emails={emails}
                  selectedEmailId={selectedEmail?.uid}
                  setSelectedEmail={setSelectedEmail}
                />
              </div>
              <div>
                {selectedEmail ? (
                  <EmailFullWapper>
                    <SingleEmailView
                      selectedEmail={selectedEmail}
                      selectedEmailId={selectedEmail}
                      mailBoxFolder={folder}
                      onClose={handleBack}
                    />
                  </EmailFullWapper>
                ) : (
                  <EmptyMailboxScreen />
                )}
              </div>
            </Split>
                </StyledBox>
            )}
        </>
      )}
      <SendNewEmail />
    </>
  );
});
