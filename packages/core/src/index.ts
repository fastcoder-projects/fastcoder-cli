#!/usr/bin/env node

import cli from 'cac';
import inquirer from 'inquirer';
import * as path from 'node:path'
import fs from 'fs-extra';


const command = cli();

/**
 * 可创建的配置文件枚举
 */
enum ConfigFile {
  /**
   * eslint配置文件
   */
  ESLINT = 'eslint',
  /**
   * lint-staged配置文件
   */
  LINT_STAGED = 'lint-staged'
}

command
.command('create', '支持创建eslint配置文件、lint-staged配置文件等')
.action(async () => {
  // 选择需要生成的文件
  const { type }: { type: ConfigFile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择你需要生成的文件文件',
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
  console.log('answers', type);
  if(type === ConfigFile.ESLINT) {
    const fileContent = fs.readFileSync(path.resolve(__dirname, './templates/.eslintrc.txt')).toString();
    console.log('生产了eslint配置文件', fileContent);
  }
})

command.parse()