import * as b64 from 'base64-js';
import { gunzipSync } from 'fflate';

export const  bin2String= (array)=> {
  return new TextDecoder("utf-8").decode(array);
}

export const  decompressBody=(base64String) => {
  const bytes = b64.toByteArray(base64String);
  const decompressed = gunzipSync(bytes);
  return bin2String(decompressed);
}