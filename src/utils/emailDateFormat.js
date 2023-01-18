import moment from 'moment';

export const emailDateFormat = (dateTime) => {
  if (!dateTime) {
    return '--';
  }
  const momentDateTime = moment(dateTime);
  const date = moment(moment(dateTime).format('YYYY-MM-DD'));
  const dateToday = moment(moment().format('YYYY-MM-DD'));
  const diff = dateToday.diff(date, 'days');
  if (diff < 1) {
    return momentDateTime.format('h:mm a');
  } else if (diff === 1) {
    return `Yesterday ${momentDateTime.format('h:mm a')}`;
  } else if (diff > 1 && diff < 8) {
    return `${momentDateTime.format('dddd')} ${momentDateTime.format(
      'h:mm a'
    )}`;
  } else if (diff >= 8) {
    return momentDateTime.format('DD MMM, h:mm a');
  }
};
