import React from 'react'
import styled from 'styled-components';

import { themeStatic } from '@/theme';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  error?: string;
  type: 'text' | 'password' | 'email' | 'number';
}

const StyledInputContainer = styled.div`
  display: inline;
  font-family: ${themeStatic.font.inter};
  width: 100%;
`;

const StyledInput = styled.input<InputProps>`
  border: 1px solid ${props => props.theme!.colors.tertiary};
  border-radius: 4px;
  width: 100%;
  height: 20px;
  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme!.colors.primary};
  }
  &::placeholder {
    color: ${props => props.theme!.colors.tertiary};
  }
`;

const StyledError = styled.div`
  color: ${props => props.theme!.colors.error};
  font-family: ${themeStatic.font.inter};
  font-size: ${themeStatic.fontSizes.mini};
`;

const FormInput = ({
  id,
  name = '',
  type = 'text',
  error = '',
  ...restProps
}: InputProps) => {
  return (
    <StyledInputContainer id={`${id}-container`}>
      {error && <StyledError>{error}</StyledError>}
      <StyledInput id={id} name={name || id} {...restProps} type={type} />
    </StyledInputContainer>
  );
};

export default FormInput;
