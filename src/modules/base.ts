import { BaseArgs, ExpertGlobalOptions } from "../types";
import { getTld, getAuth, getHeaders, createDebugLogger, parsePageId, parseFileName, parseKey, parsePathParam, parseUserId, parseGroupId, parseFileId, parseNumericId } from "../utils";
import Requests from "./requests";
import type { Debugger } from "debug";

/**
 * Base class for every API domain module. Holds the shared globals and a
 * per-module debug logger, and centralizes HTTP client construction so the
 * TLD/auth/headers resolution lives in exactly one place.
 */
export default abstract class BaseModule {
  protected globals: ExpertGlobalOptions;
  protected debug: Debugger;

  constructor(globals: ExpertGlobalOptions, namespace: string) {
    this.globals = globals;
    this.debug = createDebugLogger(`cxone-expert-node:${namespace}`, globals.debug);
    this.debug(`${namespace} module initialized`);
  }

  /**
   * Resolves TLD, auth, and headers from globals (with optional per-call
   * overrides) and returns a configured Requests client. Single source of
   * truth for how every endpoint builds its HTTP client.
   * @param funcArgs - Optional per-call auth/tld/headers overrides.
   * @returns A configured Requests instance.
   */
  protected prepare(funcArgs?: BaseArgs): Requests {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const headers = getHeaders(this.globals, funcArgs?.headers);
    return new Requests(tld, auth, "json", this.globals.debug, headers);
  }

  /**
   * Formats a page identifier for use in an endpoint path. Delegates to the
   * shared {@link parsePageId} helper so every module resolves IDs and paths
   * identically.
   * @param id - A page ID, numeric string, page path, or the literal `"home"`.
   * @returns The ID as a numeric string, or the path double URL-encoded and prefixed with `=`.
   */
  protected parsePageId(id: string | number): string {
    return parsePageId(id);
  }

  /**
   * Formats a filename for use in an endpoint path. Delegates to the shared
   * {@link parseFileName} helper.
   * @param name - The filename to be formatted for API use.
   * @returns The double URL-encoded filename, prefixed with `=`.
   */
  protected parseFileName(name: string): string {
    return parseFileName(name);
  }

  /**
   * Formats a property key for use in an endpoint path. Delegates to the shared
   * {@link parseKey} helper.
   * @param key - The property key to be formatted for API use.
   * @returns The double URL-encoded key.
   */
  protected parseKey(key: string): string {
    return parseKey(key);
  }

  /**
   * Encodes a page path for use in a query-string value. Delegates to the
   * shared {@link parsePathParam} helper.
   * @param path - The page path to encode.
   * @returns The single URL-encoded path; axios adds the second encoding layer.
   */
  protected parsePathParam(path: string): string {
    return parsePathParam(path);
  }

  /**
   * Formats a user identifier for use in an endpoint path. Delegates to the
   * shared {@link parseUserId} helper.
   * @param id - A numeric user ID or a username.
   * @returns The ID as a string, or the username double URL-encoded and prefixed with `=`.
   */
  protected parseUserId(id: string | number): string {
    return parseUserId(id);
  }

  /**
   * Formats a group identifier for use in an endpoint path. Delegates to the
   * shared {@link parseGroupId} helper.
   * @param id - A group ID, digit string, or group name.
   * @returns The ID as a numeric string, or the name double URL-encoded and prefixed with `=`.
   */
  protected parseGroupId(id: string | number): string {
    return parseGroupId(id);
  }

  /**
   * Formats a file identifier for use in an endpoint path. Delegates to the
   * shared {@link parseFileId} helper, which accepts numeric IDs only.
   * @param id - A positive integer file ID, or a string of digits.
   * @returns The ID as a numeric string.
   */
  protected parseFileId(id: string | number): string {
    return parseFileId(id);
  }

  /**
   * Resolves a numeric identifier used as a query-param value (rather than a
   * path segment). Delegates to the shared {@link parseNumericId} helper, so
   * digit strings are accepted and coerced the same way page IDs are.
   * @param id - A positive integer ID, or a string of digits.
   * @param resource - Resource name used in the error message, e.g. `"parent page"`.
   * @returns The ID as a number.
   */
  protected parseNumericId(id: string | number, resource: string): number {
    return parseNumericId(id, resource);
  }
}
