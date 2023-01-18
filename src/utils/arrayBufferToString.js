export const arrayBufferToString = (buf) => {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(new Uint8Array(buf));
};
