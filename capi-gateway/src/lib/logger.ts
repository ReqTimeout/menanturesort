/**
 * logger.ts — Structured JSON logging
 *
 * Use console.log(JSON.stringify({...})) so logs are queryable
 * in Cloudflare Workers Logs / Logpush.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  event_id?: string;
  lead_id?: number;
  source?: string;
  [key: string]: unknown;
}

export function log(level: LogLevel, message: string, context: LogContext = {}): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  };
  const line = JSON.stringify(entry);
  if (level === 'error') {
    console.error(line);
  } else if (level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  debug: (msg: string, ctx?: LogContext) => log('debug', msg, ctx),
  info: (msg: string, ctx?: LogContext) => log('info', msg, ctx),
  warn: (msg: string, ctx?: LogContext) => log('warn', msg, ctx),
  error: (msg: string, ctx?: LogContext) => log('error', msg, ctx),
};
