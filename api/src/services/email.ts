// Provides email sending only service

import { EMAIL_SUBJECT_PREFIX } from '../constants';

export const sendEmail = async (
  emailTo: string,
  subject: string,
  message: string,
): Promise<void> => {
  const data = {
    API_KEY: process.env.GAPP_EMAIL_API_KEY,
    MAILTO: emailTo,
    SUBJECT: EMAIL_SUBJECT_PREFIX + ' ' + subject,
    MESSAGE: message,
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  const response = await fetch(process.env.GAPP_EMAIL_URL ?? '', fetchOptions);
  const body = await response.text();

  console.log(body);
};
