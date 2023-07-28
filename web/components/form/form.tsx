import { FormEventHandler, ReactNode } from 'react';

interface FormProps {
  id?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

const Form = ({ children, ...restProps }: FormProps) => {
  return <form {...restProps}>{children}</form>;
};

export default Form;
