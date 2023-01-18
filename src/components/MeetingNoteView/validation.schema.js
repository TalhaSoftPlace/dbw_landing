import * as Yup from 'yup';
export const noteSchema = Yup.object().shape({
  meetingItems: Yup.array()
    .of(
      Yup.object().shape({
        note: Yup.string().required('Please fill all note discriptions'),
      })
    )
    .min(1, 'Please add at least 1 note item'),
});
