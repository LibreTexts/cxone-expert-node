import type { AxiosError } from "axios";

/**
 * Origin category for an {@link ExpertError}.
 *
 * - `http`    — the server responded with a non-2xx status.
 * - `network` — the request was sent but no response was received (timeout, DNS,
 *               connection refused, etc.).
 * - `request` — the request could not be built/sent (axios setup error).
 * - `config`  — SDK misconfiguration caught before any request (missing TLD/auth).
 */
export type ExpertErrorKind = "http" | "network" | "request" | "config";

/** Constructor context for {@link ExpertError}. */
export interface ExpertErrorContext {
  kind: ExpertErrorKind;
  status?: number;
  statusText?: string;
  method?: string;
  url?: string;
  code?: string;
  responseData?: unknown;
  cause?: unknown;
}

/**
 * Best-effort extraction of a human-readable message from a Deki error body.
 * The exact JSON shape is not guaranteed, so this probes the common fields and
 * never throws. Streaming/binary bodies (from `responseType: 'stream'`
 * endpoints) are ignored so the caller can fall back to `statusText`.
 */
function extractDekiMessage(data: unknown): string | undefined {
  if (typeof data === "string") {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const nested = (key: string): string | undefined => {
      const value = record[key];
      if (value && typeof value === "object") {
        const message = (value as Record<string, unknown>).message;
        return typeof message === "string" ? message : undefined;
      }
      return undefined;
    };
    const candidate =
      (typeof record.message === "string" ? record.message : undefined) ??
      (typeof record.title === "string" ? record.title : undefined) ??
      nested("error") ??
      nested("exception");
    return candidate;
  }
  return undefined;
}

/**
 * Unified error thrown by every SDK operation. Wraps the underlying axios error
 * (preserved on {@link ExpertError.cause}) so consumers can read stable fields
 * (`kind`, `status`, `responseData`) without depending on axios internals.
 *
 * @example
 * try {
 *   await expert.pages.getPage(123);
 * } catch (err) {
 *   if (ExpertError.isExpertError(err)) {
 *     console.error(err.kind, err.status, err.responseData);
 *   }
 * }
 */
export class ExpertError extends Error {
  readonly kind: ExpertErrorKind;
  /** HTTP status code (present when `kind === 'http'`). */
  readonly status?: number;
  readonly statusText?: string;
  /** HTTP method, uppercased (e.g. `'GET'`). */
  readonly method?: string;
  /** Full request URL (`baseURL` + path). */
  readonly url?: string;
  /** Axios error code, e.g. `'ERR_NETWORK'`, `'ECONNABORTED'`. */
  readonly code?: string;
  /** Raw response body from the server, stored as-is (parsed JSON, string, or stream). */
  readonly responseData?: unknown;

  constructor(message: string, context: ExpertErrorContext) {
    super(message, { cause: context.cause });
    this.name = "ExpertError";
    this.kind = context.kind;
    this.status = context.status;
    this.statusText = context.statusText;
    this.method = context.method;
    this.url = context.url;
    this.code = context.code;
    this.responseData = context.responseData;
    // Restore the prototype chain so `instanceof` works regardless of the
    // compiled target (TS downlevels `extends Error` otherwise).
    Object.setPrototypeOf(this, ExpertError.prototype);
  }

  /** Type guard usable in `catch` blocks without importing anything else. */
  static isExpertError(error: unknown): error is ExpertError {
    return (
      error instanceof ExpertError ||
      (error instanceof Error && error.name === "ExpertError")
    );
  }

  /** Build a `config`-kind error for SDK misconfiguration caught before a request. */
  static config(message: string): ExpertError {
    return new ExpertError(message, { kind: "config" });
  }

  /** Map a raw {@link AxiosError} into an {@link ExpertError}. */
  static fromAxios(error: AxiosError): ExpertError {
    const method = error.config?.method?.toUpperCase();
    const url = error.config
      ? `${error.config.baseURL ?? ""}${error.config.url ?? ""}`
      : undefined;

    if (error.response) {
      const { status, statusText, data } = error.response;
      const detail = extractDekiMessage(data) ?? statusText;
      const message = `${method ?? "Request"} ${url ?? ""} failed with status ${status}${
        detail ? ` (${detail})` : ""
      }`.trim();
      return new ExpertError(message, {
        kind: "http",
        status,
        statusText,
        method,
        url,
        code: error.code,
        responseData: data,
        cause: error,
      });
    }

    if (error.request) {
      return new ExpertError(
        `No response received for ${method ?? "request"} ${url ?? ""}`.trim(),
        {
          kind: "network",
          method,
          url,
          code: error.code,
          cause: error,
        }
      );
    }

    return new ExpertError(`Request setup failed: ${error.message}`, {
      kind: "request",
      method,
      url,
      code: error.code,
      cause: error,
    });
  }
}
