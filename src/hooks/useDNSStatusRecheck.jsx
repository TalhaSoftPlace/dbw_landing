import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const useDNSStatusRecheck = ({
  recheckStatus,
  setRecheckStatus,
  completed,
  reCheck,
  retry = 5,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (completed) {
      setRecheckStatus({ checking: false, count: 0 });
    }
  }, [setRecheckStatus, completed]);

  useEffect(() => {
    if (recheckStatus?.checking) {
      const interval = setInterval(() => {
        if (!completed) {
          if (recheckStatus.count < retry) {
            setRecheckStatus((status) => ({
              ...status,
              count: status.count + 1,
            }));
            reCheck();
          } else {
            setRecheckStatus({ checking: false, count: 0 });
            clearInterval(interval);
            enqueueSnackbar(
              'We are not able verify the status plase try again after a while',
              {
                variant: 'error',
              }
            );
          }
        } else {
          clearInterval(interval);
        }
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [
    completed,
    enqueueSnackbar,
    reCheck,
    recheckStatus,
    retry,
    setRecheckStatus,
  ]);
};
