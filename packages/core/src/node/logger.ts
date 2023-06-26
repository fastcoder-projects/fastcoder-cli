import colorLog from 'picocolors';

const warnedMessages = new Set<string>();

export interface LogOptions {
  /**
   * 是否清屏
   */
  isClear?: boolean;
  /**
   * 是否打印时间
   */
  isTimeLog?: boolean;
}

export enum LogType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SUCCESS = 'success',
}

/**
 * 控制台输出
 * @param msg 输出信息
 * @param opt 输出配置
 */
function output(type: LogType = LogType.INFO, msg: string, opts?: LogOptions) {
  let message = colorLog.white(msg);
  if(type === LogType.WARN) {
    message = colorLog.yellow(msg);
  }
  if(type === LogType.ERROR) {
    message = colorLog.red(msg);
  }
  if(type === LogType.SUCCESS) {
    message = colorLog.green(msg);
  }
  console.log(message);
}

export class Logger {
  constructor() {
  }

  info(msg: string, opts?: LogOptions) {
    output(LogType.INFO, msg, opts);
  }

  warn(msg: string, opts?: LogOptions) {
    output(LogType.WARN, msg, opts);
  }

  warnOnce(msg: string, opts?: LogOptions) {
    if (warnedMessages.has(msg)) return
    output(LogType.WARN, msg, opts);
    warnedMessages.add(msg);
  }

  error(msg: string, opts?: LogOptions) {
    output(LogType.ERROR, msg, opts);
  }

  success(msg: string, opts?: LogOptions) {
    output(LogType.SUCCESS, msg, opts);
  }
}

