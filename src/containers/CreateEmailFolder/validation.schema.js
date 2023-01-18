import * as Yup from 'yup';
export const createFoldervalidation = Yup.object().shape({
  foldername:Yup.string()
  .min(2, 'Folder Name too short!')
  .max(12, 'Folder Name too  long!')
  .matches(
    /^[a-zA-Z0-9]+$/,
    'Only letters and numbers allowed. No special characters or spaces should be allowed.'
  )
  .required('Folder Name is required!'),
});
