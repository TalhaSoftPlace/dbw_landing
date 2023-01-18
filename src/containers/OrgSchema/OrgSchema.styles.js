import styled from '@emotion/styled';
import { ReactComponent as AddCircleOutline } from '../../images/charedit.svg';

export const AddCircleOutlineStyled = styled(AddCircleOutline)`
height: 20px;
margin-right: 5px;
margin-bottom: 3px;
margin-top: 4px;

#Path_58{
    ${({ theme }) => `
    fill: ${theme.palette.text.light};
`};
}

`;