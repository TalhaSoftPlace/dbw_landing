import styled from '@emotion/styled';

export const NormalHr = styled.hr`
  width: 100%;
  ${({ theme }) => `
  border: 1px solid ${theme.palette.text.primary};
`};
`;

export const Wrapper = styled.div`
  bottom: 0px;
  position: relative;
`;
