import * as React from 'react';
import { useState } from 'react';
import { useLocalization } from '../../hooks';
import {
  LabelBox,
  StyledTreeItem,
  DialogStyled,
  FieldGrid,
  FieldLabel,
  CloseIconStyled,
  StyledTextField,
} from './DBWTreeItem.styles';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Grid,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
} from '@mui/material';
import { Button } from '../Button';
import {
  useAddOrgNode,
  useDeleteOrgNode,
  useUpdateOrgNode,
} from '../../mutations';
import { useDoubleClick } from '../../hooks';
import { ViewUsersDialog } from '../ViewUsersDialog';

export const DBWTreeItem = React.memo(
  ({ node, isEdit, onSelect, prefix, disabled, hasUsers = false }) => {
    const { mutateAsync: addNode, isLoading: isAdding } = useAddOrgNode();
    const {
      mutateAsync: deleteNode,
      isLoading: isDeleting,
    } = useDeleteOrgNode();
    const {
      mutateAsync: updateNode,
      isLoading: isUpdateing,
    } = useUpdateOrgNode({
      id: node.node_id,
    });
    const [newBranchDialog, setNewBranchDialog] = useState(false);
    const [branchName, setBranchName] = useState('');

    const [updateDialog, setUpdateDialog] = useState(false);
    const [nodeName, setNodeName] = useState(node.name);
    const itemRef = React.useRef();

    const onDoubleClick = React.useCallback(
      event => {
        event.stopPropagation();
        onSelect && onSelect(node);
      },
      [node, onSelect]
    );

    const onClick = React.useCallback(event => {
      event.stopPropagation();
    }, []);

    useDoubleClick({
      onSingleClick: onClick,
      onDoubleClick: onDoubleClick,
      ref: itemRef,
    });

    const deleteClick = React.useCallback(() => {
      deleteNode({ id: node.node_id });
    }, [deleteNode, node.node_id]);

    const handleAdd = React.useCallback(() => {
      addNode({
        parentId: node.node_id,
        name: branchName,
        level: node.level + 1,
      }).then(() => {
        setNewBranchDialog(false);
        setBranchName('');
      });
    }, [addNode, node.node_id, node.level, branchName]);

    const handleUpdate = React.useCallback(() => {
      updateNode({
        name: nodeName,
      }).then(() => {
        setUpdateDialog(false);
      });
    }, [updateNode, nodeName]);
    const handleChange = React.useCallback(e => {
      setBranchName(e.target.value);
    }, []);

    const handleNodeChange = React.useCallback(e => {
      setNodeName(e.target.value);
    }, []);

    const handleClose = React.useCallback(() => {
      setNewBranchDialog(false);
      setUpdateDialog(false);
      setBranchName('');
    }, [setNewBranchDialog]);

    const handleEdit = React.useCallback(() => {
      setUpdateDialog(true);
    }, [setUpdateDialog]);

    const handleOpen = React.useCallback(() => {
      setNewBranchDialog(true);
    }, [setNewBranchDialog]);

    const renderChildrens = React.useMemo(() => {
      if (node?.children && node?.children?.length) {
        return node.children?.map(childnode => {
          return (
            <DBWTreeItem
              key={childnode.node_id}
              node={childnode}
              isEdit={isEdit}
              onSelect={onSelect}
              prefix={prefix}
              hasUsers={hasUsers}
            />
          );
        });
      }
    }, [node.children, isEdit, onSelect, prefix, hasUsers]);
    const { t } = useLocalization();
    return (
      <>
        <StyledTreeItem
          nodeId={node.node_id.toString()}
          label={
            <>
              <Grid
                sx={{ justifyContent: 'space-between' }}
                ref={disabled ? null : itemRef}
                container
              >
                <Grid item sm={6}>
                  {prefix && prefix}
                  {node.name.toUpperCase()}
                  {hasUsers && node.node_id && (
                    <ViewUsersDialog nodeId={node?.node_id} />
                  )}
                </Grid>
                {isEdit && (
                  <Grid item sm={6}>
                    <LabelBox>
                      {!node?.children?.length && (
                        <IconButton
                          sx={{
                            height: 24,
                            width: 24,
                            padding: 0,
                            marginRight: 1,
                          }}
                          disabled={isDeleting}
                          onClick={deleteClick}
                          component="label"
                        >
                          <DeleteIcon style={{ color: 'red', fontSize: 24 }} />
                        </IconButton>
                      )}
                      {node.level > 1 && (
                        <IconButton
                          sx={{
                            height: 24,
                            width: 24,
                            padding: 0,
                            marginRight: 1,
                          }}
                          onClick={handleEdit}
                          component="label"
                        >
                          <BorderColorOutlinedIcon sx={{ color: 'text.light', }} />
                        </IconButton>
                      )}
                      {node.level <= 3 && (
                        <IconButton
                          sx={{
                            height: 24,
                            width: 24,
                            padding: 0,
                            marginRight: 1,
                          }}
                          onClick={handleOpen}
                          component="label"
                        >
                          <AddCircleOutlineOutlinedIcon
                            sx={{ color: 'text.light', }}
                          />
                        </IconButton>
                      )}
                    </LabelBox>
                  </Grid>
                )}
              </Grid>
            </>
          }
        >
          {renderChildrens}
        </StyledTreeItem>

        <DialogStyled
          open={newBranchDialog}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <DialogTitle sx={{ pb: 0, margin: 0, display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <FieldLabel m={1}>
                Enter
                {node.level === 1
                  ? ' Division:'
                  : node.level === 2
                  ? ' Department:'
                  : ' Team:'}
              </FieldLabel>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <CloseIconStyled onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <StyledTextField
                  value={branchName}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <FieldGrid item xs={4}>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  size="small"
                  variant="primary"
                  disabled={!branchName || isAdding}
                >
                  {isAdding ? 'Adding...' : 'Add'}
                </Button>
              </FieldGrid>
            </Grid>
          </DialogContent>
        </DialogStyled>
        {/* update */}
        <DialogStyled
          open={updateDialog}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <DialogTitle sx={{ pb: 0, margin: 0, display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <FieldLabel m={1}>
                {t.components.dbwTreeItem.enter}
                {node.level === 1
                  ? ' Division:'
                  : node.level === 2
                  ? ' Department:'
                  : ' Team:'}
              </FieldLabel>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <CloseIconStyled onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <StyledTextField
                  value={nodeName}
                  type="text"
                  onChange={handleNodeChange}
                />
              </Grid>
              <FieldGrid item xs={4}>
                <Button
                  onClick={handleUpdate}
                  fullWidth
                  size="small"
                  variant="primary"
                  disabled={!nodeName || isUpdateing}
                >
                  {isUpdateing ? 'Updating...' : 'Update'}
                </Button>
              </FieldGrid>
            </Grid>
          </DialogContent>
        </DialogStyled>
      </>
    );
  }
);
