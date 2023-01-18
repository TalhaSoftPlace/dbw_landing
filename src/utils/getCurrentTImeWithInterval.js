import moment from 'moment';

export const getCurrentTImeWithInterval = (interval) => {
  const start = moment();
  const remainder = interval - (start.minute() % interval);
  return moment(start).add(remainder, 'minutes');
};
