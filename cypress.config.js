const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
	e2e: {
		//baseUrl: 'http://localhost:8091/api',
		baseUrl: 'https://2de6-186-220-40-123.ngrok-free.app/api',
		specPattern: 'cypress/e2e/**/*.feature',
		log: true,
		setupNodeEvents(on, config) {
			on('file:preprocessor', cucumber())
			return config
		},
	},
})
