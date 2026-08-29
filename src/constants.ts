/**
 * MIME types the Deki API accepts on a request body.
 *
 * Deki is strict about the request `Content-Type`: an XML document sent as
 * `application/json` is rejected with a 400. Reference these instead of typing
 * the literal so every endpoint agrees on one spelling.
 */
export const ContentType = {
    /** Default for the SDK's own JSON traffic. */
    json: 'application/json',
    /** Required by endpoints taking an XML document, e.g. page security and tags. */
    xml: 'application/xml',
    /** Required by endpoints taking a raw value, e.g. page contents and properties. */
    text: 'text/plain',
    /** Required by file uploads. */
    binary: 'application/octet-stream',
} as const;

/** One of the {@link ContentType} values. */
export type ContentTypeValue = (typeof ContentType)[keyof typeof ContentType];

/**
 * Builds the `Content-Type` header object for a request config.
 *
 * @param type - The MIME type to send, from {@link ContentType}.
 * @returns A header object ready to spread into an axios request config.
 *
 * @example
 * ```ts
 * await requests.put(url, xml, { headers: contentTypeHeader(ContentType.xml) });
 * ```
 */
export const contentTypeHeader = (type: ContentTypeValue) => ({
    'Content-Type': type,
});
