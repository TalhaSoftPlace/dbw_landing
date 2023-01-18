import React, { useCallback } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';
import { ReactQuillStyled } from './RichEditor.styles';
import { useTheme } from '@mui/material';

const mods = {
  toolbar: {
    container: [
      [
        { header: '1' },
        { header: '2' },
        { header: [3, 4, 5, 6] },
        { font: [] },
      ],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['emoji'],
      ['clean'],
      ['code-block'],
    ],
  },
  'emoji-toolbar': true,
  'emoji-textarea': true,
  'emoji-shortname': true,
};

export const Editor = React.memo(
  ({
    open,
    toolOpen,
    autoFocus = false,
    values,
    setFieldValue,
    bccCccExpand,
    isemail,
  }) => {
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
        setFieldValue('message', message);
      },
      [setFieldValue]
    );
    return (
      <ReactQuillStyled
        isemail={isemail}
        value={values.message}
        preserveWhitespace
        modules={mods}
        theme="snow"
        muiTheme={muiTheme}
        onChange={handleChange}
        placeholder="Write your message..."
        className={
          (open && !bccCccExpand ? ' opened ' : '') +
          (toolOpen ? ' quilToolOpened ' : '') +
          (bccCccExpand && !open ? ' bccShown' : '') +
          (open ? ' w-100' : '') +
          (open && bccCccExpand ? ' bothopened' : '')
        }
      />
    );
  }
);
