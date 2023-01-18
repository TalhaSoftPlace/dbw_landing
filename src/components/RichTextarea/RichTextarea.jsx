import React, { useCallback } from 'react';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';
import { useTheme } from '@mui/material';
import { QuilStyled } from './RichTextarea.styles';

export const RichTextarea = React.memo(({ values, setFieldValue, name, disabledEditor }) => {
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
    (message) => {
      setFieldValue(name, message);
    },
    [setFieldValue, name]
  );
  return (
    <QuilStyled
      readOnly={disabledEditor}
      preserveWhitespace
      value={values[name]}
      muiTheme={muiTheme}
      onChange={handleChange}
    />
  );
});
