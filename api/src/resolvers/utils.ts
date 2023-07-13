import { sleep } from '../utils/misc';

const getTime = async (input: JsonQLInput, rc: ResolverContext) => {
  return { result: new Date().toISOString() };
};

const getVersion = async (input: JsonQLInput, rc: ResolverContext) => {
  await sleep(0);
  return { result: '0.1' };
};

export { getTime, getVersion };
