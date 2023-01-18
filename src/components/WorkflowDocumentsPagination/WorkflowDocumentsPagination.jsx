import React, { useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { PaginationLabel, Wrapper } from './WorkflowDocumentsPagination.style';
import { workflowDocumentsPaginationAtom } from '../../atoms';
import { useLocalization } from '../../hooks';
import { useRecoilState } from 'recoil';

export const WorkflowDocumentsPagination = React.memo(() => {
  const { t } = useLocalization();
  const [{ page, totalPage }, setPagination] = useRecoilState(
    workflowDocumentsPaginationAtom
  );
  const handleIncrement = useCallback(() => {
    if (page < totalPage  )
      setPagination(state => ({
        ...state,
        page: state.page + 1,
      }));
  }, [page, setPagination, totalPage]);

  const handleDecrement = useCallback(() => {
    if (page > 1)
      setPagination(state => ({
        ...state,
        page: state.page - 1,
      }));
  }, [page, setPagination]);

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <PaginationLabel>Page {page} of {totalPage}</PaginationLabel>
        </Box>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          <Tooltip title={t.iconsToolTip.prev}>
            <IconButton className="paginationbtn" onClick={handleDecrement}>
              <ChevronLeftIcon sx={{ color: 'email.text.light' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t.iconsToolTip.next}>
            <IconButton className="paginationbtn" onClick={handleIncrement}>
              <ChevronRightIcon sx={{ color: 'email.text.light' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Wrapper>
  );
});
