import { atom } from 'recoil';

export const workflowPaginationAtom = atom({
  key: 'workflowPagination',
  default: {
    page: 1,
    total: 0,
  },
});
