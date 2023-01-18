import { atom } from 'recoil';
export const userWorkflowAtom = atom({
  key: 'userWorkflowAtom',
  default: {
    status: 'all',
  },
});
