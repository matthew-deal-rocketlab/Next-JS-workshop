import { webcrypto } from 'crypto';

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const uuidv4 = (includeDashes: boolean = true) => {
  // @ts-expect-error
  const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: number) => {
      const randomByte =
        // @ts-expect-error
        webcrypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4));
      return (c ^ randomByte).toString(16);
    },
  );

  return includeDashes ? uuid : uuid.replaceAll('-', '');
};
