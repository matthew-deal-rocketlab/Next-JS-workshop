import { FormEvent, FormEventHandler, ReactNode } from 'react';

interface FormProps {
  id?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

const Form = ({ onSubmit, children, ...restProps }: FormProps) => {

  const onSubmitWrapper = (event: FormEvent<HTMLFormElement>) => {
    if (typeof onSubmit == 'function') {
      event.preventDefault();
      onSubmit(event);
    }
  }

  return <form onSubmit={onSubmitWrapper} {...restProps}>{children}</form>;
};

export default Form;
