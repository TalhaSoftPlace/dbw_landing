import styled from '@emotion/styled';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const StyledSpan = styled(Box)`
${({ theme }) => `
      color: ${theme.palette.text.light};
  `};
`;


export const MoreVertIconStyled = styled(MoreVertIcon)`
${({ theme }) => `
      fill: ${theme.palette.text.blueLight};
  `};
`;

export const RulesWrapper = styled(Box)`
  h5{
    margin-bottom: 5px;
    font-weight: 400;
  }
  .rules-table{
    margin-bottom: 60px;
    th{
      
      padding: 15px;
      text-align: center; 
      vertical-align: middle;

      div{
        ${({ theme }) => `
          color: ${theme.palette.text.greyLight};
          font-weight: 400;
        `};
      }
    }

    td{
      text-align: center; 
      vertical-align: middle;
    }

    tr th:first-of-type {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    tr th:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    tr td:last-child {
      div{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;