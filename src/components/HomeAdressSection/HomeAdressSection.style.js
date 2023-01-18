import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Address = styled(Box)`
  align-items: center;
  gap: 16%;
  padding-inline: 16%;
  padding-block: 60px;
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.text.light};
    color: ${theme.palette.landingpage.text.primaryText};
@media (max-width: ${theme.breakpoints.values.md}px){
      padding-inline: 6%;
      padding-top:30px;
      padding-bottom:15px;
    }
    .media{
      margin-right:18px;
      @media (max-width: ${theme.breakpoints.values.md}px){
      margin-right:17px;
    }
    }
    .legal{
      margin-right:22px;
       @media (max-width: ${theme.breakpoints.values.md}px){
       margin-right:20px;
    }
    }
  `}
  .emailIcon {
    margin-bottom: -6px;
    margin-right: 5px;
  }
  b {
    margin-right: 5px;
  }
  a {
    ${({ theme }) => `

    color: ${theme.palette.landingpage.text.blueLight};

  `}
  }
  .clickhere {
    padding-bottom: 2px;
    border-bottom: 1px solid #174180;
  }
  .adressHead {
    margin-bottom: 30px;
  }
`;

export const AddressHead = styled(Box)`
  font-weight: 500;
  ${({ theme }) => `
  color: ${theme.palette.landingpage.text.primaryText};
  `}
  
`;
