import * as React from 'react';
import { useRouter } from 'next/router';

import { isEmail } from '@/utils/validators';
import {
  Alert,
  Button,
  Card,
  Form,
  FormInput,
  FormLabel,
  FormRow,
  FormTitle,
  LinkText,
  Text,
  PageLayoutFullPage,
} from '@/components';
import { IAlertMessage, SubmitResult, SubmitResultType } from '@/types.d';
import { apiPost } from '@/utils/api-client';
import { ApiStatus } from '@/services/apiclient';
import { sleep } from '@/utils/misc';

interface FormFields {
  email: string;
  pass: string;
}

const initialFormFields: FormFields = {
  email: '',
  pass: '',
};

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: FormFields): FormFields | null => {
  let hasErrors = false;
  let result = { ...initialFormFields };
  console.log('inputs', inputs);
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
  } else if (inputs.pass.length < 8) {
    hasErrors = true;
    result.pass = 'Password must be at least 8 characters';
  }

  return hasErrors ? result : null;
};

const submitLoginFormData = async (data: FormFields): Promise<SubmitResult> => {
  const payload = { authLogin: { ...data } };
  const loginResult = await apiPost('/jsonql', payload);
  console.log('loginResult', loginResult);
  if (loginResult.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error };
  }

  // @ts-ignore
  const authRefreshResult = loginResult.result['authLogin'];

  if (!(authRefreshResult['token'] && authRefreshResult['token'].length > 20)) {
    return { text: `${loginResult.result}`, type: SubmitResultType.error };
  }

  // Set Auth Token HERE!!
  // console.log('loginResult', loginResult);

  return {
    text: 'Welcome! You will be redirected to the dashboard shortly',
    type: SubmitResultType.ok,
  };
};

const LoginPage = () => {
  const { push } = useRouter();
  const [formErrors, setFormErrors] = React.useState(initialFormFields);
  const [alert, setAlert] = React.useState<IAlertMessage>({
    message: '',
    type: 'success',
  });

  const onClickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    setFormErrors(initialFormFields);
    setAlert({ message: '', type: 'success' });
    const formData = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown as FormFields;

    const formErrorMessages = validateInputs(formData);
    if (formErrorMessages !== null) {
      setFormErrors(formErrorMessages);
      return;
    }

    const result = await submitLoginFormData(formData);
    if (result.type === SubmitResultType.error) {
      setAlert({ message: result.text, type: 'error' });
      return;
    }
    setAlert({ message: result.text, type: 'success' });
    await sleep(2000);
    push('/dashboard');
  };

  const onAlertClose = () => {
    setAlert({ message: '', type: 'success' });
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
          <FormRow style={{ marginTop: '1em' }}>
            <Text>
              Do not have an account?<LinkText href="/signup">Sign up</LinkText>
            </Text>
          </FormRow>
          <FormRow style={{ marginTop: '1em' }}>
            <Text>
              Forgot password?
              <LinkText href="/forgot-password">Reset it</LinkText>
            </Text>
          </FormRow>
          {alert.message && (
            <Alert type={alert.type} onClose={onAlertClose}>
              {alert.message}
            </Alert>
          )}
          <FormRow
            fullwidth={false}
            align="center"
            style={{ marginTop: '2em' }}>
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
