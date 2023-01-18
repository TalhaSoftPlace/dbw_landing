import { useMutation } from 'react-query';
import { useAuth } from '../hooks';
import { service } from '../services';

export const useCreateNewMeeting = () => {
  const { user: { userName } = {} } = useAuth();
  return useMutation(
    async ({ eventId = '', notes = '', attendees = '' } = {}) => {
      if (!userName) {
        Promise.reject('Invalid Request');
      }
      const randomId = (Date.now() + Math.random())
        .toString(32)
        .substring(3)
        .split('.')
        .join('')
        .match(/.{1,3}/g)
        .join('-');
      await service.post(`/v1/user/calendar/meeting`, {
        organizer: userName,
        meetingId: randomId,
        meetingLink: `https://meet.deepbluework.com/?room=${randomId}`,
        meetingName: randomId,
        eventId,
        startDateTime: '',
        attendees,
        notes,
      });
      return randomId;
    }
  );
};
