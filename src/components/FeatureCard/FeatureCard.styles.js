import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export const FatureStyledCard = styled(Card)`
  ${({ theme }) => `
    background-color: ${theme.palette.landingpage.background.primary};
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-left: 15px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      text-align:center;
    }
    .cardicon{
      height:160px;
      margin-top:32px;
      @media (max-width: ${theme.breakpoints.values.md}px){
       margin-top:12px;
       height:auto;
    }
    }
    `}
  border: 1px solid #9AABC9;
  height: 100%;

  h3 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 400;
        padding-top: 0px;
        margin: 0px;
      `}
  }
  h4 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 400;
        padding-top: 0px;
        margin: 0px;
      `}
  }

  h5 {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-weight: 400;
        padding-top: 0px;
        margin: 0px;
      `}
  }

  p {
    ${({ theme }) => `
        color: ${theme.palette.landingpage.text.light};
        font-size: 18px;
        font-weight: 300;
      `}
  }
`;
export const StyledCardContent = styled(CardContent)`
  ${({ theme }) => `
  padding:5px;
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-left:0px;
      padding:15px;
      margin-right:0px;
      
    }
    .text-justify{
      text-align: justify;
    }
    `}
`;
