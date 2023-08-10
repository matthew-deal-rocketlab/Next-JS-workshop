import { themeStatic } from '@/theme';
import styled from 'styled-components';

interface LabelProps {
  htmlFor: string;
  children: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props => props.theme.colors.primary};
  font-family: ${themeStatic.font.inter};
  font-size: ${themeStatic.fontSizes.normal};
`;

const FormLabel = ({ htmlFor, ...restProps }: LabelProps) => {
  return <StyledLabel htmlFor={htmlFor} {...restProps} />;
};

export default FormLabel;
