import { atom } from 'recoil';

export const emailPaginationAtom = atom({
  key: 'emailPaginationAtom',
  default: {
    total: 0,
    folder: 'INBOX',
    pageNumber: 1,
    pageSize: 50,
    keyword: '',
    searchType: 'subject',
    flag: '',
    allchildren: [],
    fromUid: undefined,
  },
});
