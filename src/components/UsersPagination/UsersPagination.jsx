import React, { useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { PaginationLabel, Wrapper } from './UsersPagination.style';
import { usersAtom } from '../../atoms';
import { useLocalization } from '../../hooks';
import { useRecoilState } from 'recoil';

export const UsersPagination = React.memo(() => {
  const { t } = useLocalization();
  const [{ page, size, total }, setPagination] = useRecoilState(usersAtom);
  const handleIncrement = useCallback(() => {
    if ((page + 1) * size < total)
      setPagination(state => ({
        ...state,
        page: state.page + 1,
      }));
  }, [page, setPagination, size, total]);

  const handleDecrement = useCallback(() => {
    if (page > 0)
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
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <PaginationLabel>Page {page + 1}</PaginationLabel>
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
