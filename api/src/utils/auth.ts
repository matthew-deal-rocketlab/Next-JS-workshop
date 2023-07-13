import crypto from 'crypto';

import { APP_SECRET, JWT_SECRET } from '../constants';
import { btoa, uuidv4 } from './misc';

export const hashPassword = (pass: string, salt: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(salt + pass + APP_SECRET);
  const sha256Hash = hash.digest('hex');
  return sha256Hash;
};

export const generateJWT = (payload: object, secret: string): string => {
  // Create the header and payload
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // Create the signature
  const signatureInput = encodedHeader + '.' + encodedPayload;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64');

  // Create the JWT
  const jwt = signatureInput + '.' + btoa(signature);
  return jwt;
};

export const getUserJWT = (userID: string): string => {
  var payload = {
    sub: userID,
    iat: Math.floor(Date.now() / 1000),
  };

  return generateJWT(payload, JWT_SECRET);
};

export const getUserRefreshToken = (userID: string) => {
  var payload = {
    sub: userID,
    rando: uuidv4(false),
    iat: Math.floor(Date.now() / 1000),
  };

  return generateJWT(payload, JWT_SECRET);
};
