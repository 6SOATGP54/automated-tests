const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8091/api",
    setupNodeEvents(on, config) {

      return config;
    },
  },
});
