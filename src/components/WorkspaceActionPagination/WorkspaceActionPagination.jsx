import React, { useCallback, useMemo } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { PaginationLabel , PaginationLabelpage } from './WorkspaceActionPagination.style';
import { emailPaginationAtom } from '../../atoms';
import { useRecoilState } from 'recoil';
import { useLocalization } from '../../hooks';

export const WorkspaceActionPagination = React.memo(() => {
  const { t } = useLocalization();
  const [{ pageNumber, pageSize, total }, setPagination] =
    useRecoilState(emailPaginationAtom);
  const pages = useMemo(
    () => [...Array.from(Array(Math.floor(total / pageSize) + 1).keys())],
    [pageSize, total]
  );
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

  const handleSizeChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (!isNaN(value)) {
        if (value % 5 === 0 && value >= 15) {
          setPagination((state) => ({ ...state, pageSize: value }));
        }
      }
    },
    [setPagination]
  );

  const handlePageChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (!isNaN(value)) {
        setPagination((state) => ({ ...state, pageNumber: value }));
      }
    },
    [setPagination]
  );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          gap: '0px',
        }}
      >
        <Box sx={{ flexGrow: 0, minWidth: '70px' }}>
          <PaginationLabel>
            Size
            <FormControl sx={{ margin: '0px 4px' }} variant="standard">
              <Select value={pageSize} onChange={handleSizeChange} >
                <MenuItem sx={{ height: 26 }} value={20}>
                  20
                </MenuItem>
                <MenuItem sx={{ height: 26 }} value={30}>
                  30
                </MenuItem>
                <MenuItem sx={{ height: 26 }} value={50}>
                  50
                </MenuItem>
              </Select>
            </FormControl>
          </PaginationLabel>
        </Box>
        <Box sx={{ flexGrow: 0, minWidth: '100px' }}>
          <PaginationLabelpage>
            Page
            <FormControl sx={{ margin: '0px 4px' }} variant="standard">
              <Select
                value={pageNumber}
                onChange={handlePageChange}
                MenuProps={{ classes: { paper: 'pagination-page' } }}
                
              >
                {pages.map((i , index) => (
                  <MenuItem key={index + i} sx={{ height: 26 }} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
           of {Math.floor(total / pageSize) + 1}
          </PaginationLabelpage>
        </Box>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          <Tooltip title={t.iconsToolTip.prev}>
            <IconButton
              sx={{ margin: 0, padding: 0 }}
              onClick={handleDecrement}
            >
              <ChevronLeftIcon sx={{ color: 'text.light' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t.iconsToolTip.next}>
            <IconButton
              sx={{ margin: 0, padding: 0 }}
              onClick={handleIncrement}
            >
              <ChevronRightIcon sx={{ color: 'text.light' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
});
