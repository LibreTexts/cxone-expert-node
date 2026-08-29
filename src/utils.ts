import { AuthObject, ExpertGlobalOptions } from "./types";
import Auth from './modules/auth';
import { ExpertError } from './errors';
import createDebug from 'debug';

export function createDebugLogger(namespace: string, enabled?: boolean) {
    const debugLogger = createDebug(namespace);
    if (enabled !== undefined) {
        debugLogger.enabled = enabled;
    }
    return debugLogger;
}

export function getTld(globals: ExpertGlobalOptions, tld?: string) {
    if (!tld && !globals.tld) {
        throw ExpertError.config('TLD is required');
    }
    return tld ?? globals.tld;
}

export function getAuth(globals: ExpertGlobalOptions, authOverride?: AuthObject): AuthObject {
    // Per-call override provided - use it directly
    if (authOverride) {
        return authOverride;
    }

    // Fall back to global auth config
    if (globals.auth) {
        const authInstance = new Auth();

        if (globals.auth.type === 'server') {
            return authInstance.ServerToken(globals.auth.params).getHeader();
        } else if (globals.auth.type === 'browser') {
            return authInstance.BrowserToken(globals.auth.params).getHeader();
        }
    }

    throw ExpertError.config('Authentication is required. Configure auth in Expert constructor or pass auth to method call.');
}

export function getHeaders(globals: ExpertGlobalOptions, headersOverride?: Record<string, string>): Record<string, string> | undefined {
    if (!globals.headers && !headersOverride) return undefined;
    return { ...globals.headers, ...headersOverride };
}

/**
 * Shared implementation behind {@link parsePageId}, {@link parseUserId}, and
 * {@link parseGroupId}. Deki addresses these three resources identically: a
 * positive integer is the record's ID, and anything else is a name/path that
 * must be double URL-encoded and prefixed with `=`.
 *
 * @param id - The identifier: a positive integer, a digit string, or a name/path.
 * @param resource - Resource label used in error messages (e.g. `"page"`).
 * @param reserved - Literals that pass through untouched (e.g. `"home"` for pages).
 * @returns The ID as a numeric string, or the name double URL-encoded and prefixed with `=`.
 * @throws {ExpertError} With `kind: 'config'` when `id` is a number that is not a
 * positive integer, or an empty/whitespace-only string.
 */
function parseIdentifier(
    id: string | number,
    resource: string,
    reserved: readonly string[] = []
): string {
    if (typeof id === "number") {
        if (!Number.isSafeInteger(id) || id <= 0) {
            throw ExpertError.config(
                `Invalid ${resource} id: expected a positive integer, received ${id}.`
            );
        }
        return String(id);
    }

    const trimmed = id?.trim() ?? "";
    if (trimmed.length === 0) {
        throw ExpertError.config(
            `Invalid ${resource} id: expected an ID or name, received an empty string.`
        );
    }

    if (reserved.includes(trimmed)) {
        return trimmed;
    }

    // Digits only: anything else Number() would happily coerce (decimals, hex,
    // exponent notation, signs) is a name, not an ID.
    if (/^\d+$/.test(trimmed)) {
        const asNumber = Number(trimmed);
        if (Number.isSafeInteger(asNumber) && asNumber > 0) {
            return String(asNumber);
        }
    }

    return `=${encodeURIComponent(encodeURIComponent(id))}`;
}

/** Reserved page aliases Deki resolves by name, never double-encoded. */
const RESERVED_PAGE_PATHS = ["home"] as const;

/**
 * Formats a page identifier for an endpoint path: a positive integer ID, the
 * literal `"home"`, or a double URL-encoded page path prefixed with `=`.
 * @param id - A page ID, digit string, page path, or `"home"`.
 */
export function parsePageId(id: string | number): string {
    return parseIdentifier(id, "page", RESERVED_PAGE_PATHS);
}

/**
 * Formats a user identifier for an endpoint path: a positive integer ID, or a
 * double URL-encoded username prefixed with `=`.
 * @param id - A user ID, digit string, or username.
 */
export function parseUserId(id: string | number): string {
    return parseIdentifier(id, "user");
}

/**
 * Formats a group identifier for an endpoint path: a positive integer ID, or a
 * double URL-encoded group name prefixed with `=`.
 * @param id - A group ID, digit string, or group name.
 */
export function parseGroupId(id: string | number): string {
    return parseIdentifier(id, "group");
}

