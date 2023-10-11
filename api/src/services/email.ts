// Provides email sending only service

import { EMAIL_SUBJECT_PREFIX } from '../constants';
import { JSON_parse, JSON_stringify } from '../utils/misc';

export const sendEmail = async (
  emailTo: string,
  subject: string,
  message: string,
): Promise<boolean> => {
  const data = {
    API_KEY: process.env.GAPP_EMAIL_API_KEY,
    MAILTO: emailTo,
    SUBJECT: EMAIL_SUBJECT_PREFIX + ' ' + subject,
    MESSAGE: message,
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON_stringify(data),
  };
  const response = await fetch(process.env.GAPP_EMAIL_URL ?? '', fetchOptions);
  const body = await response.text();
  let result = null
  result = JSON_parse(body)

  return result?.success ?? false;
};
