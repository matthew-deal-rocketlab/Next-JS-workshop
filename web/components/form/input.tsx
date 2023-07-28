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
