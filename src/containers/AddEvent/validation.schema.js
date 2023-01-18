import * as Yup from 'yup';
export const addCalendarEventSchema = Yup.object().shape({
  title: Yup.string()
  .required('Title is required.')
  .max(250, 'Please write maximum 250 characters in Title field'),
  attendees: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid Attendee'),
    })
  ),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Please add at least 1 tag'),
  startDateTime: Yup.date(),
  endDateTime: Yup.date().min(
    Yup.ref('startDateTime'),
    'End date time has to be greater than start date'
  ),
});
