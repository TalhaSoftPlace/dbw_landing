import { useCallback } from 'react';
import { translations } from '../../constants/index';
import { setCookie } from '../../utils';
import { useRecoilState } from 'recoil';
import { localAtom } from './../../atoms/localAtom';
import { deepCopy } from '../../utils';
import { useQuery } from 'react-query';

export const useLocalization = () => {
  const [local, setLocalState] = useRecoilState(localAtom);

  const setLocal = useCallback(
    local => {
      setCookie('local', local);
      setLocalState(local);
    },
    [setLocalState]
  );

  const { data: t = translations['en-US'] } = useQuery(
    ['Localization', local],
    () => {
      return translations[local]
        ? deepCopy(translations['en-US'], translations[local])
        : translations['en-US'];
    },
    {
      staleTime: Infinity,
    }
  );

  return { t, local, setLocal };
};
