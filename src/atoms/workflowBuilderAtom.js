import { atom } from 'recoil';

export const workflowBuilderAtom = atom({
  key: 'workflowBuilder',
  default: {
    workflow: undefined,
    json: { schema: {}, uischema: {} },
    selectedUsers: [],
    firstApprovals: [],
    secondApprovals: [],
    thirdApprovals: [],
    selectedfields: [],
  },
});
