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
  PageLayoutFullPage,
  Text,
} from '@/components';
import { SubmitResult, SubmitResultType } from '@/types.d';
import { apiPost } from '@/utils/api-client';
import styled, { useTheme } from 'styled-components';
import { ApiStatus } from '@/services/apiclient';
import { IAlertMessage } from '@/components/alert';
import { themeStatic } from '@/theme';

interface FormFields {
  email: string;
}

const initialFormFields: FormFields = {
  email: '',
};

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: FormFields): FormFields | null => {
  let hasErrors = false;
  let result = { ...initialFormFields };
  // check email
  if (!inputs.email) {
    hasErrors = true;
    result.email = 'Email can not be empty';
  } else if (!isEmail(inputs.email)) {
    hasErrors = true;
    result.email = 'Invalid Email';
  }
  return hasErrors ? result : null;
};

const submitFormData = async (data: FormFields): Promise<SubmitResult> => {
  const obscureMessage =
    'If your address exists in our system, an email will be sent with further instructions';
  const payload = { authForgotPassword: { ...data } };
  const forgotPasswordResult = await apiPost('/jsonql', payload);

  if (forgotPasswordResult.status !== ApiStatus.OK) {
    return { text: 'Error forgot password', type: SubmitResultType.error };
  }

  // @ts-ignore
  const authForgotPassword = forgotPasswordResult.result['authForgotPassword'];

  if (!(authForgotPassword.result && authForgotPassword.result === 'ok')) {
    // This is when email does not exists or error, for security we always return a success type message
    return { text: `${obscureMessage}`, type: SubmitResultType.ok };
  }

  return {
    text: obscureMessage,
    type: SubmitResultType.ok,
  };
};

const TextContainer = styled.div`
  margin: 1em 0;
`;

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [formErrors, setFormErrors] = React.useState(initialFormFields);
  const [alert, setAlert] = React.useState<IAlertMessage>({
    message: '',
    type: 'success',
  });

  const onClickReset = async (event: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const result = await submitFormData(formData);
      if (result.type === SubmitResultType.error) {
        setAlert({ message: result.text, type: 'error' });
        return;
      }
      setAlert({ message: result.text, type: 'success' });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  const onAlertClose = () => {
    setAlert({ message: '', type: 'success' });
  };
  return (
    <PageLayoutFullPage>
      <Card>
        <Form onSubmit={onClickReset}>
          <FormRow align="left">
            <FormTitle>{`Don't remember your password?`}</FormTitle>
          </FormRow>
          <TextContainer>
            <Text
              fontWeight={themeStatic.fontWeights.bold}
              fontSize={themeStatic.fontSizes.normal}>
              No worries!
            </Text>
            <Text>
              {` Enter your email below and we'll send you an email with
              instructions on how to reset your password.`}
            </Text>
          </TextContainer>
          <FormRow>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              error={formErrors.email}
            />
          </FormRow>

          <FormRow style={{ marginTop: '1em' }}>
            <Text>
              Remember Password?<LinkText href="/login">Back to login</LinkText>
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
              Reset
            </Button>
          </FormRow>
        </Form>
      </Card>
    </PageLayoutFullPage>
  );
};

export default ForgotPasswordPage;
