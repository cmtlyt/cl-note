import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';

function getConfigPath(fileName: string) {
  return join(process.cwd(), fileName);
}

function getConfigContent(fileName: string) {
  return readFile(getConfigPath(fileName), 'utf-8');
}

export default () => {
  const configList = [];

  configList.push(getConfigContent('.env.local.yaml'));
  configList.push(getConfigContent('.env.yaml'));

  return configList.map((config) => async () => yaml.load(await config));
};
