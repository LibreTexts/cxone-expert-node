# CXone Expert Node SDK
This package is a custom SDK developed by [LibreTexts](https://libretexts.org) to interact with the [CXone Expert API](https://expert-help.nice.com/Integrations_and_Extending_Content/API). It should be noted that this package is NOT developed or maintained by CXone and, as such, does not guarantee 100% compatibility with the latest API updates.

## Install

```
npm install @libretexts/cxone-expert-node
```

## Usage
```
import Expert from "@libretexts/cxone-expert-node";

const tld = process.env.SERVER_DOMAIN; // Your CXone site domain

const expert = new Expert(tld);

// Authenticate using server credentials
const authInstance = await expert.auth.ServerToken({
  key: proccess.env.SERVER_KEY,
  secret: process.env.SERVER_SECRET,
  user: process.env.SERVER_USER,
});

// Or, use auth.BrowserToken() to use a CXone provided JWT (not intended for production use)

// Get authentication header(s) (X-Deki-Token)
const authHeaders = authInstance.getHeader();

// Use the appropriate module(s) to interact with your site's API
const page = await expert.pages.getPage(123, {
  auth: authHeaders,
  tld,
});

console.log(page);
```

## License
This package is open-source and free to use under the [MIT License](http://opensource.org/licenses/MIT).