describe('signup Tests', () => {

    describe ('Signup Validation', () => {
            it('should show validation errors with empty inputs', () => {
             cy.visit( Cypress.env('SIGNUP_URL'));
        
              cy.get('#signup').click();

              cy.contains('Firstname can not be empty');
              cy.contains('Email can not be empty');
              cy.contains('Password can not be empty');
              cy.contains('Confirm password can not be empty');
            });
          });


          describe('Signup Flow', () => {
            it('should handle signup flow', () => {
              cy.intercept('POST', Cypress.env('API_URL')).as('signupRequest');
          
              cy.visit( Cypress.env('SIGNUP_URL'));
          
              cy.get('#firstname').type('Matt');
              cy.get('#email').type(Cypress.env('TEST_EMAIL'));
              cy.get('#password').type('Rocket23');
              cy.get('#confirmPass').type('Rocket23');
          
              cy.get('#signup').click();
          
              cy.wait('@signupRequest').then((interception) => {
                const responseBody = interception.response?.body;
                
                // Check if the response body contains the message indicating an existing email
                if (responseBody && responseBody.authSignup === 'email already exists') {
                  cy.contains('email already exists');
                } else if (responseBody && responseBody.successMessage) {
                  // Check for a success message or any other positive indicator in the response
                  cy.contains('Welcome! Check your email to continue');
                }
              });
            });
          });
}); 


