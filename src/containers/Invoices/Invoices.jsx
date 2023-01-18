import React, { useCallback, useMemo } from 'react';
import { Typography, useTheme, Grid, Box } from '@mui/material';
import {
  ContentSection,
  DBWTable,
  ContextMenu,
  Loading,
  JsxToPDF,
} from '../../components';
import { useLocalization } from '../../hooks';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyledSpan, Wrapper, Wrappermodal } from './Invoices.styles';
import { PayInvoiceDialog } from '../PayInvoiceDialog';
import { useInvoices } from '../../queries';
import { Logo } from '../../components';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import { InvoicesPagination } from '../../components/InvoicesPagination/InvoicesPagination';
import { useRecoilValue } from 'recoil';
import { invoicesPaginationAtom } from '../../atoms';

export const Invoices = React.memo(() => {
  const { lastId, firstId } = useRecoilValue(invoicesPaginationAtom);
  const { t } = useLocalization();
  const muiTheme = useTheme();
  const { data: invoiceList = [], isLoading } = useInvoices({
    startingAfter: lastId,
    endingBefore: firstId,
  });
  const [selectedInvoice, setSelectedInvoice] = React.useState(null);
  const [viewInvoice, setViewInvoice] = React.useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const InvoiceData = useMemo(() => {
    return invoiceList?.invoices;
  }, [invoiceList?.invoices]);
  const handleOpen = useCallback(row => {
    setViewInvoice(row);
  }, []);

  const handleClose = useCallback(row => {
    setViewInvoice(undefined);
  }, []);
  const handlePay = useCallback(invoice => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  }, []);
  const viewDate = useMemo(() => {
    return moment(viewInvoice?.createdAt).format('MMM-DD-YYYY');
  }, [viewInvoice?.createdAt]);

  const generateRowContent = useCallback(
    row => {
      const formatDate = moment(row.createdAt).format('MMM-DD-YYYY');
      const payItem = {
        name: (
          <>
            {t.container.inVoices.pay} <LaunchIcon sx={{ marginLeft: 1 }} fontSize="small" />
          </>
        ),
        onClick: () => handlePay(row.id),
      };
      const menuItems = [
        { name: 'View', onClick: () => handleOpen(row) },
        { name: 'Print' },
      ];
      return {
        amount: (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {row.totalAmount}
          </StyledSpan>
        ),
        status: <StyledSpan>{row.status}</StyledSpan>,
        date: (
          <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {formatDate}
          </StyledSpan>
        ),
        action: (
          <ContextMenu
            menuItems={
              row.status === 'open' ? [...menuItems, payItem] : menuItems
            }
            anchorOrigin="left"
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="1"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </ContextMenu>
        ),
      };
    },
    [handleOpen, handlePay, t]
  );

  const generateHeader = useCallback(() => {
    return {
      amount: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {t.container.inVoices.amt}
        </StyledSpan>
      ),
      status: <StyledSpan>STATUS</StyledSpan>,
      date: (
        <StyledSpan sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {t.container.inVoices.date}
        </StyledSpan>
      ),
      action: <StyledSpan>{t.container.inVoices.action}</StyledSpan>,
    };
  }, [t]);

  return (
    <Wrapper>
      <Modal open={!!viewInvoice} onClose={handleClose}>
        <Wrappermodal>
          <Box sx={{width:'790px' , overflow:'atuo'}}>
              <JsxToPDF invoiceDate={viewDate}>
            <Grid container className="invoice-view" spacing={2}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontWeight: '700',
                }}
              >
                <Logo
                  color="text.blueLight"
                  widht="300px"
                  height="55px"
                  variant="dark"
                />
                <Typography
                  variant="h4"
                  className="invoice-data"
                  sx={{ lineHeight: 1 }}
                >
                  {t.container.inVoices.involice}
                </Typography>
              </Box>
              <Grid
                item
                md={12}
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontWeight: '700',
                  pr: 0,
                }}
                className="invoice-table"
              >
                <Grid item md={6}>
                {t.container.inVoices.invoiceTo}
                </Grid>
                <Grid item md={3}>
                {t.container.inVoices.invoiceDate}
                </Grid>
                <Grid item md={3}>
                {t.container.inVoices.invoiceDueDate}
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontWeight: '700',
                }}
              >
                <Grid item md={6}>
                  {invoiceList?.customer_name} <br /> {invoiceList?.city}{' '}
                  {invoiceList?.state} {invoiceList?.postal_code},
                  {invoiceList?.country}.
                </Grid>
                <Grid item md={3}>
                  {viewDate}
                </Grid>
                <Grid item md={3}>
                  {viewDate}
                </Grid>
              </Grid>
              <Grid item md={6} sx={{ pb: 6 }}>
                Invoice # {viewInvoice?.invoiceNumber}
              </Grid>

              <Box
                sx={{ p: '5px;', width: '100%' }}
                className="invoice-tableBox"
              >
                <Box
                  container
                  md={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingInline: '20px',
                    width: '94%',
                    fontWeight: '700',
                  }}
                  className="invoice-table"
                >
                  <Box sx={{width:'80px'}}>Items </Box>
                  <Box sx={{width:'230px'}}> {t.container.inVoices.invoiceDesc} </Box>
                  <Box sx={{width:'50px'}}> {t.container.inVoices.invoiceQty}</Box>
                  <Box sx={{width:'80px'}}> {t.container.inVoices.invoiceUnitPrice} </Box>
                  <Box sx={{width:'80px'}}> {t.container.inVoices.invoiceTotal} </Box>
                </Box>
                
                {viewInvoice?.items?.map(item => (
                  <Box
                    container
                    md={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingInline: '20px',
                      width: '94%',
                      pt: 1,
                    }}
                  >
                    
                    <Box sx={{width:'80px'}}>
                      {item?.item}
                    </Box>
                    <Box sx={{width:'230px'}} > {item?.description} </Box>
                   
                    <Box sx={{width:'50px'}}>
                      {item?.quantity}
                    </Box>
                    <Box  sx={{width:'80px'}}>
                      $ 3
                    </Box>
                    <Box sx={{width:'80px'}}>
                      $ {item?.amount}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  pt: 2,
                  pb: 7,
                }}
              >
                <Box className="invoiceTotal">
                  <Box
                    className="invoice-datatotal"
                    sx={{ width: '100%', pb: 10 }}
                  >
                    <Box>Total :</Box>
                    <Box>$ {viewInvoice?.totalAmount}</Box>
                  </Box>
                  <Box
                    className="invoice-datatotal"
                    sx={{ width: '100%', pb: 10 }}
                  >
                    <span className="invoice-data-heading">Tax :</span>${' '}
                    {viewInvoice?.taxAmount ? viewInvoice?.taxAmount : '0'}
                  </Box>
                  <Box className="invoice-data" sx={{ width: '100%', pb: 10 }}>
                    <span className="invoice-data-heading">
                      {' '}
                      {t.container.inVoices.invoicerandTotal} :{' '}
                    </span>
                    $ {(viewInvoice?.totalAmount + viewInvoice?.taxAmount).toFixed(2)}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ pt: 7, textAlign: 'center', width: '100%' }}>
              {t.container.inVoices.ofcAddress}
              </Box>
            </Grid>
          </JsxToPDF>
            </Box>
        </Wrappermodal>
      </Modal>

      <ContentSection
        heading={t.InvoicesPage.title}
        subHeading={t.InvoicesPage.subHeading}
      >
        <Box sx={{ mb: 1 }} />
        {isLoading ? (
          <Loading />
        ) : (
          <DBWTable
            generateHeader={generateHeader}
            generateRowContent={generateRowContent}
            data={InvoiceData}
            headingBackground={muiTheme.palette.background.dark}
            itemBackground={muiTheme.palette.background.tableitembg}
            headingColor={muiTheme.palette.text.grey}
            itemColor={muiTheme.palette.text.grey}
            padding={20}
          />
        )}
        <InvoicesPagination invoiceList={InvoiceData} />
      </ContentSection>

      <PayInvoiceDialog
        selectedInvoice={selectedInvoice}
        setClose={setOpenDialog}
        open={openDialog}
      />
    </Wrapper>
  );
});
