import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
export const StyledTable = styled.table`
${({ theme }) => `
      color: ${theme.palette.email.text.primaryText} !important;
    `}
  font-family: 'Roboto', sans-serif !important;
  width: 888px;
  th {
    text-align: right;
    padding-right: 10px;
    vertical-align: top;
    width: 100px;
  }
  .allheader {
    ${({ theme }) => `
      color: ${theme.palette.email.text.primaryText} !important;
    `}
    cursor: pointer;
  }
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      font-size: 12px !important;
      width: 330px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      width: 330px;
    }
    `}
`;
export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;
