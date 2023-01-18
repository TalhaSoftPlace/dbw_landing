import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
export const Wrapper = styled(Box)`
.css-i4bv87-MuiSvgIcon-root  {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      width:0.7em;
    }
    `}
  }
`;
export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  width: 35px;
  height: 35px;
`;

export const StyledCircle = styled(PanoramaFishEyeIcon)`
  width: 35px;
  height: 35px;
  ${({ theme }) => `
  color: ${theme.palette.email.text.light};
    `}
`;
export const NumberCount = styled(Box)`
width: 35px;
height: 35px;
border-radius:50%;
line-height:2.2;
${({ theme }) => `
  background-color:${theme.palette.email.background.checkboxbg};
  color: ${theme.palette.email.text.light};
    `}
    text-align: center;

`;