![NPM Version](https://img.shields.io/npm/v/%40libretexts%2Fcxone-expert-node) ![NPM Downloads](https://img.shields.io/npm/dm/%40libretexts%2Fcxone-expert-node)


# CXone Expert Node SDK
This package is a custom SDK developed by [LibreTexts](https://libretexts.org) to interact with the [CXone Expert API](https://expert-help.nice.com/Integrations_and_Extending_Content/API). It should be noted that this package is NOT developed or maintained by CXone and, as such, does not guarantee 100% compatibility with the latest API updates.

## Install

```
npm install @libretexts/cxone-expert-node
```

## Usage

#### Recommended

Configure authentication once at the Expert instance level:

```typescript
import Expert from "@libretexts/cxone-expert-node";

// Option 1: Configure everything in the constructor
const expert = new Expert({
  tld: process.env.SERVER_DOMAIN,
  auth: {
    type: 'server',
    params: {
      key: process.env.SERVER_KEY,
      secret: process.env.SERVER_SECRET,
      user: process.env.SERVER_USER,
    }
  },
  debug: false, // Optional debug logging
});

// Now you can start making API calls!
const page = await expert.pages.getPage(123);
const pages = await expert.pages.getPages();

console.log(page);
```

#### Per-call auth override (when needed):

```typescript
// Global auth is used by default
const page1 = await expert.pages.getPage(123);

// Override with different auth for specific call
const customAuth = { 'X-Deki-Token': 'different-token' };
const page2 = await expert.pages.getPage(456, { auth: customAuth });
```

## Working with Deki's JSON quirks

The Expert API is XML-first, and the JSON it returns when you ask for `dream.out.format=json`
(this SDK's default) carries two artifacts of that translation:

- An empty element becomes an empty string, not `null` or an absent key.
- A repeated element is a bare object when there is one of it and an array when there are several.

The response types name both cases (`Maybe<T>` and `OneOrMany<T>`), and the package exports
`one`, `many`, and `text` so you do not have to branch on them by hand:

```typescript
import Expert, { one, many, text } from '@libretexts/cxone-expert-node';

const page = await expert.pages.getPage(541831);

// `tags.tag` is one tag, an array of tags, or "" - `many` always gives you an array
for (const tag of many(page.tags && page.tags.tag)) {
  console.log(tag.title);
}

// `one` unwraps a field that is either a value or "", giving undefined when empty
const security = await expert.pages.getPageSecurity(541831);
const restriction = one(security['permissions.page'])?.restriction;
console.log(restriction && restriction['#text']); // 'Public'

// A grant targets a user or a group, never both - checking one narrows the type
for (const grant of many(security.grants && security.grants.grant)) {
  console.log(grant.user ? grant.user.fullname : grant.group.groupname);
}

// `text` reads a scalar whether or not it picked up XML attributes
text('true');                                // 'true'
text({ '@owner': 'true', '#text': 'true' }); // 'true'
```

All three return `undefined` or `[]` for `""`, `null`, and `undefined` alike, so they are safe to
apply to any optional field.

## Dependencies
This package is designed to be lightweight and has only two dependencies: `axios` for making HTTP requests and `debug` for logging/troubleshooting.

## License
This package is open-source and free to use under the [MIT License](http://opensource.org/licenses/MIT).