import { API_BASE_URL, API_STATIC_KEY } from '@/constants'
import { jsonPost, ApiResponse, ApiStatus } from '@/services/apiclient'
import { localStringGet, localStringSet } from './local-store';

export const KEY_JWT_TOKEN = 'JWT_TOKEN';
export const KEY_REFRESH_TOKEN = 'REFRESH_TOKEN';

// retrieves updated refresh token and saves to local storage
// returns the token if successful or empty string if failed
const refreshToken = async (): Promise<string> => {
  const currentRefreshToken = await localStringGet(KEY_REFRESH_TOKEN);
  if (!currentRefreshToken) return '';

  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-api-key': API_STATIC_KEY }

  const payload = { authRefresh: { refreshToken: currentRefreshToken } }

  const apiResponse = await jsonPost(`${API_BASE_URL}/jsonql`,
    { headers, body: JSON.stringify(payload) })

  if (apiResponse.status !== ApiStatus.OK || apiResponse.result === null) return '';

  // @ts-ignore
  const authRefreshResult = apiResponse.result['authRefresh'];
  if (typeof authRefreshResult === 'object' && authRefreshResult.token) {
    // TODO - to store somewhere else
    await localStringSet(KEY_JWT_TOKEN, authRefreshResult.token);

    if (authRefreshResult.refreshToken !== currentRefreshToken) {
      await localStringSet(KEY_REFRESH_TOKEN, authRefreshResult.refreshToken);
    }

    return authRefreshResult.token;
  }

  return '';
}


export const apiPost = async (
  url: string,
  data: object,
  allowRefresh: boolean = true,
): Promise<ApiResponse> => {
  const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'x-api-key': API_STATIC_KEY,
    'Authorization': '',
  }

  // if a refresh token exists we must be in a logged in state
  const currentRefreshToken = await localStringGet(KEY_REFRESH_TOKEN);
  if (currentRefreshToken) {
    // TODO: to get somewhere else
    const jwtToken = await localStringGet(KEY_JWT_TOKEN);
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  const apiResponse = await jsonPost(`${API_BASE_URL}${url}`, {
    headers,
    body: JSON.stringify(data),
  })

  if (apiResponse.status === ApiStatus.OK) return apiResponse

  // handle other situations
  if (apiResponse.status === ApiStatus.EXPIRED) {
    if (!allowRefresh) return { status: ApiStatus.EXPIRED, result: 'session expired' };
    // JWT access token has expired.  renew token and try API call again
    const newToken = await refreshToken();
    if (newToken) return apiPost(url, data, false);
  }

  // For erros, maybe just flash a message on the screen
  if (apiResponse.status === ApiStatus.NO_NETWORK) {
    return { status: apiResponse.status, result: 'No network connectivity' }
  }

  // all other situations, show generic message
  return { status: apiResponse.status, result: 'Could not connect to server' }
}