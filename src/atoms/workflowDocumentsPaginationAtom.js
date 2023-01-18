import { atom } from 'recoil';

export const workflowDocumentsPaginationAtom = atom({
  key: 'workflowDocumentsPagination',
  default: {
    page: 1,
    total: 0,
    totalPage:0,
  },
});
