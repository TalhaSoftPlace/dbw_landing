import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactComponent as SucessIcon } from '../../images/SuccessIcon.svg';
export const StyledBox = styled(Box)`
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 30px;
  ${({ theme }) => `
        background: ${theme.palette.background.light};
     `};
`;
export const SuccessIcon = styled(SucessIcon)`
  width:110px;
  height:110px;
`;