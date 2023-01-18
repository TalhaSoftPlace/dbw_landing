import { getCookie } from './cookies';

export const openMeeingFromMeetingId = ({ userName, meetingId }) => {
  const name = userName?.split('@')?.[0];
  const token = getCookie(process.env.REACT_APP_AUTH_COOKIE_NAME);
  const url = `https://meet.deepbluework.com/?room=${meetingId}&name=${name}&token=${token}`;
  window.open(url, '_blank', 'toolbar=no,width=1300,height=720');
};

export const getMeetingLink = ({ meetingId }) => {
  return `https://meet.deepbluework.com/?room=${meetingId}`;
};
