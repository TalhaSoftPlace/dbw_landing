import { atom } from 'recoil';
import { getCookie } from '../utils';

export const cookiesApprovalAtom = atom({
  key: 'cookiesApprovalAtom',
  default: {
    isPopup: getCookie('cookieeApproval') === 'true' ? false : true,
  },
});
