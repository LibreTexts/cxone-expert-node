import { loadEnvFile } from "process";
import Expert from "./src";

loadEnvFile();

(async () => {
  const tld = process.env.SERVER_DOMAIN; // Your CXone site domain

  const expert = new Expert(tld);

  //Authenticate using server credentials
  const authInstance = expert.auth.ServerToken({
    key: process.env.SERVER_KEY || "",
    secret: process.env.SERVER_SECRET || "",
    user: process.env.SERVER_USER || "",
  });

  // Get authentication header(s) (X-Deki-Token)
  const authHeaders = authInstance.getHeader();

  // Use the appropriate module(s) to interact with your site's API
  const page = await expert.pages.getPage(123, {
    auth: authHeaders,
    tld,
  });

  console.log(page);
})();
