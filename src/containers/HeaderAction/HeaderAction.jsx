import React from 'react';
import {
  AddCircleOutlineStyled,
  HeaderActionButton,
} from './HeaderAction.styles';

export const HeaderAction = React.memo(
  ({ text, onClick, icon = <AddCircleOutlineStyled /> }) => {
    return (
      <>
        <HeaderActionButton onClick={onClick}>
          {icon} {'  '} {text}
        </HeaderActionButton>
      </>
    );
  }
);
