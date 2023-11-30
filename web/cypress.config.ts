import { defineConfig } from "cypress";

export default defineConfig({
  

  env: {
 
    API_URL: "http://localhost:5001/api/jsonql",
    // change email to test a new user, or use an existing one to see the test fail successfully.  
    TEST_EMAIL: 'matthew.deal+6@rocketlab.com.au',
    LOGIN_URL: 'auth/login',
    SIGNUP_URL: 'auth/signup'
  },
  e2e: {
    baseUrl: "http://localhost:5003",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
