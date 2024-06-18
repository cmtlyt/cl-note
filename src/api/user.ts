import { http } from './request';

import { updateUserInfo } from '@/storage/user';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constant';

function tokenHandler(res: { data: TokenResponse }) {
  const { data } = res;
  const { accessToken, refreshToken } = data;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  return res;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginData {
  name: string;
  password: string;
}

export async function login(data: LoginData) {
  return http.post('/login', data).then(tokenHandler);
}

interface RegisterData extends LoginData {
  captcha: string;
  captchaId: string;
}

export async function register(data: RegisterData) {
  return http.post('/register', data).then(tokenHandler);
}

interface CaptchaData {
  phone: string;
}

export async function captcha(data: CaptchaData) {
  return http.get<{ data: { success: boolean; captchaId: string; captcha: string } }>('/captcha', { params: data });
}

interface CheckCaptchaData {
  captcha: string;
  captchaId: string;
}

export async function checkCaptcha(data: CheckCaptchaData) {
  return http.post<{ data: { success: boolean } }>('/checkCaptcha', data);
}

export async function getUserInfo() {
  return http
    .get<{
      userInfo: {
        age: number;
        avatar: string;
        email: string;
        name: string;
        phone: string;
        sex: string;
      };
    }>('/getUserInfo')
    .then((res) => {
      updateUserInfo(res.data.userInfo);
      return res;
    });
}
