describe('Login Tests', () => {
  
  describe('Login Validation', () => {
    it('should show validation errors with empty inputs', () => {
      cy.visit(Cypress.env('LOGIN_URL'));

      cy.contains('Log in').click();
      cy.contains('Email can not be empty');
      cy.contains('Password can not be empty');
    });
  });

  describe('Login Fail', () => {
    it('Checks for an error if password is incorrect', () => {
      cy.intercept('POST', Cypress.env('API_URL')).as('loginRequest');

      cy.visit(Cypress.env('LOGIN_URL'));

      cy.get('#email').type(Cypress.env('TEST_EMAIL'));
      cy.get('#password').type('Rocket23s');

      cy.contains('Log in').click();
      
      cy.wait('@loginRequest').then((interception) => {
        const responseBody = interception?.response?.body;

        if (responseBody.authLogin === 'invalid credentials') {
          cy.contains('invalid credentials');
        }
      });
    });
  });

  
  describe('Login Flow', () => {
    it('should handle login flow', () => {
      cy.intercept('POST', Cypress.env('API_URL')).as('loginRequest');

      cy.visit(Cypress.env('LOGIN_URL'));

      cy.get('#email').type(Cypress.env('TEST_EMAIL'));
      cy.get('#password').type('Rocket23');

      cy.contains('Log in').click();

      cy.wait('@loginRequest').then((interception) => {
        const responseBody = interception?.response?.statusCode === 200;
        if (responseBody === true) {
          cy.contains('Welcome! You will be redirected to the dashboard shortly');
          cy.url().should('include', '/dashboard');
        } 
      });
    });
  });

});
