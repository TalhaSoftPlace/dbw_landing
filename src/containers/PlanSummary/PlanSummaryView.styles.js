import styled from '@emotion/styled';
import { ReactComponent as ChevronDown } from '../../images/chevron-thin-down.svg';
import { ReactComponent as MobileChevronDown } from '../../images/chevron-thin-down-mobile.svg';
import { Grid } from '@mui/material';
import { Button } from '../../components';

export const ButtonStyled = styled(Button)`
  width: 340px;
`;
export const ChevronDownIcon = styled(ChevronDown)`
  margin-right: 5px;
  ${({ theme }) => `
    * {
    fill: ${theme.palette.text.light};
    }
    `}
`;

export const GridStyled = styled(Grid)`
  padding: 40px;
  ${({ theme }) => `
      .last4 {
        font-weight: 500;
      }
    .asLink {
        color: ${theme.palette.text.blueLight};
        cursor: pointer;
        font-weight: 500;
        padding-inline: 6px;
      }
    @media (max-width: ${theme.breakpoints.values.sm}px){
    padding: 20px;
      }
    background: ${theme.palette.email.text.light};
    `}
  h3 {
    margin: 0px;
  }
  p {
    margin-top: 0px;
    font-size: 16px;
    ${({ theme }) => `
            color: ${theme.palette.text.greyDark};
        `}
  }
`;

export const MobileChevronDownIcon = styled(MobileChevronDown)`
  margin-top: 22px;
  ${({ theme }) => `
    * {
    fill: ${theme.palette.text.light};
    }
    `}
`;
