import { AuthObject, ServerTokenParams, BrowserTokenParams } from './auth';

export * from './auth';
export * from './pages';
export * from './requests';
export * from './security';
export * from './groups';
export * from './archive';
export * from './events';
export * from './site';
export * from './contextMaps';
export * from './users';
export * from './files';

// Auth configuration types
export type AuthConfig =
    | { type: 'server', params: ServerTokenParams }
    | { type: 'browser', params: BrowserTokenParams }
    | null;

export type BaseArgs = {
    auth?: AuthObject;
    tld?: string;
    headers?: Record<string, string>;
}

export type ExpertGlobalOptions = {
    tld?: string;
    auth?: AuthConfig;
    debug?: boolean;
    headers?: Record<string, string>;
}


// Util types
export type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};

/**
 * Deki's JSON serializer renders an empty XML element as an empty string rather
 * than omitting it or emitting `null`. Every response field that wraps a child
 * element therefore has `""` in its domain.
 */
export type Empty = "";

/**
 * A field Deki renders as `""` when the underlying element is empty.
 *
 * Deliberately does not include `undefined`: keep optionality on the `?:`
 * modifier so `Maybe<T>` stays a pure statement about Deki's empty encoding.
 *
 * @example
 * ```ts
 * type Page = { path: Maybe<PagePath> };  // PagePath | ""
 * ```
 */
export type Maybe<T> = T | Empty;

/**
 * A repeated element: Deki emits a bare object when there is exactly one, an
 * array when there are several, and `""` when there are none. Normalize with
 * {@link one} or {@link many} rather than branching by hand.
 *
 * @example
 * ```ts
 * type Tags = { tag?: OneOrMany<PageTag> };  // PageTag | PageTag[] | ""
 * many(page.tags && page.tags.tag).forEach(...);
 * ```
 */
export type OneOrMany<T> = T | T[] | Empty;

/**
 * A scalar element: a plain string until it carries XML attributes, at which
 * point Deki moves the value into `#text` and hoists the attributes alongside
 * it. `license.seat` is the canonical example, becoming
 * `{ "@owner": "true", "#text": "true" }` for a site owner. Read either form
 * with {@link text}.
 */
export type Scalar = string | ({ "#text": string } & Record<string, string>);   