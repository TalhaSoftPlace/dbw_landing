import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { CreateFolderForm } from './CreateFolderForm';
import { Wrapper } from './CreateEmailFolder.styles';
import { useCreateEmailFolderMutation } from '../../mutations';
import { createFoldervalidation } from './validation.schema';
export const CreateEmailFolder = React.memo(({ closeDialog }) => {
  const { mutateAsync: createFolder, isLoading } =
    useCreateEmailFolderMutation();

  const initialValues = useMemo(
    () => ({
      foldername: '',
    }),
    []
  );
  const handleSubmit = React.useCallback(
    (values) => {
      createFolder({
        folderName: values.foldername,
      }).then(() => {
        closeDialog();
      });
    },
    [createFolder, closeDialog]
  );

  return (
    <div>
      <Wrapper>
        <Formik
          initialValues={initialValues}
          validateOnMount
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={createFoldervalidation}
        >
          {(props) => {
            return <CreateFolderForm {...props} isLoading={isLoading} />;
          }}
        </Formik>
      </Wrapper>
    </div>
  );
});
