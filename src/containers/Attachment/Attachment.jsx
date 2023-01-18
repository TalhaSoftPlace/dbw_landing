import React, { useCallback, useEffect, useState } from 'react';
import { useAttachement } from '../../queries';
import { AttachmentWrapper } from './Attachment.styles';
import fileDownload from 'js-file-download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, CircularProgress } from '@mui/material';

export const Attachment = React.memo(
  ({ uid, fileName, mailBoxFolder, setDownloadActins }) => {
    const [download, setDownload] = useState(false);
    const { data: attachment, isLoading } = useAttachement({
      load: download,
      uid,
      fileName,
      mailBoxFolder,
    });

    const handleClick = useCallback(() => {
      setDownload(true);
      if (attachment) {
        fileDownload(attachment, fileName);
        setDownload(false);
      }
    }, [attachment, fileName]);

    useEffect(() => {
      setDownloadActins((actions) => ({ ...actions, [fileName]: handleClick }));
    }, [fileName, handleClick, setDownloadActins]);

    useEffect(() => {
      if (attachment && download) {
        fileDownload(attachment, fileName);
        setDownload(false);
      }
    }, [attachment, download, fileName]);

    return (
      <AttachmentWrapper onClick={handleClick}>
        <Box sx={{ flexGrow: 0 }}>
          <AttachFileIcon size="small" sx={{ color: 'text.blueLight' }} />
        </Box>
        <Box sx={{ flexGrow: 1 }} className="atachment-name">
          <b>{fileName}</b>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {isLoading ? (
            <CircularProgress
              sx={{ marginRight: '10px' }}
              size={18}
              color="inherit"
            />
          ) : (
            <FileDownloadIcon size="small" sx={{ color: 'text.blueLight' }} />
          )}
        </Box>
      </AttachmentWrapper>
    );
  }
);
