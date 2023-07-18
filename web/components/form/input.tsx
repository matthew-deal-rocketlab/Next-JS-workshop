import React from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';

interface InputProps {
  id: string;
  name?: string;
  type?: string;
  error?: string;
  required?: boolean;
}

const StyledInputContainer = styled.div<InputProps>`
  display: flex;
  font-family: ${themeStatic.font};
`;

const StyledInput = styled.input<InputProps>`
  flex: 1;
`;

const StyledError = styled.div`
  color: ${props => props.theme!.colors.error};
  font-family: ${themeStatic.font};
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
      <StyledInput id={id} name={name || id} {...restProps} />
      {error && <StyledError>{error}</StyledError>}
    </StyledInputContainer>
  );
};

export default FormInput;
