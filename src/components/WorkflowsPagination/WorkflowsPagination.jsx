import React, { useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { PaginationLabel, Wrapper } from './WorkflowsPagination.style';
import { workflowPaginationAtom } from '../../atoms';
import { useLocalization } from '../../hooks';
import { useRecoilState } from 'recoil';

export const WorkflowsPagination = React.memo(() => {
  const { t } = useLocalization();
  const [{ page, total }, setPagination] = useRecoilState(
    workflowPaginationAtom
  );
  const handleIncrement = useCallback(() => {
    if (page * 39 < total)
      setPagination(state => ({
        ...state,
        page: state.page + 1,
      }));
  }, [page, setPagination, total]);

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
          <PaginationLabel>Page {page}</PaginationLabel>
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
