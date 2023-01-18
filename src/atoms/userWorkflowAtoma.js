import { atom } from 'recoil';

export const workflowPaginationAtom = atom({
  key: 'workflowPagination',
  default: {
    page: 0,
    total: 0,
  },
});
