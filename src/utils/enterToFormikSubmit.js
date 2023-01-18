export const enterToFormikSubmit = (handleSubmit) => {
  return (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
};
