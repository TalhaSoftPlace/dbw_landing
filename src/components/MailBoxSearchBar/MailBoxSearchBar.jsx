import React, { useState, useRef, useCallback  , useEffect} from 'react';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SearchResult,
  StyledListItem,
  SingleSearch,
  RightWrapper,
  CloseIconStyled
} from './MailBoxSearchBar.style';
import { Loading } from '../../components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { emailPaginationAtom, selectedEmailAtom } from '../../atoms';
import { useSearchEmails } from '../../queries';
import { Typography, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { emailDateFormat } from '../../utils';
export const MailBoxSearchBar = React.memo(() => {
  const [{ keyword, searchType }, setKeyword] = useRecoilState(
    emailPaginationAtom
  );
  const { data: searchedEmail } = useSearchEmails({
    keyword,
    searchType,
  });
  const searchref = useRef(null);
  const setSelectedEmail = useSetRecoilState(selectedEmailAtom);
  const [filterData, setFilterData] = useState('');
  const handleChange = React.useCallback(
    e => {
      const searchWord = e.target.value;
      setKeyword(state => ({
        ...state,
        keyword: searchWord,
        folder: 'INBOX',
      }));
      setFilterData(searchWord);
    },
    [setKeyword]
  );
  const onSelect = React.useCallback((email) => {
      setSelectedEmail(email);
      setFilterData('');
      setKeyword(state => ({
        ...state,
        keyword: '',
      }));
    },
    [setKeyword, setSelectedEmail]
  );

  const handleCloseSearch = useCallback((e)=>{
    setFilterData('');
    setKeyword(state => ({
      ...state,
      keyword: '',
    }));
  },[setKeyword]);
 
useEffect(()=>{
  document.addEventListener('click', handleCloseSearch);
} , [handleCloseSearch]);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search"
          name="search"
          value={filterData}
          autoComplete="off"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
        />
        {!!filterData && (
          <CloseIconStyled onClick={handleCloseSearch} />
        )}
       
      </Search>
      {!!filterData && (
        <SearchResult ref={searchref}>
          {!searchedEmail ? (
            <>
              <Box sx={{ height: '100px' }}>
                <Loading/>
              </Box>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                Searching ...
              </Box>
            </>
          ) : (
            <Box className="emailbox">
              {searchedEmail?.emails.map((value, idx) => {
                return (
                  <SingleSearch
                    key={value + idx}
                    onClick={() => onSelect(value)}
                  >
                    <StyledListItem
                      sx={{ margin: 0 }}
                      secondary={
                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            paddingRight: '25px',
                            lineHeight: '1',
                            verticalAlign: 'middle',
                          }}
                          className="searchitem"
                        >
                          <Typography
                            color={'inherit'}
                            component="span"
                            variant="inherit"
                            className="email-subject"
                          >
                            {value.senderPersonal ??
                              value.address ??
                              value.sender}
                          </Typography>
                          <Typography
                            color={'inherit'}
                            variant="inherit"
                            className="subject"
                            sx={{
                              width: '100%',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {value.subject}
                          </Typography>
                        </Typography>
                      }
                    />
                    <RightWrapper>
                      <Box
                        color={'inherit'}
                        variant="inherit"
                        sx={{ display: 'inline-block', fontSize: '12px' }}
                      >
                        {emailDateFormat(value.sentDate)}
                      </Box>
                    </RightWrapper>
                  </SingleSearch>
                );
              })}
            </Box>
          )}
          <Box sx={{ textAlign: 'center', pb: '5px' }}>
            {!!searchedEmail?.size >= 1 ? (
              <>We found {searchedEmail?.size} results.</>
            ) : (
              <></>
            )}
          </Box>
        </SearchResult>
      )}
    </>
  );
});
