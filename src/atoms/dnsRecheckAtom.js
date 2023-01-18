import { atom } from 'recoil';

export const dnsRecheckAtom = atom({
  key: 'dnsRecheck',
  default: { checking: false, count: 0 },
});
