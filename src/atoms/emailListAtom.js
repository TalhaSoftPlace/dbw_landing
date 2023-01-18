import { atom } from 'recoil';

export const emailListAtom = atom({
  key: 'emailListAtom',
  default: {
    email:'' ,
  },
});