import React, { useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { StyledMenu } from './ContextMenu.style';
export const ContextMenu = ({ children, menuItems, ...rest }) => {
  const handleItemClick = useCallback((popState, onClick) => {
    popState.close();
    onClick();
  }, []);
  return (
    <PopupState {...rest} variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div variant="contained" {...bindTrigger(popupState)}>
            {children}
          </div>
          <StyledMenu {...bindMenu(popupState)}>
            {menuItems.map(({ onClick, name, component }) =>
              component ? (
                <>{component}</>
              ) : (
                <MenuItem
                  onClick={() => handleItemClick(popupState, onClick)}
                  className="contextmenu"
                  key={name}
                >
                  {name}
                </MenuItem>
              )
            )}
          </StyledMenu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
