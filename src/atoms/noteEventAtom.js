import { atom } from 'recoil';
export const noteEventAtom = atom({
  key: 'noteEventAtom',
  default: {
    date: undefined,
    selectedCalendarEventId: undefined,
    tagName: 'all',
    page: 0,
    size: 11,
    total: 0,
    searchTerm: '',
  },
});
