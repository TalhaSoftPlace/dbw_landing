import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Wrapper = styled(Box)`
  height: calc(100% - 190px);
  overflow: hidden;
  overflow-y: auto;
`;
export const FormbuilderWrapper = styled(Box)`
  height: calc(100vh - 340px);
  padding:0px 10px;
  overflow: hidden;

  position: relative;
  iframe {
    height: calc(100% - 54px);
    width: 100%;
    border: none;
    margin-bottom: 8px;
  }
`;

export const FormModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
`;

export const UserSelectionWrapper = styled(Box)`
  display: flex;
  margin: 20px auto;
  padding:10px;
  max-width: 1300px;
  justify-content: space-around;
  gap: 10px;
  ${({ theme }) => `
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
export const HeadText = styled(Box)`
${({ theme }) => ` 
display:none;
width:100%;
text-align:center;
  @media (max-width: ${theme.breakpoints.values.md}px){
    display:block;
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
export const CloseIconStyled = styled(CloseIcon)`
  float: right;
  margin: 10px;
  font-size: 30px;
  cursor: pointer;
  ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
    `}
`;
