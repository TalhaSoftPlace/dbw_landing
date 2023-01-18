import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { CompanySettingForm, LoadingOverlay } from '../../components';
import * as yup from 'yup';
import { useGetCompantSettings, useGetCompanyLogo } from '../../queries';
import {
  useAddCompanySettings,
  useUpdateCompanySettings,
} from '../../mutations';
import { useSnackbar } from 'notistack';
import { validImageBase64 } from '../../utils';

export const CompanySetting = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: companySettings = {},
    isLoading: isGettingSettings,
  } = useGetCompantSettings();
  const {
    data: companyLogo = null,
    isLoading: isGettingCompanyLogo,
  } = useGetCompanyLogo();
  const {
    mutateAsync: addCompanySettings,
    isLoading: isCreating,
  } = useAddCompanySettings();
  const {
    mutateAsync: updateCompanySettings,
    isLoading: isUpdating,
  } = useUpdateCompanySettings();

  const initialValues = useMemo(
    () => ({
      id: companySettings?.id ?? null,
      logo: companyLogo ?? null,
      companyName: companySettings?.companyName ?? '',
      facebook: companySettings?.facebook ?? '',
      instagram: companySettings?.instagram ?? '',
      linkedin: companySettings?.linkedin ?? '',
      twitter: companySettings?.twitter ?? '',
      disclaimer: companySettings?.disclaimer ?? '',
    }),
    [companySettings, companyLogo]
  );
  let validationSchema = yup.object({
    companyName: yup
      .string('Enter Company name.')
      .trim()
      .required('Company name is required.'),
  });

  const handleSubmit = React.useCallback(
    ({
      logo,
      companyName,
      facebook,
      instagram,
      linkedin,
      twitter,
      disclaimer,
    }) => {
      if (logo && validImageBase64(logo)) {
        logo = logo.split(',')[1];
      }
      if (initialValues.id) {
        updateCompanySettings({
          logo,
          companyName,
          facebook,
          linkedin,
          twitter,
          instagram,
          disclaimer,
        }).then(() => {
          enqueueSnackbar('Company Settings Updated!', {
            variant: 'success',
          });
        });
      } else {
        addCompanySettings({
          logo,
          companyName,
          facebook,
          linkedin,
          twitter,
          instagram,
          disclaimer,
        }).then(() => {
          enqueueSnackbar('Company Settings Added!', {
            variant: 'success',
          });
        });
      }
    },
    [
      addCompanySettings,
      updateCompanySettings,
      initialValues.id,
      enqueueSnackbar,
    ]
  );

  return (
    <>
      {(isCreating ||
        isUpdating ||
        isGettingCompanyLogo ||
        isGettingSettings) && <LoadingOverlay />}
      <Formik
        initialValues={initialValues}
        validateOnMount
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {props => {
          return <CompanySettingForm {...props} />;
        }}
      </Formik>
    </>
  );
});
