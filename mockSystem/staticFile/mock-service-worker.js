/* eslint-disable no-undef */
importScripts('./mock-system.js');

const { initMockSystem, getMockData } = mockSystem;

self.addEventListener('activate', (event) => {
  event.waitUntil(initMockSystem());
});

const API_REG = /^\/api\/(.*)/;

self.addEventListener('fetch', (event) => {
  if (event.request.headers.usemock === 'true') return;
  const uri = new URL(event.request.url);
  const [, splitPath] = Array.from(API_REG.exec(uri.pathname) || []);
  if (!splitPath) return;
  event.respondWith(getMockData(splitPath, uri, event.request));
});
