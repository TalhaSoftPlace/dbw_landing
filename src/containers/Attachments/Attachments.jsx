import { Box, Button, Menu } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useCallback, useMemo, useState } from 'react';
import { Attachment } from '../Attachment';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { AttachmentWrapper } from '../Attachment/Attachment.styles';
import { emailPaginationAtom } from '../../atoms';
import { useRecoilValue } from 'recoil';

export const Attachments = React.memo(({ email }) => {
  const { folder } = useRecoilValue(emailPaginationAtom);
  const [downloadActins, setDownloadActins] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = useMemo(() => !!anchorEl, [anchorEl]);
  const handleClick = useCallback(event => {
    setAnchorEl(event?.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const renderItems = useMemo(
    () =>
      email?.attachments?.map(attachment => (
        <Attachment
          key={attachment.fileName}
          uid={email?.uid}
          fileName={attachment.fileName}
          mailBoxFolder={folder}
          setDownloadActins={setDownloadActins}
        />
      )),
    [email?.attachments, email?.uid, folder]
  );

  const handleDownloadAll = useCallback(() => {
    Object.values(downloadActins).forEach(value => {
      value();
    });
  }, [downloadActins]);

  return (
    <>
      <Button
        id="checkbox-button"
        aria-controls={open ? 'checkbox-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'text.light', fontWeight: 300 }}
      >
        <AttachFileIcon sx={{ color: 'text.blueLight' }} />
        <ExpandMoreIcon
          sx={{
            color: 'text.blueLight',
            display: { xs: 'none', md: 'flex' },
          }}
        />
      </Button>
      <Menu
        id="checkbox-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'checkbox-button',
        }}
      >
        {renderItems}
        <AttachmentWrapper onClick={handleDownloadAll}>
          <Box sx={{ flexGrow: 0 }}>
            <FileDownloadIcon size="small" sx={{ color: 'text.blueLight' }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} className="atachment-name">
            <b>Download All</b>
          </Box>
        </AttachmentWrapper>
      </Menu>
    </>
  );
});
