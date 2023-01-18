import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => `
    color: ${theme.palette.text.light};
    font-size: 18px;
    padding-bottom:10px;
    @media (max-width: ${theme.breakpoints.values.md}px){
          padding-inline : 24px;
        }
        @media (max-width: ${theme.breakpoints.values.sm}px){
          margin-top : 25px;
        }
       
        .subheading{
          font-size:25px;
         } 
    .herosignup{
      width:200px;
      @media (max-width: ${theme.breakpoints.values.lg}px){
        width:140px;
      }
    }
    .signin-btn{
      width:200px;
      @media (max-width: ${theme.breakpoints.values.lg}px){
        width:140px;
      }
    }
    .login-signup-grid{
      @media (max-width: ${theme.breakpoints.values.md}px){
        display: flex;
        text-align: center;
      }
      .signin-btn{
        @media (max-width: ${theme.breakpoints.values.md}px){
          margin-top: 0px;
        }
      }
    }
  `}
  p {
    ${({ theme }) => `
    color: ${theme.palette.text.light};
      font-size:24px;
  `}
  }
  a {
    text-decoration: none;
    cursor: pointer;
    padding-inline: 8px;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
  `}
  }
  h2 {
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    `}
    font-weight: 400;
  }
  h2:first-of-type {
    font-weight: 500;
  }

  h4 {
    font-weight: 300;
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    margin-bottom: 30px;
  `}
  }
  h5 {
    ${({ theme }) => `
    color: ${theme.palette.text.light};
  `}
  }
`;

export const EmailBox = styled.div`
  .emailboxIcon {
    height:460px;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      height:270px;
    }
  `}
  }
  width: 100%;
  position: relative;
`;
export const HeroWrapper = styled.div`
  margin-block: 0px;
  padding-inline:9% !important;
  ${({ theme }) => `
    color: ${theme.palette.text.blueDark};
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      padding-inline : 30px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
          margin-bottom:10px;
        }
    @media (min-width: ${theme.breakpoints.values.md}px){
        //height : 50vh;
        }
        `}
`;
