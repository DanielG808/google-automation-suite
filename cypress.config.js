const { defineConfig } = require("cypress");
require("dotenv").config()

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.google.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
});
