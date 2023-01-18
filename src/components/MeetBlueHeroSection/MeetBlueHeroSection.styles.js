import styled from '@emotion/styled';
import MeetBlueIcon from '../../images/meetbluebgicon.svg';
import { ReactComponent as Logoicon } from '../../images/Meetblue.svg';
import { TextField, Divider } from '@mui/material';

export const LogoIcon = styled(Logoicon)`
  height: 33px;
  width: 45px;
  ${({ theme }) => `

  color: ${theme.palette.text.blueDark};
  @media (max-width: ${theme.breakpoints.values.lgx}px){
    height: 28px;
    width: 40px;
  }
  @media (max-width: ${theme.breakpoints.values.md}px){
    height: 22px;
    width: 34px;
  }
`}
`;

export const HeroWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-block: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding-bottom: 1rem;
  ${({ theme }) => `
    color: ${theme.palette.text.blueDark};
    // @media (max-width: ${theme.breakpoints.values.lgx}px){
    //   padding-inline : 30px;
    // }
    // @media (max-width: ${theme.breakpoints.values.md}px){
    //     }
    //     .leftText{
    //       margin-top:50px;
    //       @media (max-width: ${theme.breakpoints.values.lgx}px){
    //         margin-top:5px;
    //       }
    //     }
  `}

  .startmeetingbox {
    padding-inline: 30px;
    justify-content: center;
    flex-direction: column;
    padding-block: 15px;
    width: 40%;
    border-radius: 5px;
    box-shadow: 0px 2px 6px #00000038;
    margin-top: 0px;

    ${({ theme }) => `
          color: ${theme.palette.text.light};
          background-color: ${theme.palette.background.darkbg};

          @media (max-width: ${theme.breakpoints.values.md}px){
            width:100%;
            display:flex;
            flex-direction: column;
            justify-content: center;
          }
          @media (max-width: ${theme.breakpoints.values.xs}px){
            width: 320px;
            padding-inline:15px;
          }
          @media (max-width: ${theme.breakpoints.values.xmd}px){
            width:90%;
          }
          @media (min-width: ${theme.breakpoints.values.xmd}px){
            width: 720px;
          }
          
          
          `}
  }
  .btnbox {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    ${({ theme }) => `
          @media (max-width: ${theme.breakpoints.values.md}px){
            padding-block:5px;
            flex-direction: column;
            justify-content: space-around;

          }
          `}
  }
`;

export const MainHeading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;

  .leftText {
    padding-inline: 1rem;
  }

  ${({ theme }) => `
    @media (min-width: ${theme.breakpoints.values.xmd}px){
      flex-direction: row;
      column-gap: 1rem;
      justify-content: center;
    }
  `};
`;

export const Wrapper = styled.div`
  background-image: url(${MeetBlueIcon});
  background-repeat: no-repeat;
  // height: 460px;
  margin-top: 10px;
  padding-top: 10px;
  ${({ theme }) => `
    color: ${theme.palette.text.light};
    font-size: 18px;
    // @media (max-width: ${theme.breakpoints.values.lgx}px){
    //   margin-top:0px;
    //   padding-top:0px;
    //   padding-left:10px;
    //   height:270px;
    // }
    // @media (max-width: ${theme.breakpoints.values.md}px){
    //       margin-top:0px;
    //        padding-top:0px;
    //        height:270px;
    //     }
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
  h3 {
    ${({ theme }) => `
    font-size:45px;
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:35px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      font-size:28px;
    }
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
  h6 {
    ${({ theme }) => `
    color: ${theme.palette.text.light};
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      font-size:16px;
    }
    @media (max-width: ${theme.breakpoints.values.sm}px){
      font-size:14px;
    }
  `}
  }
`;

export const EmailBox = styled.div`
  overflow: hidden;
  .emailboxIcon {
    margin-top: 40px;
    width: 100%;
    padding-inline: 1rem;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.lgx}px){
      margin-top: 30px;
    }
    @media (min-width: ${theme.breakpoints.values.lg}px){
      width:500px;
    }
    @media (min-width: ${theme.breakpoints.values.md}px){
      width:420px;
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-top: 0px;
    }
  `}
  }
  width: 100%;
  position: relative;
`;

export const TextFieldStyled = styled(TextField)`
  ${({ theme }) => `
  margin-right: 10px;
  width:100%;
  color: ${theme.palette.text.light};
    border: 1px solid ${theme.palette.background.textFieldBorder};
    border-radius:5px;
    background: ${theme.palette.background.primary};
    input{
      height: 12px !important;
      color: ${theme.palette.text.light};
    }
    @media (max-width: ${theme.breakpoints.values.md}px){
      margin-bottom:15px;
    }
    
  `}
`;

export const StyledDivider = styled(Divider)`
  ${({ theme }) => `
height:60px;
color: ${theme.palette.text.divider};
&::before, &::after{
  border-left: 2px solid ${theme.palette.text.divider} !important;
}
margin-block:5px;
span{
  padding-block:0px !important;
}
`}
`;
