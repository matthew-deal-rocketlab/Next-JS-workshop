import React, { FormEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

interface FormProps {
  id?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

const Form = ({ children, ...restProps }: FormProps) => {
  return <form {...restProps}>{children}</form>;
};

export default Form;
