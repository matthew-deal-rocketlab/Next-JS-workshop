export const isEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

// TODO: double check this regex for URL
export const isUrl = (url: string): boolean => {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:\d{1,5})?([\/?].*)?$/;
  return regex.test(url);
}