import { sleep } from '../utils/misc';

const getTime = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  return { result: new Date().toISOString() };
};

const getVersion = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  await sleep(0);
  return { result: '0.1' };
};

export { getTime, getVersion };
