import React, { useCallback, useMemo } from 'react';
import { IconButton, Tooltip, Typography, Box, MenuItem } from '@mui/material';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { ReactComponent as BackArrowIcon } from '../../images/backarrow.svg';
import { ReactComponent as BackwardArrowIcon } from '../../images/backwordarrow.svg';
import { useLocalization } from '../../hooks';
import { Attachments } from '../../containers';
import { useRecoilValue } from 'recoil';
import { emailPaginationAtom } from '../../atoms';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { StyledStack, StyledMenu } from './SingleEmailView.styles';
import { LoadingOverlay } from '../../components';
import {
  useDeleteEmailsMutation,
  useMoveEmailToFolderMutation,
} from '../../mutations';
import { useFolderList } from '../../queries';
import { useSnackbar } from 'notistack';
export const EmailActions = React.memo(
  ({
    onReply,
    onReplyAll,
    onForward,
    email,
    onClose,
    emailDate,
    selectedEmailId,
  }) => {
    const { t } = useLocalization();
    const { folder } = useRecoilValue(emailPaginationAtom);
    const { enqueueSnackbar } = useSnackbar();
    const { data: folderList } = useFolderList();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = useMemo(() => !!anchorEl, [anchorEl]);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const openUserFolder = useMemo(() => !!anchorE3, [anchorE3]);
    const { mutateAsync: deleteEmails, isLoading } = useDeleteEmailsMutation();
    const handleOpenUserFolder = useCallback(event => {
      setAnchorE3(event?.currentTarget);
    }, []);
    const { mutateAsync: moveEmailstoFolder  , isLoading:isMoving} = useMoveEmailToFolderMutation();
    const handleDelete = useCallback(() => {
      const uids = [email?.uid];
      deleteEmails({ uids }).then(() => {
        onClose();
      });
    }, [deleteEmails, email?.uid, onClose]);
    const handleMoveFolder = useCallback(
      value => {
        const uids = [email?.uid];
        moveEmailstoFolder({
          uids,
          crrFolderName: folder,
          newFolderName: value,
        }).then(() => {
          enqueueSnackbar('Successfully Moved', {
            variant: 'info',
          });
          onClose();
        });
      },
      [email?.uid, enqueueSnackbar, folder, moveEmailstoFolder, onClose]
    );
    const userFolder = React.useMemo(() => {
      var folder = folderList?.filter(folder =>
        folder.startsWith('user-folders')
      );
      return folder;
    }, [folderList]);
    const handleFolderClose = useCallback(() => {
      setAnchorE3(null);
      setAnchorEl(null);
    }, []);


    const newFolderList = useMemo(() => {
      const selectNewFolder = value => {
        // handleNewfolderClose();
        handleMoveFolder(value);
        // setSelectedEmail(undefined);
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
                    onClick={() => selectNewFolder(value)}
                    key={index + value}
                    className="main-folder"
                  >
                    {value?.split('.')?.[1]}
                  </MenuItem>
                ))}
        </StyledMenu>
      );
    }, [anchorE3, handleFolderClose, handleMoveFolder, openUserFolder, userFolder]);
    return (
      <StyledStack direction="row" spacing={1}>
        {isMoving && (<>
        <LoadingOverlay />
        </>)} 
        <Typography
          className="time"
          component="span"
          sx={{
            fontSize: 13,
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'flex',
            },
          }}
        >
          {emailDate}
        </Typography>
        {!!email?.attachments?.length && (
          <Tooltip title={t.iconsToolTip.reply}>
            <Attachments email={email} />
          </Tooltip>
        )}
        <Tooltip title={t.iconsToolTip.reply}>
          <IconButton onClick={onReply} aria-label="attach" size="small">
            <BackwardArrowIcon
              sx={{ color: 'text.blueLight' }}
              fontSize="inherit"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title={t.iconsToolTip.replyall}>
          <IconButton onClick={onReplyAll} aria-label="attach" size="small">
            <BackArrowIcon
              sx={{ color: 'text.blueLight' }}
              fontSize="inherit"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title={t.iconsToolTip.forward}>
          <IconButton onClick={onForward} aria-label="flag" size="medium">
            <ArrowForwardSharpIcon
              sx={{ color: 'text.blueLight' }}
              fontSize="inherit"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={`${folder === 'Delete' ? 'Permanently' : ''} ${
            t.iconsToolTip.delete
          }`}
        >
          <IconButton
            className={isLoading ? 'shake' : ''}
            onClick={handleDelete}
            sx={{ ml: 0 }}
          >
            <DeleteForeverIcon
              sx={{ color: 'background.redbg' }}
              fontSize="inherit"
            />
          </IconButton>
        </Tooltip>
        <Box>
          <Tooltip title={t.iconsToolTip.archive}>
            <IconButton
              aria-controls={open ? 'checkbox-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenUserFolder}
              sx={{ ml: 0 }}
            >
              <Inventory2OutlinedIcon
                sx={{ color: 'text.blueLight' }}
                fontSize="inherit"
              />
            </IconButton>
          </Tooltip>
          {newFolderList}
        </Box>
        <Tooltip title={t.iconsToolTip.close}>
          <IconButton
            className="closeBtn"
            onClick={onClose}
            aria-label="flag"
            size="medium"
            sx={{ pl: 0 }}
          >
            <CloseIcon sx={{ color: 'text.blueLight' }} fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </StyledStack>
    );
  }
);
