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
  Select,
} from '@/components';
import { KeyValue } from '@/types';



const frequencyOptions: KeyValue<string>[] = [
  { key: 'hourly', value: 'Hourly' },
  { key: 'daily', value: 'Daily' },
  { key: 'weekly', value: 'Weekly' },
]

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface FormFields {
  frequency: string;
  time: string;
  alertEmail: string;
}

const initialFormFields: FormFields = {
  frequency: '',
  time: '',
  alertEmail: '',
};

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: FormFields): FormFields | null => {
  let hasErrors = false;
  let result = initialFormFields;

  return hasErrors ? result : null;
};

const SitesSettingsForm = () => {
  const [formErrors, setFormErrors] = useState(initialFormFields);

  const onClickLogin = (event: FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown;

    console.log('data', data);

    const formErrorMessages = validateInputs(data as FormFields);
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
            <FormTitle>Site Settings</FormTitle>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="frequency">Frequency</FormLabel>
            <Select id="frequency" label="test" values={frequencyOptions} onChange={() => { }} />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="time">Time</FormLabel>
            <FormInput
              type="text"
              id="time"
              name="time"
              error={formErrors.time}
            />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="alertEmail">Alert Email</FormLabel>
            <FormInput
              type="email"
              id="alertEmail"
              name="alertEmail"
              placeholder="team@example.com"
              error={formErrors.alertEmail}
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

export default SitesSettingsForm;
