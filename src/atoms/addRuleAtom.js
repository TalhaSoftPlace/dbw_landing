import { atom } from 'recoil';

export const addRuleAtom = atom({
  key: 'addRuleAtom',
  default: {
    rule: undefined,
  },
});
