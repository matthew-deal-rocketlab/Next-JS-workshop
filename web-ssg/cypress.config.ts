import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    API_URL: 'http://localhost:5001/api/jsonql',
    TEST_EMAIL: 'testuser@rocketlab.com.au',
    LOGIN_URL: 'auth/login',
    SIGNUP_URL: 'auth/signup',
  },
  e2e: {
    baseUrl: 'http://localhost:5003',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
