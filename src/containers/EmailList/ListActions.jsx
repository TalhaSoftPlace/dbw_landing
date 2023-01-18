import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import { EmailIcon  , StarBorderIcons} from './EmailList.styles';
import { useFlagEmailMutation } from '../../mutations';
export const ListActions = React.memo(({ email }) => {
  const { mutateAsync: updateuserFlag } = useFlagEmailMutation();

  const flagImportant = React.useMemo(() => {
    const found = email?.userFlags?.find(obj => obj === 'Important');
    return found ? true : false;
  }, [email?.userFlags]);

  const [impFlag, setImpFlag] = useState(flagImportant);

  const handleflag = React.useCallback(
    e => {
      e.stopPropagation();
      if (impFlag) {
        setImpFlag(false);
      } else {
        setImpFlag(true);
      }
      if (flagImportant) {
        updateuserFlag({
          uids: [email?.uid],
          flag: 'Important',
          activationStatus: false,
        }).then(() => {});
      } else {
        updateuserFlag({
          uids: [email?.uid],
          flag: 'Important',
          activationStatus: true,
        }).then(() => {});
      }
    },
    [email?.uid, flagImportant, impFlag, updateuserFlag]
  );
  useEffect(() => {
    setImpFlag(flagImportant);
  }, [flagImportant, setImpFlag]);
  return (
    <EmailIcon>
      <Box className="justify-content-end">
        <IconButton aria-label="flag" size="small" onClickCapture={handleflag}>
          {!impFlag ? (
            <StarBorderIcons fontSize="inherit" />            
          ) : (
            <StarIcon
            className='YelloIcon'
            fontSize="inherit"
          />
          )}
        </IconButton>
      </Box>
      <Box className="justify-content-end">
        {email.hasAttachment && (
          <IconButton aria-label="attach" size="small">
            <AttachFileIcon sx={{ color: 'text.light' }} fontSize="inherit" />
          </IconButton>
        )}
      </Box>
    </EmailIcon>
  );
});
