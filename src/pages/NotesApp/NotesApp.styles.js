import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const MeetingnotesArea = styled(Box)`
  height: calc(100vh - 58px);
  overflow: hidden;
  .notesview {
    display: flex;
    flex-direction: row;
    ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px){
      flex-direction: column;
    }
  `};
  }
`;
export const NotesviewStyledBox = styled(Box)`
  position: relative;
  margin: 30px;
  margin-bottom: 0px;
  padding-inline: 10px;
  padding-top: 10px;
  border-radius: 20px;
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.md}px){ 
  max-width: calc(100vw - 20px);
  margin: 11px;
  margin-bottom: 0px;
  padding: 10px;
    }
  background-image: linear-gradient(${theme.palette.background.bgGradiantStart}, ${theme.palette.background.bgGradiantEnd});
    * { 
        font-family: 'Roboto', sans-serif !important;
        border-color: ${theme.palette.background.textFieldBorder} !important;
    }
      .headingborder {
      border-bottom: 2px solid ${theme.palette.text.primary} !important;
  }
  .pagination{
    display:flex;
    -webkit-display:flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    width:100%;
  }
  `};
`;