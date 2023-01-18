import * as React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './SearchBar.style';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState } from 'recoil';
import { noteEventAtom } from '../../atoms';
import { useCallback } from 'react';
export const SearchBar = React.memo(({ placeholder }) => {
  const [{ searchTerm}, setEventState] = useRecoilState(
    noteEventAtom
  );

  const handleSearchTermChange = useCallback((e) => {
    setEventState((state) => ({ ...state, searchTerm: e.target.value }))
  }, [setEventState]);
  
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchTermChange}
          inputProps={{ 'aria-label': 'search' }}
          sx={{width:'100%'}}
        />
      </Search>
    </>
  );
});
