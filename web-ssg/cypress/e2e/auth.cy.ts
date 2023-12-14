describe('Auth Tests', () => {
  describe('Signup Validation', () => {
    it('should show validation errors with empty inputs', () => {
      cy.visit(Cypress.env('SIGNUP_URL'))

      cy.get('#signup').click()

      cy.contains('Firstname can not be empty')
      cy.contains('Email can not be empty')
      cy.contains('Password can not be empty')
      cy.contains('Confirm password can not be empty')
    })
  })

  describe('Signup Flow', () => {
    it('should handle signup flow', () => {
      cy.intercept('POST', Cypress.env('API_URL')).as('signupRequest')

      cy.visit(Cypress.env('SIGNUP_URL'))

      cy.get('#firstname').type('Matt')
      cy.get('#email').type(Cypress.env('TEST_EMAIL'))
      cy.get('#password').type('Rocket23')
      cy.get('#confirmPass').type('Rocket23')

      cy.get('#signup').click()

      cy.wait('@signupRequest').then(interception => {
        const responseBody = interception.response?.body

        // Check if the response body contains the message indicating an existing email
        if (responseBody && responseBody.authSignup === 'email already exists') {
          cy.contains('email already exists')
        } else if (responseBody?.successMessage) {
          // Check for a success message or any other positive indicator in the response
          cy.contains('Welcome! Check your email to continue')
        }
      })
    })
  })

  describe('Login Validation', () => {
    it('should show validation errors with empty inputs', () => {
      cy.visit(Cypress.env('LOGIN_URL'))

      cy.contains('Log in').click()
      cy.contains('Email can not be empty')
      cy.contains('Password can not be empty')
    })
  })

  describe('Login Fail', () => {
    it('Checks for an error if password is incorrect', () => {
      cy.intercept('POST', Cypress.env('API_URL')).as('loginRequest')

      cy.visit(Cypress.env('LOGIN_URL'))

      cy.get('#email').type(Cypress.env('TEST_EMAIL'))
      cy.get('#password').type('Rocket23s')

      cy.contains('Log in').click()

      cy.wait('@loginRequest').then(interception => {
        const responseBody = interception?.response?.body

        if (responseBody.authLogin === 'invalid credentials') {
          cy.contains('invalid credentials')
        }
      })
    })
  })

  describe('Login Flow', () => {
    it('should handle login flow', () => {
      cy.intercept('POST', Cypress.env('API_URL')).as('loginRequest')

      cy.visit(Cypress.env('LOGIN_URL'))

      cy.get('#email').type(Cypress.env('TEST_EMAIL'))
      cy.get('#password').type('Rocket23')

      cy.contains('Log in').click()

      cy.wait('@loginRequest').then(interception => {
        const token = interception.response?.body.authLogin.token
        // Set the token as an environment variable
        Cypress.env('authToken', token)

        const responseBody = interception?.response?.statusCode === 200
        if (responseBody) {
          cy.contains('Welcome! You will be redirected to the dashboard shortly')
          cy.url().should('include', '/dashboard')
        }
      })
    })
  })

  describe('Remove user', () => {
    it('should delete the test user', () => {
      const email = Cypress.env('TEST_EMAIL') // User email to delete
      const token = Cypress.env('authToken') // Retrieve the token

      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}`,
        body: {
          deleteUser: {
            email,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-type': 'application/json',
          'x-api-key': 'c37861c7-7414-4a40-bbd8-3343662e4483',
        },
      }).then(response => {
        expect(response.status).to.eq(200)

        console.log('response', response)
        console.log('response.body', response.body)
      })
    })
  })
})
