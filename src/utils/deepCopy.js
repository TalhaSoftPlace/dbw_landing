export const deepCopy = (obj1, obj2) => {
  const copied = {};
  Object.entries(obj1).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      if (!!obj2 && obj2[key]) {
        copied[key] = obj2[key];
      } else {
        copied[key] = value;
      }
    } else {
      if (!!obj2 && obj2[key]) {
        copied[key] = deepCopy(obj2[key]);
      } else {
        copied[key] = deepCopy(value);
      }
    }
  });
  return copied;
};
