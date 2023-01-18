import { atom } from 'recoil';

export const calenderAtom = atom({
  key: 'calenderAtom',
  default: {
    date: new Date(),
    view: 'month',
    tag: 'all',
    startDate: '',
  },
});
