import moment from 'moment';

export const groupEmailListByMonth = (emails) => {
  let grouped = {};
  emails?.forEach((email) => {
    const month = moment(email.sentDate).format('MMMM');
    if (!grouped[month]?.length) {
      grouped[month] = [];
    }
    grouped[month] = [...grouped[month], email];
  });
  return grouped;
};
