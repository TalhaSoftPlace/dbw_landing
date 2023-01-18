import styled from '@emotion/styled';
import TreeView from '@mui/lab/TreeView';

export const StyledTreeView = styled(TreeView)`
  height: calc(100vh - 320px);
  padding-right: 10px;
  overflow: hidden;
  overflow-y: auto;
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
