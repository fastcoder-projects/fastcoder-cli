import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * dist文件夹路径
 */
export const PACKAGE_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../');

const { version } = JSON.parse(
  readFileSync(resolve(PACKAGE_PATH, './package.json')).toString(),
)

export const VERSION = version as string;
