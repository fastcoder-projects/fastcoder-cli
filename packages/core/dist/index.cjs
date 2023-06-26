'use strict';

var cac = require('cac');
var inquirer = require('inquirer');
var path = require('node:path');
var fs = require('fs-extra');
var colorLog = require('picocolors');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

const warnedMessages = /* @__PURE__ */ new Set();
function output(type = "info" /* INFO */, msg, opts) {
  let message = colorLog.white(msg);
  if (type === "warn" /* WARN */) {
    message = colorLog.yellow(msg);
  }
  if (type === "error" /* ERROR */) {
    message = colorLog.red(msg);
  }
  if (type === "success" /* SUCCESS */) {
    message = colorLog.green(msg);
  }
  console.log(message);
}
class Logger {
  constructor() {
  }
  info(msg, opts) {
    output("info" /* INFO */, msg);
  }
  warn(msg, opts) {
    output("warn" /* WARN */, msg);
  }
  warnOnce(msg, opts) {
    if (warnedMessages.has(msg))
      return;
    output("warn" /* WARN */, msg);
    warnedMessages.add(msg);
  }
  error(msg, opts) {
    output("error" /* ERROR */, msg);
  }
  success(msg, opts) {
    output("success" /* SUCCESS */, msg);
  }
}

function copy(src, dest) {
  fs.copyFile(src, dest);
}
const EXECUTE_PATH = process.cwd();
const logger = new Logger();
const cli = cac("fastcoder");
var ConfigFile = /* @__PURE__ */ ((ConfigFile2) => {
  ConfigFile2["ESLINT"] = "eslint";
  ConfigFile2["LINT_STAGED"] = "lint-staged";
  return ConfigFile2;
})(ConfigFile || {});
cli.command("", "\u652F\u6301\u521B\u5EFAeslint\u914D\u7F6E\u6587\u4EF6\u3001lint-staged\u914D\u7F6E\u6587\u4EF6\u7B49").alias("create").option(`-e, --${"eslint" /* ESLINT */}`, "\u76F4\u63A5\u521B\u5EFAeslint\u914D\u7F6E").option(`-lt, --${"lint-staged" /* LINT_STAGED */}`, "\u76F4\u63A5\u521B\u5EFAlint-staged\u914D\u7F6E").action(async (_, options) => {
  console.log("options", options);
  logger.warn("\u6CE8\u610F\u8981\u751F\u6210\u6587\u4EF6\u4E86\uFF01");
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "\u8BF7\u9009\u62E9\u4F60\u9700\u8981\u751F\u6210\u7684\u6587\u4EF6\u6587\u4EF6",
      choices: [
        {
          name: "eslint\u914D\u7F6E\u6587\u4EF6",
          value: "eslint" /* ESLINT */
        },
        {
          name: "lint-staged\u914D\u7F6E\u6587\u4EF6",
          value: "lint-staged" /* LINT_STAGED */
        }
      ]
    }
  ]);
  console.log("EXECUTE_PATH", EXECUTE_PATH);
  if (type === "eslint" /* ESLINT */) {
    copy(path__namespace.resolve(EXECUTE_PATH, "./templates/.eslintrc.txt"), path__namespace.resolve(EXECUTE_PATH, "./.eslintrc.js"));
  }
  if (type === "lint-staged" /* LINT_STAGED */) {
    copy(path__namespace.resolve(EXECUTE_PATH, "./templates/.lintstagedrc.txt"), path__namespace.resolve(EXECUTE_PATH, "./.lintstagedrc.mjs"));
  }
  logger.success("\u521B\u5EFA\u6210\u529F\uFF01");
});
cli.help();
cli.parse();

exports.ConfigFile = ConfigFile;
