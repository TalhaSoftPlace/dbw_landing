import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lg}px){
      margin-left: 0px;
      margin-right: 0px;
      }
      @media (max-width: ${theme.breakpoints.values.sm}px){
    padding: 15px;
      }
    `}
  ${({ theme }) => `
        background-color: ${theme.palette.background.lightGray};
    `}
  .planTitle {
    font-size: 16px;
  }
  h3 {
    font-size: 18px;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  p {
    margin-top: 0px;
  }

  .w-100 {
    width: 100%;
  }

  .hrLine-bold {
    margin: 0px;
    ${({ theme }) => `
      border-top: 2px solid ${theme.palette.text.primary};
    `}
  }

  .pt-0 {
    padding-top: 0px !important;
  }
  .mpt-0 {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
        padding-top: 0px !important;
      }
    `}
  }

  .text-align-end {
    text-align: end;
  }

  .success-label {
    ${({ theme }) => `
  color: ${theme.palette.text.sccuess};

  `}
  }

  h5 {
    margin-top: 0px;
    font-size: 16px;
  }

  .paymentInfo {
    font-size: 15px;
    color: #4d5a6e;
  }

  a {
    ${({ theme }) => `
            color: ${theme.palette.text.blueDark};
            text-decoration: underline;
            font-weight: bold;
        `}
  }

  .planMessage {
    font-size: 16px;
    ${({ theme }) => `
    color: ${theme.palette.text.primaryText};
  `}
  }

  .planMessagegrid {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px){
        padding-left: 5px;
      }
    `}
  }
`;
