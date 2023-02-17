import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
  },
  env: {
    serverUrl: "http://localhost:3000",
    clearTestDbEndpoint: "/api/v1/e2e/clear-test-db/",
    DEVELOPER_TOKEN: "iamdeveloper",
  },
  chromeWebSecurity: false,
});
