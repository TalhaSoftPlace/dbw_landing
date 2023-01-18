import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useAuth } from '../hooks';

const getPreviewInvoice = async (
  userName,
  priceList,
  subscriptionItemId,
  subscriptionId,
  quantity
) => {
  const response = await service.post(`/v1/checkout/previewInvoice`, {
    userName,
    priceList,
    subscriptionItemId,
    subscriptionId,
    quantity,
  });
  return response?.data;
};

export const usePreviewInvoice = ({
  priceList,
  subscriptionItemId,
  subscriptionId,
  quantity,
}) => {
  const { user: { userName } = {} } = useAuth();
  return useQuery(
    [
      queryKeys.PreviewInvoice,
      priceList,
      subscriptionItemId,
      subscriptionId,
      quantity,
    ],
    () =>
      getPreviewInvoice(
        userName,
        priceList,
        subscriptionItemId,
        subscriptionId,
        quantity
      ),
    {
      enabled: !!userName && (!!priceList || !!subscriptionId),
    }
  );
};
