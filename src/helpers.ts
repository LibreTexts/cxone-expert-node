import type { Empty, Maybe, OneOrMany, Scalar } from './types';

/**
 * Narrows a Deki one-or-many field to a single value.
 *
 * Deki emits a repeated XML element as a bare object when there is exactly one
 * of it, an array when there are several, and `""` when there are none. Use
 * this when you only care about the first entry.
 *
 * @param value - The raw field from a response.
 * @returns The value itself, the first element of an array, or `undefined` when
 * the field was empty, `null`, or absent.
 *
 * @example
 * ```ts
 * const page = await expert.pages.getPage(541831);
 * const restriction = one(page.security && page.security['permissions.page'])?.restriction;
 * ```
 */
export const one = <T>(value: OneOrMany<T> | null | undefined): Exclude<T, Empty> | undefined =>
    !value ? undefined : ((Array.isArray(value) ? value[0] : value) as Exclude<T, Empty> | undefined);

/**
 * Normalizes a Deki one-or-many field to an array so it is always iterable.
 *
 * @param value - The raw field from a response.
 * @returns The array as-is, a single value wrapped in an array, or `[]` when the
 * field was empty, `null`, or absent.
 *
 * @example
 * ```ts
 * const page = await expert.pages.getPage(541831);
 * for (const tag of many(page.tags && page.tags.tag)) {
 *   console.log(tag.title);
 * }
 * ```
 */
export const many = <T>(value: OneOrMany<T> | null | undefined): Exclude<T, Empty>[] =>
    !value ? [] : ((Array.isArray(value) ? value : [value]) as Exclude<T, Empty>[]);

/**
 * Reads a Deki scalar whether it came back bare or wrapped in `#text`.
 *
 * A scalar element serializes as a plain string until it carries XML
 * attributes, at which point its value moves to `#text`. This reads both forms
 * without a hand-written `typeof` check.
 *
 * @param value - The raw field from a response.
 * @returns The string value, or `undefined` when the field was empty, `null`,
 * or absent.
 *
 * @example
 * ```ts
 * text('true');                                // 'true'
 * text({ '@owner': 'true', '#text': 'true' }); // 'true'
 * text('');                                    // undefined
 * ```
 */
export const text = (value: Maybe<Scalar> | null | undefined): string | undefined =>
    !value ? undefined : typeof value === 'string' ? value : value['#text'];
