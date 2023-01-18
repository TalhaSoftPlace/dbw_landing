import { Menu } from '@mui/material';
import React, { useRef } from 'react';
import { useOutsideClick } from '../../hooks';
import { StyledTable } from './EmailList.styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const EmailsenderList = React.memo(({ to, anchorEl, open, onClose }) => {
  const ref = useRef();
  useOutsideClick(ref, onClose);

  return (
    <Menu
      id="checkbox-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'checkbox-button',
      }}
    >
      <div ref={ref}>
        <StyledTable>
          {to?.toRecipients?.map((value, index) => (
            <tr key={index}>
              <th>
                <PersonOutlineIcon />
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </StyledTable>
      </div>
    </Menu>
  );
});
