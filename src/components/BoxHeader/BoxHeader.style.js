import styled from '@emotion/styled';
import Box from '@mui/material/Box';
export const BoxHeaderStyled = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.palette.text.blueLight};
    `}
  border-radius: 8px 8px 0px 0px;
  height: 100%;

  h2 {
    ${({ theme }) => `
        color: ${theme.palette.email.text.light};
        font-size: 36px;
        font-weight: 500;
        padding-top: 0px;
        margin: 0px;
      `}
  }

  h3 {
    ${({ theme }) => `
        color: ${theme.palette.email.text.light};
        font-size: 18px;
        font-weight: 500;
        padding-top: 0px;
        margin: 0px;
      `}
  }

  p {
    ${({ theme }) => `
        color: ${theme.palette.email.text.light};
        font-size: 15px;
        font-weight: 300;
        margin-top: 5px;
      `}
  }
  span {
    ${({ theme }) => `
        color: ${theme.palette.email.text.light};
      `}
  }

  .rightContent {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      display: flex;
      justify-content: center;
      padding-bottom: 15px;
      justify-content: end;
    }
    @media (max-width: ${theme.breakpoints.values.xs}px){
      padding-right: 10px;
    }
    @media (min-width: ${theme.breakpoints.values.lg}px){
      display: block;
      text-align: end;
      padding-top: 10px;
    }
    `}
  }

  span {
    ${({ theme }) => `
        color: ${theme.palette.text.light};
      `}
    cursor: pointer;
  }
`;
