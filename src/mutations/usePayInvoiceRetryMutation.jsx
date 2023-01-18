import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../constants';
import { service } from '../services';
import { useSnackbar } from 'notistack';

export const usePayInvoiceRetryMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ cardId, invoiceId }) => {
      const response = await service.post(`/v1/checkout/payInvoice`, {
        cardId,
        invoiceId,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Invoice Paid successfully', { variant: 'success' });
        queryClient.refetchQueries([queryKeys.Invoices]);
      },
    }
  );
};
