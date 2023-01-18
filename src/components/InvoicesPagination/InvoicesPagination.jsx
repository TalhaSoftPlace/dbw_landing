import React, { useCallback } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import { PaginationLabel, Wrapper } from './InvoicesPagination.style';
import { invoicesPaginationAtom } from '../../atoms';
import { useLocalization } from '../../hooks';
import { useRecoilState } from 'recoil';

export const InvoicesPagination = React.memo(({ invoiceList }) => {
  const { t } = useLocalization();
  const [{ page }, setPagination] = useRecoilState(invoicesPaginationAtom);
  const handleIncrement = useCallback(() => {
    const lastId = invoiceList[4]?.id;
    if (!!lastId)
      setPagination((state) => ({
        ...state,
        page: state.page + 1,
        lastId,
        firstId: undefined,
      }));
  }, [invoiceList, setPagination]);

  const handleDecrement = useCallback(() => {
    const first = invoiceList[0]?.id;
    if (page > 1)
      setPagination((state) => ({
        ...state,
        page: state.page - 1,
        lastId: undefined,
        firstId: first,
      }));
  }, [invoiceList, page, setPagination]);

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
            <IconButton
              disabled={page < 2}
              className="paginationbtn"
              onClick={handleDecrement}
            >
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
