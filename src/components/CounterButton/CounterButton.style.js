import { ButtonGroup,  Button } from '@mui/material';
import styled from '@emotion/styled';


export const ButtonGroupStyled = styled(ButtonGroup)`
    .MuiButtonGroup-grouped{
        ${({ theme }) => `
        @media (max-width: ${theme.breakpoints.values.xs}px){
            min-width: 30px;
          }
        `}
    }
`;
export const LabelButton = styled(Button)`
    ${({ theme }) => `
        color: ${theme.palette.text.greyDark};
    `}
`;