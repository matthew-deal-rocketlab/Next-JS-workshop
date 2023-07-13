export const JWT_SECRET =
  process.env.JWT_SECRET || '1fef2b04-ce17-4365-bfa4-0394c7441dfd';

export const SALT_PASS_SEPARATOR = '~';

export enum UserStatus {
  Pending = 'P',
  Verified = 'V',
  Blocked = 'B',
  Deleted = 'D',
}

// a prefix on all transactional emails so that user can easily apply mailbox rules
export const EMAIL_SUBJECT_PREFIX = '[rlwm]';

export const APP_SECRET =
  process.env.APP_SECRET || 'e2b56457-9301-4724-aeb5-72fd8b3b315a';
export const API_PREFIX = '/api';
export const API_KEY = 'c37861c7-7414-4a40-bbd8-3343662e4483';
export const API_HEADER = 'x-api-key';

export const RESULT_OK = { result: 'ok' };
export const ERROR_NO_DB = { error: 'no database connection' };
export const ERROR_INVALID_CREDENTIALS = { error: 'invalid credentials' };
