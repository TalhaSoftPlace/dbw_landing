import styled from '@emotion/styled';
import TreeView from '@mui/lab/TreeView';

export const StyledTreeView = styled(TreeView)`
  .MuiTreeItem-label {
    div {
      max-width: 100% !important;
      flex-basis: 100% !important;
    }
  }
  padding-right: 10px;
  overflow: hidden;
  padding-bottom: 18px;
  li:last-of-type {
    ul.MuiTreeItem-group {
    }
  }
  * {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
