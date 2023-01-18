import { Menu } from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { StyledTable } from './EmailInfoBox.styles';
import moment from 'moment';
import { EmailAllHeader } from '../../components';

export const EmailInfoBox = React.memo(({ email, anchorEl, open, onClose  }) => {
  const [anchorHeaderl, setAnchorHeaderl] = React.useState(null);
  const openHeader = useMemo(() => !!anchorHeaderl, [anchorHeaderl]);
  const handleClick = useCallback((event) => {
    setAnchorHeaderl(event?.currentTarget);
  }, []);

  const headerClose = useCallback(() => {
    setAnchorHeaderl(null);
    onClose();
  }, [onClose]);
  const emailAt = useMemo(() => {
    return moment(email?.sentDate).format('h:mm a, MMMM D, YY');
  }, [email]);
  return (
    <Menu
      id="email-infobox"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'checkbox-button',
      }}

    >
      <div>
        <StyledTable sx={{color:'email.text.primaryText'}}>
          <tr>
            <th>from:</th>
            <td>{email?.sender}</td>
          </tr>
          <tr>
            <th className="heading">to:</th>
            <td>
              {email?.toRecipients?.map((data, idx) => (
                <Box key={data + idx} sx={{ mt: 0, mb: 0 }}>
                  {data}
                </Box>
              ))}
            </td>
          </tr>

          {email?.ccList?.length && (
            <tr>
              <th>cc:</th>
              <td>{email?.ccList?.join()}</td>
            </tr>
          )}
          <tr>
            <th>date:</th>
            <td>{emailAt}</td>
          </tr>
          <tr>
            <th>subject:</th>
            <td>{email?.subject}</td>
          </tr>

          <tr>
            <th onClick={handleClick} className="allheader">
              <u>all headers</u>
            </th>
            <td></td>
          </tr>
        </StyledTable>
      </div>

      <EmailAllHeader
        email={email}
        anchorHeaderl={anchorHeaderl}
        openHeader={openHeader}
        onheaderClose={headerClose}
      />
    </Menu>
  );
});
