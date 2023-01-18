import { Chip, Grid, Box } from '@mui/material';
import React, { useCallback } from 'react';

export const UploadedFileChip = React.memo(
  ({
    name,
    attachments = [],
    setFieldValue,
    forwardAttachmentNames = [],
    setforwardAttachmentNames,
  }) => {
    const handleDelete = useCallback(
      index => {
        setFieldValue &&
          setFieldValue(
            name,
            attachments.filter((_, i) => i !== index)
          );
      },
      [setFieldValue, name, attachments]
    );

    const handleNameDelete = useCallback(
      index => {
        setforwardAttachmentNames &&
          setforwardAttachmentNames(
            forwardAttachmentNames.filter((_, i) => i !== index)
          );
      },
      [setforwardAttachmentNames, forwardAttachmentNames]
    );

    return (
      <Grid container sx={{ mb: 1 }}>
        {attachments?.map((attachment, i) => (
          <Box sx={{ mt: 1, maxWidth: '280px' }}>
            <Chip
              key={i + attachment.name}
              label={attachment.name}
              onDelete={() => {
                handleDelete(i);
              }}
            />
          </Box>
        ))}
        {forwardAttachmentNames?.map((name, i) => (
          <Box sx={{ mt: 1, maxWidth: '280px' }}>
            <Chip
              key={i + name}
              label={name}
              onDelete={() => {
                handleNameDelete(i);
              }}
            />
          </Box>
        ))}
      </Grid>
    );
  }
);
