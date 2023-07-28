import * as React from 'react';

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
  username: string;
  confirmPass: string;
}
const initialFormFields: formFields = {
  email: '',
  pass: '',
  username: '',
  confirmPass: '',
};
// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: formFields): formFields | null => {
  let hasErrors = false;
  let result = initialFormFields;

  // check email
  if (!inputs.email) {
    hasErrors = true;
    result.email = 'Email can not be empty';
  } else if (!isEmail(inputs.email)) {
    hasErrors = true;
    result.email = 'Invalid Email';
  }
  // check username
  if (!inputs.username) {
    hasErrors = true;
    result.username = 'User name can not be empty';
  }

  // Check password
  if (!inputs.pass) {
    hasErrors = true;
    result.pass = 'Password can not be empty';
  } else if (inputs.pass.length < 8) {
    console.log('Password', result.pass.length);
    hasErrors = true;
    result.pass = 'Password must be at least 8 characters';
  }
  // Check confirm password
  if (!inputs.confirmPass) {
    hasErrors = true;
    result.confirmPass = 'Confirm password can not be empty';
  } else if (inputs.confirmPass.length < 8) {
    hasErrors = true;
    result.confirmPass = 'Confirm password must be at least 8 characters';
  } else if (inputs.confirmPass !== inputs.pass) {
    hasErrors = true;
    result.confirmPass = 'Confirm password must match password';
  }

  //

  return hasErrors ? result : null;
};

const SignupPage = () => {
  const [formErrors, setFormErrors] =
    React.useState<formFields>(initialFormFields);

  const onClickSignUp = (event: React.FormEvent<HTMLFormElement>) => {
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

    // prevent default form submission
    event.preventDefault();
  };

  return (
    <PageLayoutFullPage>
      <Card>
        <Form onSubmit={onClickSignUp}>
          <FormRow align="center">
            <FormTitle>Signup</FormTitle>
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="">User name</FormLabel>
            <FormInput
              type="text"
              id="username"
              name="username"
              error={formErrors.username}
            />
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

          <FormRow>
            <FormLabel htmlFor="pass">Confirm password</FormLabel>
            <FormInput
              type="password"
              id="confirmPass"
              name="confirmPass"
              required
              error={formErrors.confirmPass}
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

export default SignupPage;
