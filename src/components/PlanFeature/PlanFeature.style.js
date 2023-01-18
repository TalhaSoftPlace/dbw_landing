import styled from '@emotion/styled';


export const Wrapper = styled.div`
label{
    font-size: 18px;
}
button.MuiIconButton-root{
    padding-bottom: 0px;
    padding-top: 0px;
}
span{
    ${({ theme }) => `
    color: ${theme.palette.background.greyDark};
    `}
}
`;