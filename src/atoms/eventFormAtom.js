import { atom } from 'recoil';
import { getCurrentTImeWithInterval } from '../utils';

export const eventFormAtom = atom({
  key: 'eventFormAtom',
  default: {
    open: false,
    startDate: getCurrentTImeWithInterval(30),
    eventData: undefined,
  },
});
