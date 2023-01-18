export const isHTML = (string) => {
  const str = string.trim();
  return (
    str?.startsWith('<!DOCTYPE html>') ||
    str?.startsWith('<html') ||
    (str?.startsWith('<') && str?.endsWith('>')) ||
    str?.endsWith('</html>')
  );
};
