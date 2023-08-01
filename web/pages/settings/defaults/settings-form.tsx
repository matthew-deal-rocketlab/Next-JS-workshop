import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Card,
  Form,
  FormInput,
  FormLabel,
  FormRow,
  FormTitle,
} from '@/components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface formFields {
  language: string;
  subscription: string;
}

const initialFormFields: formFields = {
  language: '',
  subscription: '',
};

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: formFields): formFields | null => {
  let hasErrors = false;
  let result = initialFormFields;

  return hasErrors ? result : null;
};

const SettingsForm = () => {
  const [formErrors, setFormErrors] = useState(initialFormFields);

  const onClickLogin = (event: FormEvent<HTMLFormElement>) => {
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
    // push('/dashboard');

    // prevent default form submission
    event.preventDefault();
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={onClickLogin}>
          <FormRow align="center">
            <FormTitle>User Defaults</FormTitle>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="language">Language</FormLabel>
            <FormInput
              type="text"
              id="language"
              name="language"
              error={formErrors.language}
            />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="subscription">Current Subscription</FormLabel>
            <FormInput
              type="text"
              id="subscription"
              name="subscription"
              error={formErrors.subscription}
            />
          </FormRow>

          <FormRow fullwidth={false} align="center" style={{ marginTop: '2em' }}>
            <Button variant="medium" type="submit">
              Update
            </Button>
          </FormRow>
        </Form>
      </Card>
    </Container>
  );
};

export default SettingsForm;
