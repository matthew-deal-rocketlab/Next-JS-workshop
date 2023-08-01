import * as React from 'react';
import { useRouter } from 'next/router';

import { isEmail } from '@/utils/validators';
import {
  Button,
  Card,
  Form,
  FormInput,
  FormLabel,
  FormRow,
  FormTitle,
  PageLayoutFullPage,
} from '@/components';

interface formFields {
  email: string;
  pass: string;
}

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: formFields): formFields | null => {
  let hasErrors = false;
  let result = { email: '', pass: '' };

  // check email
  if (!inputs.email) {
    hasErrors = true;
    result.email = 'Email can not be empty';
  } else if (!isEmail(inputs.email)) {
    hasErrors = true;
    result.email = 'Invalid Email';
  }

  // Check password
  if (!inputs.pass) {
    hasErrors = true;
    result.pass = 'Password can not be empty';
  } else if (result.pass.length < 8) {
    hasErrors = true;
    result.pass = 'Password must be at least 8 characters';
  }

  return hasErrors ? result : null;
};

const LoginPage = () => {
  const { push } = useRouter();
  const [formErrors, setFormErrors] = React.useState({ email: '', pass: '' });

  const onClickLogin = (event: React.FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown;
    console.log('data', data);

    const formErrorMessages = validateInputs(data as formFields);
    console.log('formErrorMessages', formErrorMessages);
    if (formErrorMessages !== null) {
      setFormErrors(formErrorMessages);
    }

    // Submit form data and catch errors in the response
    push('/dashboard');

    // prevent default form submission
    event.preventDefault();
  };

  return (
    <PageLayoutFullPage>
      <Card>
        <Form onSubmit={onClickLogin}>
          <FormRow align="center">
            <FormTitle>Login</FormTitle>
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              error={formErrors.email}
            />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="pass">Password</FormLabel>
            <FormInput
              type="password"
              id="pass"
              name="pass"
              required
              error={formErrors.pass}
            />
          </FormRow>

          <FormRow style={{marginTop:'1em'}}>
            <span>Do not have an account? <a href="/signup">signup</a></span>
          </FormRow>

          <FormRow style={{marginTop:'1em'}}>
            <span>Forgot password? <a href="/forgot-password">reset it</a></span>
          </FormRow>

          <FormRow fullwidth={false} align="center" style={{marginTop:'2em'}}>
            <Button variant="medium" type="submit">
              Submit
            </Button>
          </FormRow>
        </Form>
      </Card>
    </PageLayoutFullPage>
  );
};

export default LoginPage;
