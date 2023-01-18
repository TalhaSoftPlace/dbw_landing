import React, { useCallback } from 'react';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';
import { ReactQuillStyled } from './ShortReplyEditor.styles';
import { useTheme } from '@mui/material';

export const ShortReplyeditor = React.memo(({ values, setFieldValue }) => {
  Quill.register('modules/imageResize', ImageResize);
  Quill.register(
    {
      'formats/emoji': quillEmoji.EmojiBlot,
      'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
      'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
      'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
    },
    true
  );
  const muiTheme = useTheme();
  const handleChange = useCallback(
    message => {
      if (message !== '<p><br></p>') {
        setFieldValue('message', message);
      } else {
        setFieldValue('message', '<p></p>');
      }
    },
    [setFieldValue]
  );

  return (
    <ReactQuillStyled
      preserveWhitespace
      value={values.message}
      muiTheme={muiTheme}
      onChange={handleChange}
      placeholder="Write your message to reply all..."
    />
  );
});
