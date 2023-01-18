export const getErrorsArrayfromFormikErrors = (errors) => {
  let errorsStringArray = [];
  Object.values(errors).forEach((error) => {
    if (typeof error === 'string') {
      errorsStringArray.push(error);
    } else {
      errorsStringArray = [
        ...errorsStringArray,
        ...getErrorsArrayfromFormikErrors(error),
      ];
    }
  });
  return errorsStringArray;
};
