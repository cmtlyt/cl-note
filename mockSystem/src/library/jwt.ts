/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error js
import ms from 'ms';

function base64UrlEncode(input: string) {
  return btoa(encodeURIComponent(input)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(input: string) {
  const output = atob(input.replace(/-/g, '+').replace(/_/g, '/'));
  return decodeURIComponent(output);
}

function encodeArrayBuffer(input: string) {
  return new TextEncoder().encode(input);
}

function decodeArrayBuffer(input: any) {
  return new TextDecoder().decode(input);
}

function getExpires(expiresIn: string | number) {
  if (typeof expiresIn === 'string') return Math.floor(Date.now() / 1000) + Math.floor(ms(expiresIn) / 1000);
  if (typeof expiresIn === 'number') return Math.floor(Date.now() / 1000) + expiresIn;
  return;
}

async function encrypt(secret: string, payload: any) {
  return base64UrlEncode(
    decodeArrayBuffer(
      await crypto.subtle.sign(
        { name: 'HMAC', hash: 'SHA-256' },
        await crypto.subtle.importKey('raw', encodeArrayBuffer(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
          'sign',
        ]),
        encodeArrayBuffer(payload),
      ),
    ),
  );
}

interface SignOptions {
  expiresIn?: string | number;
}

export async function sign(payload: any, secret: string, options: SignOptions = {}) {
  const header = JSON.stringify({
    alg: 'HS256',
    typ: 'JWT',
    exp: getExpires(options.expiresIn!),
  });
  const encodedHeader = base64UrlEncode(header);

  const payloadJson = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadJson);

  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signature = base64UrlEncode(await encrypt(secret, signatureInput));

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function verify(token: string, secret: string) {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const isVerified = base64UrlEncode(await encrypt(secret, signatureInput)) === signature;

    if (!isVerified) {
      return [false, 'Signature verification failed'];
    }

    const header = JSON.parse(base64UrlDecode(encodedHeader));

    const now = Math.floor(Date.now() / 1000);
    if (header.exp && now > header.exp) {
      return [false, 'Token has expired'];
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    return [true, null, payload];
  } catch (e: any) {
    return [false, e.message];
  }
}
