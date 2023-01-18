import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import { ReactComponent as Arrow } from '../../images/ArrowIcon.svg';
import { ReactComponent as Logoicon} from '../../images/logoIcon.svg';
export const PricingStyledCard = styled(Card)`
  ${({ theme }) => `
  max-width:100%;
  margin-top:7px;
  border: 1px solid  ${theme.palette.background.blueLight} ;
  border-radius: 25px;
    background-color: ${theme.palette.background.primary};
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-left: 15px;
    }
    }
    `}
`;
export const CardHeading = styled.p`
  ${({ theme }) => `
      display:flex;
      justify-content: center;
      color: ${theme.palette.text.light};
      font-size: 25px;
      margin:0px;
      line-height: 2;
     
   
    `}
`;

export const CardItem = styled.p`
  ${({ theme }) => `
      display:flex;
      color: ${theme.palette.text.pgcolor};
      font-size: 16px;
      background-color: ${theme.palette.background.pricingbg};
      margin-block:10px;
      padding-inline: 10px;
      padding-block:8px;
     
   
    `}
`;
export const ArrowIcon = styled(Arrow)`
  margin-right:15px;
`;

export const LogoIcon = styled(Logoicon)`
height: 35px;
`;