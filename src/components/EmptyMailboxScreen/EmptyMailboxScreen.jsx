import React, { useMemo } from 'react';
import {
  Wrapper,
  Title,
  SubHeading,
  BgWrapper,
} from './EmptyMailboxScreen.style';
import { useLocalization } from '../../hooks';
import { useRecoilValue } from 'recoil';
import { emailPaginationAtom } from '../../atoms';

export const EmptyMailboxScreen = React.memo(() => {
  const { t } = useLocalization();

  const { folder, total } = useRecoilValue(emailPaginationAtom);
  const folderName = useMemo(
    () => (folder === 'DELETE' ? 'TRASH' : folder),
    [folder]
  );
  return (
    <Wrapper
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      <BgWrapper>
        <SubHeading>
        {!!folderName.startsWith('user-folders')
                    ? folderName.split('.')?.[1]
                    : folderName}
        </SubHeading>
        <Title>
          {t.EmptyMail.title}
          <b>{total}</b>
          <b>{t.EmptyMail.title2}</b>
          {t.EmptyMail.title3}
        </Title>
      </BgWrapper>
    </Wrapper>
  );
});
