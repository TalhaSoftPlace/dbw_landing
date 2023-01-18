import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { Button } from '../../components';

export const ButtonStyled = styled(Button)`
  width: 340px
`;

export const PackageGrid = styled(Grid)`

    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    border-radius:8px;
${({ theme, variant }) => {
        switch (variant) {
            case 'primary':
                return `
                background-color: #F1F2F4;
                span{
                    color: ${theme.palette.text.blueLight};
                    font-size: 18px;
                    font-weight: 600;
                }
            `;
            default:
                return `
                    span{
                        color: #2D343E;
                        font-size: 18px;
                        font-weight: 600;
                    }
                `;
        }
    }}
`;


export const Wrapper = styled(Box)`   
border-radius: 0px 0px 8px 8px;
padding-bottom: 20px;
  ${({ theme }) => `
  background-color: ${theme.palette.email.text.light};
  `}

  .promotionalMsg{
      font-size: 15px;
      ${({ theme }) => `
      color: ${theme.palette.background.greyDark};
      `}
      margin-top: 0px;
  }

  .highlight{
    ${({ theme }) => `
    color: ${theme.palette.text.blueLight};
      `}
    font-weight: 500;
  }

  h5{
      margin-top: 5px;
      margin-bottom: 0px;
      font-size: 18px;
  }

  .w-100{
    width: 100%;
  }

  .hrLine{
      height: 15px;
      margin-top: 15px;
    ${({ theme }) => `
    border-top: 2px solid ${theme.palette.text.greyLight};
    `}
  }
`;
