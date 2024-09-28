const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8091/api',
		specPattern: 'cypress/e2e/**/*.feature',
		log: true,
		setupNodeEvents(on, config) {
			on('file:preprocessor', cucumber())
			return config
		},
	},
})
