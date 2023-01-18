import styled from '@emotion/styled';

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  tr td:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  tr td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  tr th:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  tr th:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .css-1j4xfdl {
    padding: 0px 20px;
  }
`;

export const TableTrStyled = styled.tr`
  margin-bottom: 5px;
`;

export const TableThStyled = styled.tr`
  margin-bottom: 5px;
`;
