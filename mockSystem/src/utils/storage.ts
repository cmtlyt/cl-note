/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaData, SchemaInputData, SchemaNames, verifySchema } from '../schema';

import { CACHE_NAME, ORIGIN } from './constant';

import { getType } from '.';

const STORAGE_KEY = new URL(ORIGIN);
let cache: Cache = null as unknown as Cache;
const memoryCache = new Map();

function getUrlId(key: SchemaNames) {
  return new URL(`${STORAGE_KEY.href}${key}`);
}

async function getData<T extends SchemaNames>(key: T): Promise<SchemaData<T> | null> {
  const tableId = getUrlId(key);
  return (
    memoryCache.get(tableId.href) ||
    cache!.match(tableId).then(async (response) => {
      if (response) {
        const data = await response.json();
        let cacheData: Record<string, any> | null = null;
        if (getType(data) === 'array') {
          cacheData = {};
          data.forEach((item: any) => (cacheData![item.id] = item));
          init(tableId.href as SchemaNames, cacheData as any);
        }
        memoryCache.set(tableId.href, cacheData || data);
        return data;
      }
      return null;
    })
  );
}

function createCacheData(value: any) {
  return new Response(JSON.stringify(value));
}

async function get<T extends SchemaNames>(key: T): Promise<SchemaData<T> | null> {
  return getData(key);
}

async function set<K extends SchemaNames>(key: K, value: SchemaData<K>) {
  return cache!.put(getUrlId(key), createCacheData(value));
}

async function init<K extends SchemaNames>(key: K, value: SchemaInputData<K>) {
  const valueType = getType(value);
  if (!['object', 'array'].includes(valueType)) return;
  return cache!.keys().then(async (keys) => {
    const urlId = getUrlId(key);
    const cacheId = keys.find((item) => item.url === urlId.href);
    if (!cacheId) return cache!.put(urlId, createCacheData(value));
    const data = await (await cache!.match(cacheId))!.json();
    if (getType(data) === valueType) return;
    let newData;
    if (valueType === 'object') {
      newData = Object.assign({}, value);
      data.forEach((item: any) => (newData[item.id] = item));
    } else {
      // @ts-expect-error value is array
      newData = [...value, ...Object.keys(data).map((item) => data[item])];
    }
    return cache!.put(urlId, createCacheData(newData));
  });
}

async function findById<T extends SchemaNames>(key: T, id: string): Promise<SchemaData<T> | null> {
  const data: Record<string, any> = (await getData(key)) || {};
  if (!(id in data)) return null;
  return data[id];
}

interface FindOptions {
  id?: string;
  matcher?: (item: any) => boolean;
}

async function find<T extends SchemaNames>(key: T, options?: FindOptions): Promise<SchemaData<T>[]> {
  const { id, matcher = (item: any) => item.id === id } = options || {};
  const data = await getData(key);
  const result: any[] = [];
  for (const key in data) {
    const item = data[key];
    if (matcher(item)) result.push(item);
  }
  return result;
}

async function insert<T extends SchemaNames>(key: T, value: SchemaInputData<T>): Promise<SchemaData<T>> {
  const data: Record<string, any> = (await getData(key)) || {};
  const [verify, error, _data] = verifySchema(key, value);
  if (!verify) throw new Error(error || undefined);
  data[_data!.id] = _data;
  await cache!.put(getUrlId(key), createCacheData(data));
  return _data!;
}

async function update<T extends SchemaNames>(key: T, value: SchemaInputData<T>): Promise<SchemaData<T>> {
  const data: Record<string, any> = (await getData(key)) || {};
  const id = value.id;
  if (!id || !(id in data)) return insert(key, value);
  const [verify, error, _data] = verifySchema(key, value);
  if (!verify) throw new Error(error);
  data[id] = Object.assign(data[id], _data);
  await cache!.put(getUrlId(key), createCacheData(data));
  return _data!;
}

async function remove<T extends SchemaNames>(key: T, value: { id: string }) {
  const data: Record<string, any> = (await getData(key)) || {};
  const id = value.id;
  if (!(id in data)) return;
  delete data[id];
  return cache!.put(getUrlId(key), createCacheData(data));
}

async function clear(key: SchemaNames) {
  return cache!.delete(getUrlId(key));
}

export const storage = { get, set, insert, update, remove, clear, find, init, findById };

export async function initStorage() {
  return caches.open(CACHE_NAME).then(async (_cache) => (cache! = _cache));
}
