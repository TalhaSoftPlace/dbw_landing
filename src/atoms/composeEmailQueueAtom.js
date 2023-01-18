import { atom } from 'recoil';

export const composeEmailQueueAtom = atom({
  key: 'composeEmailQueue',
  default: [],
});
