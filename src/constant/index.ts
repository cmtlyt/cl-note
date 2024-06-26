// @ts-expect-error js file
import FingerPrint from 'fingerprintjs';

export const FINGERPRINT = new FingerPrint().get();

export const REFRESH_PATH = '/api/refresh';

export const ACCESS_TOKEN_KEY = '__accessToken';

export const REFRESH_TOKEN_KEY = '__refreshToken';

export const API_BASE_URL = import.meta.env.CL_REQUEST_BASE_URL;
