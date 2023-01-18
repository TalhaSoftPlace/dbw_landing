import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';
import { ReactComponent as Organizer } from '../../images/Organizer.svg';
export const EmailLabel = styled(Typography)`
  ${({ theme }) => `
  color: ${theme.palette.text.emailLabel};
`}
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const BoxStyled = styled(Box)`
  ${({ theme }) => `
    position: relative;
    border: 1px solid ${theme.palette.background.textFieldBorder};
    border-radius: 5px;
    background: ${theme.palette.background.light};
    padding: 20px;
    height: 210px;
    overflow: scroll;
  `}
`;
export const OrganizerIcon = styled(Organizer)`
font-size:20px;
width:20px;
height:20px;

`