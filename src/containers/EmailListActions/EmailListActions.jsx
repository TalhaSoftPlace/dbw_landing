import { Button, Box, IconButton, MenuItem, Tooltip } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import VisbilityIcon from '@mui/icons-material/Visibility';
import VisbilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Wrapper,
  FilterText,
  StyledMenu,
  AllIcon,
  DeleteIcon,
  InboxIcon,
  JunkIcon,
  SentIcon,
  Star,
  TimedIcon,
  RefreshStyledIcon,
} from './EmailListActions.styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MailBoxCheckbox, LoadingOverlay } from '../../components';
import { ConfirmationDialog, CreateEmailFolder } from '../../containers';
import {
  useDeleteEmailsMutation,
  useMoveEmailToFolderMutation,
  useFlagEmailMutation,
} from '../../mutations';
import { useLocalization } from '../../hooks';
import { useSnackbar } from 'notistack';
import { emailPaginationAtom } from '../../atoms';
import { useRecoilState } from 'recoil';
import { queryKeys } from '../../constants';
import { useQueryClient } from 'react-query';
import { useFolderList } from '../../queries';

export const EmailListActions = React.memo(
  ({
    emails,
    selectedEmails,
    setSelectedEmail,
    setSelectedEmails,
    isFetching,
  }) => {
    const { t } = useLocalization();
    const queryClient = useQueryClient();
    const { data: folderList } = useFolderList();
    const [{ folder, allchildren }, setPagination] = useRecoilState(
      emailPaginationAtom
    );
    const { mutateAsync: flagEmail } = useFlagEmailMutation();
    const folderName = useMemo(
      () => (folder === 'DELETE' ? 'trash' : folder.toLowerCase()),
      [folder]
    );

    const { enqueueSnackbar } = useSnackbar();
    const { mutateAsync: deleteEmails, isLoading } = useDeleteEmailsMutation();
    const { 
      mutateAsync: moveEmailstoFolder,
      isLoading: movingFolder,
    } = useMoveEmailToFolderMutation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = useMemo(() => !!anchorEl, [anchorEl]);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const opennewfolder = useMemo(() => !!anchorE2, [anchorE2]);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const openUserFolder = useMemo(() => !!anchorE3, [anchorE3]);
    const [openDialog, setOpenDialog] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const FolderIcons = {
      INBOX: <InboxIcon />,
      Sent: <SentIcon />,
      All: <AllIcon />,
      Delete: <DeleteIcon />,
      Junk: <JunkIcon />,
      Timed: <TimedIcon />,
      Starred: <Star />,
    };

    const handleDialogClose = useCallback(() => {
      setOpenDialog(false);
    }, []);

    const handleDialogOpen = useCallback(row => {
      setOpenDialog(true);
    }, []);
    const handleClick = useCallback(event => {
      setAnchorEl(event?.currentTarget);
      setAnchorE3(null);
    }, []);
    const handleClickMovefolder = useCallback(event => {
      setAnchorE2(event?.currentTarget);
      setAnchorE3(null);
    }, []);
    const handleOpenUserFolder = useCallback(event => {
      setAnchorE3(event?.currentTarget);
    }, []);
    const handleRefresh = useCallback(() => {
      setPagination(state => ({
        ...state,
        pageNumber: 1,
        keyword: '',
      }));
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === queryKeys.Emails,
      });
    }, [queryClient, setPagination]);

    const isCheckedAll = useMemo(
      () => selectedEmails.length && selectedEmails.length >= emails.length,
      [emails, selectedEmails]
    );
    const rootFolder = React.useMemo(() => {
      return folderList?.filter(folder => !folder.startsWith('user-folders'));
    }, [folderList]);
    const userFolder = React.useMemo(() => {
      var folder = folderList?.filter(folder =>
        folder.startsWith('user-folders')
      );
      return folder;
    }, [folderList]);
    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const handleFolderClose = useCallback(() => {
      setAnchorE3(null);
      setAnchorEl(null);
      setAnchorE2(null);
    }, []);

    const handleNewfolderClose = useCallback(() => {
      setAnchorE2(null);
    }, []);
    const handleCheckAll = useCallback(() => {
      if (isCheckedAll) {
        setSelectedEmails([]);
      } else {
        setSelectedEmails([...emails, ...allchildren]);
      }
    }, [allchildren, emails, isCheckedAll, setSelectedEmails]);

    const emailNumber = useMemo(() => {
      const uids = selectedEmails.map(({ uid }) => uid);
      return uids.length;
    }, [selectedEmails]);
    const handleDelete = useCallback(() => {
      const uids = selectedEmails.map(({ uid }) => uid);
      deleteEmails({ uids }).then(() => {
        setSelectedEmails([]);
        setSelectedEmail(undefined);
      });
    }, [deleteEmails, selectedEmails, setSelectedEmail, setSelectedEmails]);

    const handleMoveFolder = useCallback(
      value => {
        const uids = selectedEmails.map(({ uid }) => uid);
        moveEmailstoFolder({
          uids,
          crrFolderName: folder,
          newFolderName: value,
        }).then(() => {
          setSelectedEmails([]);
          setSelectedEmail(undefined);
          enqueueSnackbar('Successfully Moved', {
            variant: 'info',
          });
        });
      },
      [
        enqueueSnackbar,
        folder,
        moveEmailstoFolder,
        selectedEmails,
        setSelectedEmail,
        setSelectedEmails,
      ]
    );
    const userfilterfolder = useMemo(() => {
      const selectFolder = folder => {
        setPagination(state => ({
          ...state,
          folder,
          pageNumber: 1,
          total: 0,
        }));
        setSelectedEmail(undefined);
        handleClose();
      };
      return (
        <StyledMenu
          id="checkbox-menu"
          anchorEl={anchorE3}
          open={openUserFolder}
          onClose={handleFolderClose}
          MenuListProps={{
            'aria-labelledby': 'checkbox-button',
          }}
          className="folder-menu "
        >
          {userFolder?.map((value, index) => (
            <MenuItem
              onClick={() => selectFolder(value)}
              key={index + value}
              className="main-folder"
            >
              {value?.split('.')?.[1]}
            </MenuItem>
          ))}
        </StyledMenu>
      );
    }, [
      anchorE3,
      handleClose,
      handleFolderClose,
      openUserFolder,
      setPagination,
      setSelectedEmail,
      userFolder,
    ]);

    const renderMenu = useMemo(() => {
      const selectFolder = folder => {
        setPagination(state => ({
          ...state,
          folder,
          pageNumber: 1,
          total: 0,
        }));
        setSelectedEmail(undefined);
        handleClose();
      };
      return (
        <StyledMenu
          id="checkbox-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'checkbox-button',
          }}
          className="folder-menu main-folder"
        >
          {rootFolder?.map((value, index) => (
            <MenuItem
              onClick={() => selectFolder(value)}
              key={index + value}
              className="main-folder"
            >
              {FolderIcons[value]}
              {value}
            </MenuItem>
          ))}

          <Box>
            <Button
              id="checkbox-button"
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserFolder}
              sx={{ color: 'inherit', fontWeight: 300 }}
            >
              <FilterText
                sx={{
                  display: { xs: 'flex', md: 'flex' },
                  textTransform: 'capitalize',
                  color: 'inherit',
                }}
                fontSize="16px"
              >
                User-folders
              </FilterText>
              <ExpandMoreIcon
                sx={{
                  color: 'inherit',
                  display: { xs: 'flex', md: 'flex' },
                }}
              />
            </Button>
            {userfilterfolder}
          </Box>
        </StyledMenu>
      );
    }, [
      FolderIcons,
      anchorEl,
      handleClose,
      handleOpenUserFolder,
      open,
      rootFolder,
      setPagination,
      setSelectedEmail,
      userfilterfolder,
    ]);
    const newFolderList = useMemo(() => {
      const selectNewFolder = value => {
        handleNewfolderClose();
        handleMoveFolder(value);
        setSelectedEmail(undefined);
      };
      return (
        <StyledMenu
          id="checkbox-menu"
          anchorEl={anchorE2}
          open={opennewfolder}
          onClose={handleNewfolderClose}
          MenuListProps={{
            'aria-labelledby': 'checkbox-button',
          }}
          className="folder-menu"
        >
          <Box>
            <Button
              id="checkbox-button"
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserFolder}
              sx={{ color: 'inherit', fontWeight: 300 }}
              className="main-folder"
            >
              <FilterText
                sx={{
                  display: { xs: 'flex', md: 'flex' },
                  textTransform: 'capitalize',
                  color: 'inherit',
                }}
                fontSize="16px"
              >
                User-folders
              </FilterText>
              <ExpandMoreIcon
                sx={{
                  color: 'inherit',
                  display: { xs: 'flex', md: 'flex' },
                }}
              />
            </Button>
            {!!userFolder && (
              <StyledMenu
                id="checkbox-menu"
                anchorEl={anchorE3}
                open={openUserFolder}
                onClose={handleFolderClose}
                MenuListProps={{
                  'aria-labelledby': 'checkbox-button',
                }}
                className="folder-menu "
              >
                {userFolder?.map((value, index) => (
                  <MenuItem
                    onClick={() => selectNewFolder(value)}
                    key={index + value}
                    className="main-folder"
                  >
                    {value?.split('.')?.[1]}
                  </MenuItem>
                ))}
              </StyledMenu>
            )}
          </Box>
        </StyledMenu>
      );
    }, [
      anchorE2,
      anchorE3,
      handleFolderClose,
      handleMoveFolder,
      handleNewfolderClose,
      handleOpenUserFolder,
      open,
      openUserFolder,
      opennewfolder,
      setSelectedEmail,
      userFolder,
    ]);
    const handelMarkasRead = useCallback(() => {
      const uids = selectedEmails.map(({ uid }) => uid);
      flagEmail({ uids });
    }, [flagEmail, selectedEmails]);

    const handelMarkasUnRead = useCallback(() => {
      const uids = selectedEmails.map(({ uid }) => uid);
      flagEmail({ uids, activationStatus: false });
    }, [flagEmail, selectedEmails]);

    return (
      <Wrapper>
        {(isLoading || movingFolder) && <LoadingOverlay />}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            className="seperator"
            sx={{
              display: 'flex',
              flexGrow: 0,
              alignItems: 'center',
            }}
          >
            <MailBoxCheckbox
              checked={isCheckedAll}
              isEmail={emailNumber}
              onChange={handleCheckAll}
            />
          </Box>
          {!selectedEmails.length ? (
            <Box
              className="seperator"
              sx={{
                display: 'flex',
                flexGrow: 0,
                alignItems: 'center',
              }}
            >
              <Box>
                <Tooltip title={t.iconsToolTip.folder}>
                  <IconButton onClick={handleDialogOpen} className="iconbtn">
                    <CreateNewFolderOutlinedIcon
                      sx={{ color: 'email.text.light' }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={t.iconsToolTip.refresh}>
                  <IconButton onClick={handleRefresh} className="iconbtn">
                    <RefreshStyledIcon
                      isfetching={isFetching.toString()}
                      sx={{ color: 'email.text.light' }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              className="seperator"
              sx={{
                display: 'flex',
                flexGrow: 0,
                alignItems: 'center',
              }}
            >
              {folder !== 'Delete' && (
                <>
                  <Box>
                    <Tooltip title={t.iconsToolTip.visible}>
                      <IconButton
                        className="iconbtnpn"
                        onClick={handelMarkasRead}
                      >
                        <VisbilityIcon sx={{ color: 'email.text.light' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Tooltip title={t.iconsToolTip.hide}>
                      <IconButton
                        className="iconbtn"
                        onClick={handelMarkasUnRead}
                      >
                        <VisbilityOffIcon sx={{ color: 'email.text.light' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}
              <Box>
                <Tooltip
                  title={`${folder === 'Delete' ? 'Permanently' : ''} ${
                    t.iconsToolTip.delete
                  }`}
                >
                  <IconButton onClick={handleDelete} className="iconbtnpn">
                    <DeleteForeverIcon sx={{ color: 'text.error' }} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={t.iconsToolTip.archive}>
                  <IconButton
                    aria-controls={open ? 'checkbox-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickMovefolder}
                    className="iconbtn"
                  >
                    <Inventory2OutlinedIcon
                      sx={{ color: 'email.text.light' }}
                    />
                  </IconButton>
                </Tooltip>
                {newFolderList}
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box>
              <Button
                id="checkbox-button"
                aria-controls={open ? 'checkbox-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'text.light', fontWeight: 300 }}
              >
                <FilterListIcon sx={{ color: 'email.text.light' }} />
                <FilterText
                  sx={{
                    display: { xs: 'flex', md: 'flex' },
                    textTransform: 'capitalize',
                    color: 'email.text.light',
                  }}
                  fontSize="inherit"
                >
                  {!!folderName.startsWith('user-folders')
                    ? folderName.split('.')?.[1]
                    : folderName}
                </FilterText>
                <ExpandMoreIcon
                  sx={{
                    color: 'email.text.light',
                    display: { xs: 'flex', md: 'flex' },
                  }}
                />
              </Button>
              {renderMenu}
            </Box>
          </Box>
        </Box>
        <ConfirmationDialog
          open={openDialog}
          handleClose={handleDialogClose}
          sx={{ p: '0px !important' }}
        >
          <CreateEmailFolder closeDialog={handleDialogClose} />
        </ConfirmationDialog>
      </Wrapper>
    );
  }
);
