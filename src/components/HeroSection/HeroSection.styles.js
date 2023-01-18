import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => `
    color: ${theme.palette.text.blueDark};
    @media (max-width: ${theme.breakpoints.values.md}px){
          padding-inline : 24px;
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
  span {
    ${({ theme }) => `
      color: ${theme.palette.landingpage.text.blueLight};
  `}
  }
  a {
    text-decoration: none;
    cursor: pointer;
    padding-inline: 8px;
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
  `}
  }
  h2 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    `}
    font-weight: 400;
  }
  h2:first-of-type {
    font-weight: 500;
  }

  h4 {
    font-weight: 300;
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.light};
    margin-bottom: 30px;
  `}
  }
  h5 {
    ${({ theme }) => `
    color: ${theme.palette.landingpage.text.blueLight};
  `}
  }
`;

export const EmailBox = styled.div`
  .emailboxIcon {
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      height:270px;
    }
    @media (max-width: ${theme.breakpoints.values.xsm}px){
      height:280px;
    }
   `}
  }

  .animationBox{
  -ms-transform: skewY(30deg); /* IE 9 */
  transform: skewY(30deg);
  width: 201px;
  position: absolute;
  height: 146px;
  top: 126px;
  left: 221px;
  z-index:4;
  overflow: hidden;
  }
  position: relative;

.email-static-icon{
    width: 207px;
    position: absolute;
    left: 0px;
    width: 207px;
    top: -110px;
    transform: skewY(-30deg);
    z-index: 5;
    -webkit-animation: linear infinite;
    -webkit-animation-name: run5;
    -webkit-animation-duration: 13s;
}
  .email-hero-icon{
    width: 207px;
    position: absolute;
    left: 202px;
    top: -110px;
    transform: skewY(-30deg);
    z-index: 6;
    -webkit-animation: linear infinite;
    -webkit-animation-name: run;
    -webkit-animation-duration: 13s;
  }

  @-webkit-keyframes run {
    0% {
      left:202px;
    }
    5% {
      left:0px;
    }
    25% {
      left: 0px;
    }
    30% {
      left: -220px;
    }
     100% {
      left: -220px;
    }
  
   }


.email-hero-icon2{
  width: 207px;
    position: absolute;
    left: 202px;
    width: 207px;
    top: -110px;
    transform: skewY(-30deg);
    z-index: 7;
    -webkit-animation: linear infinite;
    -webkit-animation-name: run2;
    -webkit-animation-duration: 13s;
}
@-webkit-keyframes run2 {
  0% {
    left: 202px;
  }
  25% {
    left: 202px;
  }
  30% {
    left: 0px;
  }
  50% {
    left: 0px;
  }
  55% {
    left: -220px;
  }
   100% {
    left: -220px;
  }

 }

    .email-hero-icon3{
      width: 207px;
    position: absolute;
    left: 202px;
    width: 207px;
    top: -110px;
    transform: skewY(-30deg);
    z-index: 8;
    -webkit-animation: linear infinite;
    -webkit-animation-name: run3;
    -webkit-animation-duration: 13s;
    }
    @-webkit-keyframes run3 {
      0% {
        left: 202px;
      }
      50% {
        left: 202px;
      }
      55% {
        left: 0px;
      }
      75% {
        left: 0px;
      }
      80% {
        left: -220px;
      }
       100% {
        left: -220px;
      }
    }

    .email-hero-icon4{
    width: 207px;
    position: absolute;
    left: 202px;
    width: 207px;
    top: -110px;
    transform: skewY(-30deg);
    z-index: 9;
    -webkit-animation: linear infinite;
    -webkit-animation-name: run4;
    -webkit-animation-duration: 13s;
    }
    @-webkit-keyframes run4 {
      0% {
        left: 202px;
      }
      75% {
        left: 202px;
      }
      80% {
        left: 0px;
      }
       100% {
        left: 0px;
      }
    }
    @-webkit-keyframes run5 {
      0% {
        left: 0px;
      }
      5% {
        left: -220px;
      }
       100% {
        left: -220px;
      }
    }

  
  ${({ theme }) => `

  @media (max-width: ${theme.breakpoints.values.md}px){

    .animationBox{
        width: 120px;
        position: absolute;
        height: 85px;
        top: 77px;
        left: 133px;
      }
              
      .email-static-icon{
        width: 120px;
        left: 0px;
        top: -141px;
        z-index: 5;
        -webkit-animation: linear infinite;
        -webkit-animation-name: run56;
        -webkit-animation-duration: 13s;
      }
      .email-hero-icon{
        width: 125px;
        left: 0px;
        top: -141px;
        z-index: 6;
        -webkit-animation: linear infinite;
        -webkit-animation-name: run;
        -webkit-animation-duration: 13s;
      }

      @-webkit-keyframes run {
        0% {
          left:0px;
        }
        5% {
          left:0px;
        }
        25% {
          left: 0px;
        }
        30% {
          left: -130px;
        }
        100% {
          left: -130px;
        }

      }


      .email-hero-icon2{
      width: 125px;
        left: 120px;
        top: -141px;
        z-index: 7;
        -webkit-animation: linear infinite;
        -webkit-animation-name: run2;
        -webkit-animation-duration: 13s;
      }
      @-webkit-keyframes run2 {
        0% {
          left: 120px;
        }
        25% {
          left: 120px;
        }
        30% {
          left: 0px;
        }
        50% {
          left: 0px;
        }
        55% {
          left: -130px;
        }
        100% {
          left: -130px;
        }
      }

        .email-hero-icon3{
          width: 125px;
          top: -141px;
          left: 0;
          transform: skewY(-30deg);
          z-index: 8;
          -webkit-animation: linear infinite;
          -webkit-animation-name: run3;
          -webkit-animation-duration: 13s;
        }
        @-webkit-keyframes run3 {
          0% {
            left: 120px;
          }
          50% {
            left: 120px;
          }
          55% {
            left: 0px;
          }
          75% {
            left: 0px;
          }
          80% {
            left: -130px;
          }
          100% {
            left: -130px;
          }
        }

        .email-hero-icon4{
        width: 125px;
        left: 0px;
        top: -141px;
        transform: skewY(-30deg);
        z-index: 9;
        -webkit-animation: linear infinite;
        -webkit-animation-name: run4;
        -webkit-animation-duration: 13s;
        }
        @-webkit-keyframes run4 {
          0% {
            left: 120px;
          }
          75% {
            left: 120px;
          }
          80% {
            left: 0px;
          }
          99.9% {
            left: 0px;
          }
          100%{
            left: 130px;
          }
        }
        @-webkit-keyframes run5 {
          0% {
            left: 0px;
          }
          5% {
            left: -220px;
          }
          100% {
            left: -220px;
          }
        }
      }
      
  @media (max-width: ${theme.breakpoints.values.xsm}px){
        
    .emailboxIcon {
      max-width: 200px;
    }
    .animationBox {
    top: 96px;
    left: 90px;
    width: 78px;
    height: 56px;
    }
}
  `}

`;
export const HeroWrapper = styled.div`
  margin-block: 0px;
  ${({ theme }) => `
    color: ${theme.palette.landingpage.text.blueDark};
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      padding-inline : 30px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
          margin-bottom:10px;
          padding-inline : 0px;
        }
        `}
`;
