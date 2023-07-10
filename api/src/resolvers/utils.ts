import { sleep } from "../utils/misc";

async function getTime(input: Object, rc: ResolverContext) {
  return { result: new Date().toISOString() };
}

async function getVersion(input: Object, rc: ResolverContext) {
  await sleep(0);
  return { result: "0.1" };
}

export { getTime, getVersion };
