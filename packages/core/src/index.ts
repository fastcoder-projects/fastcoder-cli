// https://zhuanlan.zhihu.com/p/613517138  https://zhuanlan.zhihu.com/p/216022342

// 基本脚手架的研发流程是：
/**
 * 1、创建脚手架执行文件
 * 2、使用 xxx（比如commander、cac、yargs）解析命令行指令参数，命令行参数解析（minimist）
 * 3、使用 xxx（比如prompts || enquirer || inquirer）设计命令行交互
 * 4、创建工程化模版并push到github
 * 5、使用 xx（比如download-git-repo）下载模版
 * 6、使用 xx（比如ora和chalk）美化命令行
 * 7、发布npm
 */

// fs-extra： 是一个强大的文件操作库， 是 Nodejs fs 模块 的增强版；
// debug：debug 是一个模仿 Node.js 核心调试技术的小型 JavaScript 调试程序，在适用于 Node.js 和 Web 浏览器 都可使用；debug 只在 vite 工具源码中有使用；说直白点就是你可以使用 debug 来对你的程序进行 毫秒级别时间差的统计 对你程序代码进行优化；
// picocolors：在终端

import cac from 'cac';
import inquirer from 'inquirer';
import * as path from 'node:path';
import fs from 'fs-extra';
import { Logger } from './node/logger';
import { VERSION, PACKAGE_PATH } from './constant';

function copy(src: string, dest: string) {
  fs.copyFile(src, dest);
}

const EXECUTE_PATH = process.cwd();


const logger = new Logger();


const cli = cac('fastcoder');

/**
 * 可创建的配置文件枚举
 */
export enum ConfigFile {
  /**
   * eslint配置文件
   */
  ESLINT = 'eslint',
  /**
   * lint-staged配置文件
   */
  LINT_STAGED = 'lint-staged'
}

// interface CreateOptions {
//   /**
//    * eslint配置
//    */
//   eslint: string;
// }

cli
.command('', '支持创建eslint配置文件、lint-staged配置文件等')
.alias('create')
.option(`-e, --${ConfigFile.ESLINT}`, '直接创建eslint配置')
.option(`-lt, --${ConfigFile.LINT_STAGED}`, '直接创建lint-staged配置')
.action(async (_, options: Record<string, string | boolean | string[]>) => {
  logger.warn('欢迎来到fastcoder，接下来我们可以进行愉快的快速创建项目的通用配置啦！');
  // 选择需要生成的文件
  const { type }: { type: ConfigFile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择你需要生成的文件',
      choices: [
        {
          name: 'eslint配置文件',
          value: ConfigFile.ESLINT
        },
        {
          name: 'lint-staged配置文件',
          value: ConfigFile.LINT_STAGED
        }
      ]
    }
  ]);

  console.log('EXECUTE_PATH', PACKAGE_PATH);
  

  if(type === ConfigFile.ESLINT) {
    copy(path.resolve(PACKAGE_PATH, './templates/.eslintrc.txt'), path.resolve(EXECUTE_PATH, './.eslintrc.js'));
  }

  if(type === ConfigFile.LINT_STAGED) {
    copy(path.resolve(PACKAGE_PATH, './templates/.lintstagedrc.txt'), path.resolve(EXECUTE_PATH, './.lintstagedrc.mjs'));
  }

  logger.success('创建成功！');
});

cli.version(VERSION);

cli.help();

cli.parse();