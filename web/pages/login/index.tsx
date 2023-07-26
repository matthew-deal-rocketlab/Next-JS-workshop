import * as React from 'react';
import { useRouter } from 'next/router';

import PageLayoutFullPage from '@/components/page-layouts/page-layout-fullpage';
import Card from '@/components/card';
import Form from '@/components/form';
import FormRow from '@/components/form/field';
import FormLabel from '@/components/form/label';
import FormInput from '@/components/form/input';
import Button from '@/components/button';
import { isEmail } from '@/utils/validators';
import FormTitle from '@/components/form/title';

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

          <FormRow fullwidth={false} align="center">
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
