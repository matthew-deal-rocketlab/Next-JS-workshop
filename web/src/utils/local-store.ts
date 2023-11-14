import { localStoreGet, localStoreSet } from "@/services/local-storage";

export const localStringGet = async (key: string): Promise<string | null> => {
  return await localStoreGet(key);
}

export const localStringSet = async (key: string, value: string) => {
  return await localStoreSet(key, value);
}

export const localIntGet = async (key: string): Promise<number> => {
  const result = await localStoreGet(key);
  if (result === null) return NaN;
  return parseInt(result);
}

export const localIntSet = async (key: string, value: number) => {
  return await localStoreSet(key, value.toString());
}

export const localStoreRemove = async (key: string) => {
  await localStoreRemove(key);
}

export const localStoreClear = async () => {
  await localStoreClear();
}