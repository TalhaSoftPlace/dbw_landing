import styled from '@emotion/styled';
import { Box } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordion from '@mui/material/Accordion';
export const Wrapper = styled(Box)`
  ${({ theme }) => `
  align-items: center;
  gap: 16%;
    background-color: ${theme.palette.text.blueLight};
    border-radius: 15px 15px 15px 15px;
    `}
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
  align-items: center;
  hieght:100%;

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
  .price {
    font-size: 30px;
    font-weight: 500;
    ${({ theme }) => `
    color : ${theme.palette.text.blueLight};
    `}
  }
  .yearly {
    ${({ theme }) => `
    color : ${theme.palette.text.blueLight};
    `}
  }
`;

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: '15px 15px 15px 15px',
  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} /> 
))(({ theme }) => ({
  borderRadius: '15px 15px 15px 15px',
  backgroundColor: theme.palette.text.blueLight,
  color: '#fff',
  '&.Mui-expanded': {
    backgroundColor: theme.palette.email.text.light,
    color: theme.palette.text.textdark,
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { 
    color: theme.palette.text.textdark,
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.light,
  },
  '& .MuiAccordionSummary-IconWrapper': {
    color: theme.palette.text.textdark,
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
