import React from 'react';
import { ProfileGeneralForm } from '../../components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useGetUserSettings } from '../../queries';
import { useSnackbar } from 'notistack';
import { useUpdateUserSettings } from '../../mutations';

export const ProfileGeneralSettings = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: userSettings = {} } = useGetUserSettings();
  const { mutateAsync: updateUserSettings } = useUpdateUserSettings();

  const initialValues = {
    username: userSettings?.userName ?? '',
    firstName: userSettings?.firstName ?? '',
    timezone: userSettings?.timezone ?? '',
    orgUnitName: userSettings?.orgUnit?.name ?? '',
    lang: userSettings?.lang ?? '',
    country: userSettings?.country ?? '',
    skin: userSettings?.skin ?? '',
    signature: userSettings?.signature ?? '',
    autoReply: userSettings?.autoReply ?? '',
    autoReplyText: userSettings?.autoReplyText ?? '',
    autoReplyStartDate: userSettings?.autoReplyStartDate ?? '',
    autoReplyEndDate: userSettings?.autoReplyEndDate ?? '',
  };

  let validationSchema = yup.object({
    username: yup
      .string('Enter username')
      .trim()
      .required('Username is required.'),
  });

  const handleSubmit = values => {
    updateUserSettings({
      firstName: values.firstName,
      surname: values.surname,
      timezone: values.timezone,
      lang: values.lang,
      country: values.country,
      signature: values.signature,
      skin: values.skin,
      autoReply: values.autoReply,
      autoReplyText: values.autoReplyText,
      autoReplyStartDate: values.autoReplyStartDate,
      autoReplyEndDate: values.autoReplyEndDate,
    }).then(() => {
      enqueueSnackbar('user Settings Updated!', {
        variant: 'success',
      });
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {props => {
          return <ProfileGeneralForm {...props} />;
        }}
      </Formik>
    </>
  );
});
