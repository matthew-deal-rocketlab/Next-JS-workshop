import React from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';

interface LabelProps {
  htmlFor: string;
  children: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props => props.theme.colors.labelText};
  font-family: ${themeStatic.font};
`;

const FormLabel = ({ htmlFor, ...restProps }: LabelProps) => {
  return <StyledLabel htmlFor={htmlFor} {...restProps} />;
};

export default FormLabel;
