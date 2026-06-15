/**
 * Error reporting — captures JS errors + unhandled promise rejections
 *
 * Sends to:
 *   1. GA4 (if consent granted) as 'js_error' event
 *   2. console.error (always, for local debugging)
 *
 * Usage: imported + called once at app boot.
 */

interface ErrorContext {
  source?: string;
  component?: string;
  userAction?: string;
  extra?: Record<string, unknown>;
}

let initialized = false;

export function initErrorReporting(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  // Catch uncaught errors
  window.addEventListener('error', (event) => {
    reportError(event.error || event.message, {
      source: 'window.error',
      extra: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    reportError(new Error(message), {
      source: 'unhandledrejection',
      extra: { stack },
    });
  });
}

export function reportError(error: Error | string, context: ErrorContext = {}): void {
  if (typeof window === 'undefined') return;

  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  // Always log to console
  console.error('[MR Error]', message, context, stack);

  // Send to GA4 if consent granted
  try {
    const c = localStorage.getItem('mr_cookie_consent');
    if (c && JSON.parse(c).accepted && typeof window.gtag === 'function') {
      window.gtag('event', 'js_error', {
        error_message: message.slice(0, 150), // GA4 limit
        error_source: context.source || 'manual',
        error_component: context.component || 'unknown',
        user_action: context.userAction || 'unknown',
        page_path: window.location.pathname,
      });
    }
  } catch {
    // Ignore analytics errors
  }
}

/**
 * Wrap a function to auto-report errors
 */
export function withErrorReporting<T extends (...args: unknown[]) => unknown>(
  fn: T,
  context: ErrorContext = {}
): T {
  return ((...args: unknown[]) => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((err) => {
          reportError(err, context);
          throw err;
        });
      }
      return result;
    } catch (err) {
      reportError(err as Error, context);
      throw err;
    }
  }) as T;
}
