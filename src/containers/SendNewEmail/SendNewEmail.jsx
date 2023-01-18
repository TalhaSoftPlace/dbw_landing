import React, { useCallback, useMemo } from 'react';
import { StyledStack } from './SendNewEmail.styles';
import { MessageBox } from '../MessageBox';
import { useRecoilState } from 'recoil';
import { composeEmailQueueAtom } from '../../atoms';

export const SendNewEmail = React.memo(() => {
  const [composeEmailsQueue, setComposeEmailsQueue] = useRecoilState(
    composeEmailQueueAtom
  );

  const handleClose = useCallback(
    id => {
      setComposeEmailsQueue(queue => queue.filter(i => i.id !== id));
    },
    [setComposeEmailsQueue]
  );
  const composeBoxes = useMemo(
    () =>
      composeEmailsQueue.map((composeData, idx) => (
        <MessageBox
          key={composeData.id}
          composeData={composeData}
          onCancel={handleClose}
        />
      )),
    [composeEmailsQueue, handleClose]
  );
  return (
    <>
      <StyledStack direction="row-reverse" spacing={2}>
        {composeBoxes}
      </StyledStack>
    </>
  );
});
