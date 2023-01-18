import { atom } from 'recoil';
export const usersAtom = atom({
  key: 'usersAtom',
  default: {
    page: 0,
    size: 11,
    total: 0,
  },
});
