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
  }
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

## License
This package is open-source and free to use under the [MIT License](http://opensource.org/licenses/MIT).