/**
 * Formats a file identifier for an endpoint path. Unlike pages/users/groups,
 * Deki file endpoints accept a numeric ID only, so names are rejected rather
 * than encoded.
 * @param id - A positive integer file ID, or a string of digits.
 * @returns The ID as a numeric string.
 * @throws {ExpertError} With `kind: 'config'` when `id` is not a positive integer.
 */
export function parseFileId(id: string | number): string {
    return String(parseNumericId(id, "file"));
}

/**
 * Resolves a numeric identifier the way {@link parsePageId} resolves the
 * numeric half of its input: numbers pass through when they are positive safe
 * integers, digit-only strings are converted, and anything Number() would
 * coerce loosely (decimals, hex, exponents, signs, whitespace-padded junk) is
 * rejected.
 * @param id - A positive integer ID, or a string of digits.
 * @param resource - Resource name used in the error message, e.g. `"file"`.
 * @returns The ID as a number.
 * @throws {ExpertError} With `kind: 'config'` when `id` is not a positive integer.
 */
export function parseNumericId(id: string | number, resource: string): number {
    if (typeof id === "number") {
        if (!Number.isSafeInteger(id) || id <= 0) {
            throw ExpertError.config(
                `Invalid ${resource} id: expected a positive integer, received ${id}.`
            );
        }
        return id;
    }

    const trimmed = typeof id === "string" ? id.trim() : "";
    const asNumber = /^\d+$/.test(trimmed) ? Number(trimmed) : Number.NaN;
    if (!Number.isSafeInteger(asNumber) || asNumber <= 0) {
        throw ExpertError.config(
            `Invalid ${resource} id: expected a positive integer, received ${JSON.stringify(id)}.`
        );
    }
    return asNumber;
}

export function joinPaths(...parts: string[]): string {
    // Remove leading/trailing slashes from each part and join with a single slash
    return parts.map(part => part.replace(/^\/|\/$/g, '')).join('/');
}

/**
 * Formats a filename for an endpoint path. The name is always double
 * URL-encoded; per the Deki docs the `=` prefix is added only when the name
 * has no extension, since an extensionless name is otherwise ambiguous with an
 * ID in the same path segment.
 * @param name - The filename to be formatted for API use.
 * @returns The double URL-encoded filename, prefixed with `=` when it has no extension.
 * @throws {ExpertError} With `kind: 'config'` when `name` is empty or whitespace-only.
 */
export function parseFileName(name: string): string {
    const trimmed = name?.trim() ?? "";
    if (trimmed.length === 0) {
        throw ExpertError.config(
            "Invalid file name: expected a filename, received an empty string."
        );
    }

    // An extension needs a non-empty segment on both sides of a final dot, so
    // "notes.txt" qualifies while "notes.", ".gitignore", and "notes" do not.
    const hasExtension = /[^.]\.[^.]+$/.test(trimmed);
    const encoded = encodeURIComponent(encodeURIComponent(name));
    return hasExtension ? encoded : `=${encoded}`;
}

/**
 * Double URL-encodes a property key for use in API endpoints. Unlike
 * {@link parseFileName} there is no `=` prefix: keys always appear in a path
 * segment that is already unambiguous.
 * @param key - The property key to be formatted for API use.
 * @returns The double URL-encoded key.
 */
export function parseKey(key: string): string {
    return encodeURIComponent(encodeURIComponent(key));
}


/**
 * Encodes a page path for use in a **query string** value, such as the `to`
 * parameter on `POST /pages/{pageid}/move`. Deki expects that value to arrive
 * double URL-encoded (a space reaches the server as `%2520`, a slash as
 * `%252f`), so this applies exactly one layer of encoding: axios serializes
 * query params and applies the second layer on the way out.
 *
 * Do not use this for path segments — those never pass through the query
 * serializer, so they need both layers up front (see {@link parsePageId}).
 * @param path - The page path, for example `Category/Floating rocks`.
 * @returns The single URL-encoded path.
 * @throws {ExpertError} With `kind: 'config'` when `path` is empty or whitespace-only.
 */
export function parsePathParam(path: string): string {
    const trimmed = path?.trim() ?? "";
    if (trimmed.length === 0) {
        throw ExpertError.config(
            "Invalid page path: expected a path, received an empty string."
        );
    }
    return encodeURIComponent(trimmed);
}
