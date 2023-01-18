import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import StarIcon from '../../images/star.svg';
import { DBWTreeItem } from '../DBWTreeItem';
import { StyledTreeView } from './OrgSchemaTreeView.styles';
import { useOrginazationSchema } from '../../queries';
import { Loading } from '../Loading';

export const OrgSchemaTreeView = React.memo(({ isEdit }) => {
  const { data: orgSchema } = useOrginazationSchema();

  const topNode = React.useMemo(
    () => orgSchema?.children?.[0],
    [orgSchema?.children]
  );

  return (
    <>
      {topNode ? (
        <StyledTreeView
          aria-label="customized"
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
        >
          <DBWTreeItem node={topNode} isEdit={isEdit} hasUsers />
        </StyledTreeView>
      ) : (
        <Loading />
      )}
    </>
  );
});

function MinusSquare(props) {
  return <KeyboardArrowUpIcon style={{ width: 30, height: 30 }} {...props} />;
}

function PlusSquare(props) {
  return <KeyboardArrowDownIcon style={{ width: 30, height: 30 }} {...props} />;
}

function CloseSquare(props) {
  return <></>;
}
