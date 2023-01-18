
import { atom } from 'recoil';
export const invitationCodeAtom = atom({
  key: 'invitationCodeAtom',
  default: {
    inputvalue: '',
    invitationcode:false,
  },
});