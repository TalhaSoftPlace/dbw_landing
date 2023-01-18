import { atom } from 'recoil';
import { getBrowserLnaguage, getCookie } from '../utils';

export const localAtom = atom({
  key: 'local',
  default: getCookie('local') || getBrowserLnaguage(),
  value: 'dbw123'
});
