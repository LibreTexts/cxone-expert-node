import 'dotenv/config';
import Expert from "./dist/index.cjs";

(async () => {
  console.log("=== CXone Expert SDK Demo ===\n");

  console.log("1. Recommended: Auth configured in constructor");

  const expert1 = new Expert({
    tld: process.env.SERVER_DOMAIN,
    auth: {
      type: 'server',
      params: {
        key: process.env.SERVER_KEY || "",
        secret: process.env.SERVER_SECRET || "",
        user: process.env.SERVER_USER || "",
      }
    }
  });

  // No auth parameter needed - it's automatic!
  try {
    const page1 = await expert1.pages.getPage(123);
    console.log("Successfully fetched page with automatic auth");
  } catch (error: any) {
    console.log("Error (expected if page doesn't exist):", error.message);
  }

  // ========================================
  // Per-call override
  // ========================================
  console.log("\n2. Per-call auth override");

  const expert4 = new Expert({
    tld: process.env.SERVER_DOMAIN,
    auth: {
      type: 'server',
      params: {
        key: process.env.SERVER_KEY || "",
        secret: process.env.SERVER_SECRET || "",
        user: process.env.SERVER_USER || "",
      }
    }
  });

  // Can still override auth per-call if needed
  const customAuth = expert4.auth.ServerToken({
    key: "different-key",
    secret: "different-secret",
    user: "different-user",
  }).getHeader();

  try {
    const page4 = await expert4.pages.getPage(999, { auth: customAuth });
    console.log("Successfully used per-call auth override");
  } catch (error: any) {
    console.log("Error (expected with invalid credentials):", error.message);
  }

  console.log("\n=== Demo Complete ===");
})();
