export const localStoreGet = async (key: string): Promise<string | null> => {
  return localStorage.getItem(key);
}

export const localStoreSet = async (key: string, value: string) => {
  localStorage.setItem(key, value);
}

export const localStoreRemove = async (key: string) => {
  localStorage.removeItem(key);
}

export const localStoreClear = async () => {
  localStorage.clear();
}
