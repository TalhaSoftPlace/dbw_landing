import styled from '@emotion/styled';
export const PricingStyled = styled.p`
 .price{
    padding-inline:5px;
 }
 ${({ theme }) => `
      color: ${theme.palette.text.primaryText};
      `}
`;