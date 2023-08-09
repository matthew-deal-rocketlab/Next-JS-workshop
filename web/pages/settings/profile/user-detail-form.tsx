import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import {
  Alert,
  Button,
  Card,
  Form,
  FormInput,
  FormLabel,
  FormRow,
  FormTitle,
  Modal,
  Select,
} from '@/components';
import { isEmail } from '@/utils/validators';
import { themeStatic } from '@/theme';
import { IAlertMessage } from '@/types';
import { countries, countriesTemp } from '@/utils/countries';

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    display: block;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface formFields {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

const initialFormFields: formFields = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
};
const initialAlertMessage: IAlertMessage = {
  type: 'error',
  message: '',
};
// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: formFields): formFields | null => {
  let hasErrors = false;
  let result = initialFormFields;

  if (!inputs.firstName) {
    hasErrors = true;
    result.firstName = 'First name can not be empty';
  }
  if (!inputs.lastName) {
    hasErrors = true;
    result.lastName = 'Last name can not be empty';
  }
  // check email
  if (!inputs.email) {
    hasErrors = true;
    result.email = 'Email can not be empty';
  } else if (!isEmail(inputs.email)) {
    hasErrors = true;
    result.email = 'Invalid Email';
  }
  if (!inputs.address) {
    hasErrors = true;
    result.address = 'Address can not be empty';
  }
  if (!inputs.city) {
    hasErrors = true;
    result.city = 'City can not be empty';
  }
  if (!inputs.state) {
    hasErrors = true;
    result.state = 'State can not be empty';
  }
  if (!inputs.postcode) {
    hasErrors = true;
    result.postcode = 'Postcode can not be empty';
  }
  if (!inputs.country) {
    hasErrors = true;
    result.country = 'Country can not be empty';
  }

  return hasErrors ? result : null;
};

const UserDetailForm = () => {
  const [formErrors, setFormErrors] = useState(initialFormFields);
  const [alertMessage, setAlertMessage] = useState(initialAlertMessage);
  const [showModal, setShowModal] = useState(false);
  const closeAlert = () => setAlertMessage({ type: 'success', message: '' });

  const onClickLogin = (event: FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown as formFields;

    const formErrorMessages = validateInputs(data);

    if (formErrorMessages !== null) {
      // Need to create new object or Reactjs will not detect a changes
      setFormErrors(Object.assign({}, formErrorMessages));
      return;
    }

    // Submit form data and catch errors in the response
    // setAlert to success or error
  };

  const onCancel = () => {
    setShowModal(false);
    console.log('cancel');
  };
  const onConfirm = () => {
    setShowModal(false);
    console.log('confirm');
  };
  return (
    <Container>
      <Card>
        {/* Display alert message if there is one */}
        {alertMessage.message && (
          <Alert type={alertMessage.type} onClose={closeAlert}>
            {alertMessage.message}
          </Alert>
        )}

        <Form onSubmit={onClickLogin}>
          <FormRow align="center">
            <FormTitle>Profile Details</FormTitle>
          </FormRow>
          <NameContainer>
            <FormRow width="45%">
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <FormInput
                type="text"
                id="firstName"
                name="firstName"
                error={formErrors.firstName}
              />
            </FormRow>
            <FormRow width="45%">
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <FormInput
                type="text"
                id="lastName"
                name="lastName"
                error={formErrors.lastName}
              />
            </FormRow>
          </NameContainer>
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
            <FormLabel htmlFor="address">Address</FormLabel>
            <FormInput
              type="text"
              id="address"
              name="address"
              error={formErrors.address}
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="city">City</FormLabel>
            <FormInput
              type="text"
              id="city"
              name="city"
              error={formErrors.city}
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="state">State</FormLabel>
            <FormInput
              type="text"
              id="state"
              name="state"
              error={formErrors.state}
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="postcode">Postcode</FormLabel>
            <FormInput
              type="number"
              id="postcode"
              name="postcode"
              error={formErrors.postcode}
            />
          </FormRow>
          <FormRow>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Select
              id="country"
              label="Choose country"
              values={countriesTemp}
              onChange={country => console.log(country)}
            />
          </FormRow>

          <FormRow
            fullwidth={false}
            align="center"
            style={{ marginTop: '2em' }}>
            <Button variant="medium" type="submit">
              Update
            </Button>
          </FormRow>
        </Form>
        <Button variant="medium" onClick={() => setShowModal(true)}>
          Show Modal
        </Button>

        <Modal
          title="Testing"
          description="Delete all your data?"
          showModal={showModal}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Card>
    </Container>
  );
};

export default UserDetailForm;
