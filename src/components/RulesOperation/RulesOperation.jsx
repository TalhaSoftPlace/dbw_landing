import React from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { StyledMenu, StyledMenuItem } from './RulesOperation.style';
export const RulesOperation = ({ children, menuItems, className, ...rest }) => {
  return (
    <PopupState {...rest} variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div variant="contained" {...bindTrigger(popupState)}>
            {children}
          </div>
          <StyledMenu className={className} {...bindMenu(popupState)}>
            {menuItems.map(({ onClick, name, className }) => (
              <StyledMenuItem onClick={onClick} className={"contextmenu " + className} key={name}>
                {name}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
