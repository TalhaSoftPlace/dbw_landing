import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DBWTreeItem } from '../DBWTreeItem';
import { StyledTreeView } from './CustomTreeView.styles';
import { Loading } from '../Loading';

export const CustomTreeView = React.memo(
  ({ schema, onSelect, prefix, hasUsers }) => {
    return (
      <>
        {schema ? (
          <StyledTreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <DBWTreeItem
              onSelect={onSelect}
              node={schema}
              isEdit={false}
              prefix={prefix}
              disabled={schema.disabled}
              hasUsers={hasUsers}
            />
          </StyledTreeView>
        ) : (
          <Loading />
        )}
      </>
    );
  }
);

function MinusSquare(props) {
  return <KeyboardArrowUpIcon style={{ width: 30, height: 30 }} {...props} />;
}

function PlusSquare(props) {
  return <KeyboardArrowDownIcon style={{ width: 30, height: 30 }} {...props} />;
}

function CloseSquare(props) {
  return <></>;
}
