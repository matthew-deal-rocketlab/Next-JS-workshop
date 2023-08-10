import { themeStatic } from '@/theme';
import styled from 'styled-components';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name?: string;
  error?: string;
  type: 'text' | 'password' | 'email' | 'number';
}

const StyledInputContainer = styled.div`
  display: inline;
  font-family: ${themeStatic.font.inter};
  width: 100%;
`;

const StyledInput = styled.input<InputProps>`
  padding-left: 5px;
  padding-right: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${props => props.theme!.colors.tertiary};
  border-radius: 4px;
  width: calc(100% - 7px);
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
  color: ${props => props.theme!.colors.error.main};
  font-family: ${themeStatic.font.inter};
  font-size: ${themeStatic.fontSizes.mini};
`;

const FormInput = ({
  id,
  name,
  type = 'text',
  error = '',
  ...restProps
}: InputProps) => {
  return (
    <StyledInputContainer id={`${id}-container`}>
      <StyledInput id={id} name={name || id} {...restProps} type={type} />
      {error && <StyledError>{error}</StyledError>}
    </StyledInputContainer>
  );
};

export default FormInput;
