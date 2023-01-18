import styled from '@emotion/styled';

export const LineItemTd = styled.td`
  &:first-of-type {
    padding-inline-start: 20px;
  }
  &:last-of-type {
    padding-inline-end: 20px;
  }
  font-size: 16px;
  font-weight: 300;
  ${({ background, itemColor }) => `
background: ${background}};
color: ${itemColor};
`};
`;

export const LineItemTh = styled.th`
  font-size: 16px;
  font-weight: 300;
  text-align: start;
  ${({ background, headingColor, padding  }) => `
background: ${background}};
color: ${headingColor};
padding: ${padding};
`};
`;
