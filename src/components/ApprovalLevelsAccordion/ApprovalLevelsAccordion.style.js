import styled from '@emotion/styled';
import { AccordionDetails, Box } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordion from '@mui/material/Accordion';
export const Wrapper = styled(Box)`
  .MuiAccordionSummary-root {
    height: 40px !important;
  }
  ${({ theme }) => `
  align-items: center;
  gap: 16%;
    // background-color: ${theme.palette.text.blueLight};
    border-radius: 15px 15px 15px 15px;
    `}
  .filled {
    ${({ theme }) => `
        background: ${theme.palette.background.blueLight};
   `};
  }
  .MuiPaper-elevation {
    ${({ theme }) => `
        background: ${theme.palette.background.primary} !important;
   `};
    svg {
      color: white;
    }
  }
  .accordionHead {
    display: flex;
    justify-content: space-between;
  }
  .heading {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
  }
  .subtitle {
    font-size: 15px;
    padding-top: 5px;
    text-align: center;
    line-height: 1.3;
  }
  .price {
    padding-top: 5px;
    font-size: 15px;
    text-align: right;
  }
  .description {
    font-size: 15px;
  }
  .deepBlue {
    ${({ theme }) => `
      color: ${theme.palette.text.blueLight};
      `}
  }
  .features {
    ${({ theme }) => `
    border-top:1px solid ${theme.palette.background.lightGrey};
    border-bottom:1px solid ${theme.palette.background.lightGrey};
      `}
  }
`;

export const AccordionFooter = styled(Box)`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
    display: block;
    justify-content: center;
    width:100%;
    text-align: center;
    .planprice{
      margin-bottom: 20px;
    }
    .planbtn{
      width :100%;
    }
    }
    `}
  padding-top:20px;
  padding-bottom: 5px;
  .slectProfessional {
  }
  p {
    margin: 0px;
    padding: 0;
  }
`;

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  margin: '10px 0px',
  borderRadius: '15px 15px 15px 15px',
  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  borderRadius: '15px 15px 15px 15px',
  color: '#fff',
}));

export const UserSelectionWrapper = styled(Box)`

  display: flex;
  margin: 10px auto;
  max-width: 1300px;
  justify-content: space-around;
  gap: 10px;
  ${({ theme }) => `
  color: ${theme.palette.text.light};
  @media (max-width: ${theme.breakpoints.values.md}px){
    flex-direction: column;
    justify-content: center;
  }
   `};
`;

export const Column = styled(Box)`
  overflow: hidden;
  overflow-y: auto;
  border-radius: 20px;
  padding: 20px;
  height: 500px;
  width: 600px;
  ${({ theme }) => ` 
  @media (max-width: ${theme.breakpoints.values.md}px){
    width: 100%;
  }
        background: ${theme.palette.background.primary};
   `};
  .MuiTreeItem-content {
    ${({ theme }) => `
        background-color: ${theme.palette.background.dark}  !important;
        background: ${theme.palette.background.dark}  !important;
   `};
  }
  & > ul {
    margin-top: -20px !important;
  }
`;

export const Item = styled(Box)`
  cursor: pointer;
  height: 50px;
  padding: 16px 36px;
  margin-right: 10px;
  border-radius: 5px;
  margin-top: 10px;

  ${({ theme }) => `
        background: ${theme.palette.background.dark};
   `};
`;

export const IconWrapper = styled(Box)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 500px;
  width: 250px;
  ${({ theme }) => ` 
  @media (max-width: ${theme.breakpoints.values.md}px){
    display:none;
  }
   `};

`;

export const Icon = styled(Box)`
  height: 140px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => ` 
  @media (max-width: ${theme.breakpoints.values.md}px){
    height: 100%;
    svg {
      font-size: 60px !important;
    }
  }
   `};
  svg {
    font-size: 100px !important;
  }
  span {
    margin-top: -20px;
  }
`;

export const StyleAccordionDetails = styled(AccordionDetails)`
  ${({ theme }) => `
        background: ${theme.palette.background.dark};
   `};
`;
export const HeadText = styled(Box)`
${({ theme }) => ` 
display:none;
color: ${theme.palette.text.light};
width:100%;
text-align:center;
  @media (max-width: ${theme.breakpoints.values.md}px){
    display:block;
  }
   `};
`;