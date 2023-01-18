import React, { useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { PaginationLabel, PaginationBox } from './EmailMobilePagination.style';
import { emailPaginationAtom } from '../../atoms';
import { useRecoilState } from 'recoil';
import { useLocalization } from '../../hooks';

export const EmailMobilePagination = React.memo(() => {
  const { t } = useLocalization();
  const [{ pageNumber, pageSize, total }, setPagination] =
    useRecoilState(emailPaginationAtom);
  const handleIncrement = useCallback(() => {
    if (pageNumber * pageSize < total)
      setPagination((state) => ({
        ...state,
        pageNumber: state.pageNumber + 1,
      }));
  }, [pageNumber, pageSize, setPagination, total]);

  const handleDecrement = useCallback(() => {
    if (pageNumber > 1)
      setPagination((state) => ({
        ...state,
        pageNumber: state.pageNumber - 1,
      }));
  }, [pageNumber, setPagination]);

  return (
    <>
      <PaginationBox
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <PaginationLabel>Page Number {pageNumber} </PaginationLabel>
        </Box>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          <Tooltip title={t.iconsToolTip.prev}>
            <IconButton onClick={handleDecrement}>
              <ChevronLeftIcon sx={{ color: 'text.light' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t.iconsToolTip.next}>
            <IconButton onClick={handleIncrement}>
              <ChevronRightIcon sx={{ color: 'text.light' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </PaginationBox>
    </>
  );
});
