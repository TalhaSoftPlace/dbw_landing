import { atom } from 'recoil';

export const invoicesPaginationAtom = atom({
  key: 'invoicesPagination',
  default: {
    page: 1,
    lastId: undefined,
    firstId: undefined,
    unpaidInvoice:true,
  },
});
