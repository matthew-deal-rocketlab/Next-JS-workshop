import React from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';

interface LabelProps {
  children: string;
}

const StyledTitle = styled.h3<LabelProps>`
  color: ${props => props.theme.colors.primary};
  font-family: ${themeStatic.font.inter};
  margin: 5px 0;
`;

const FormTitle = ({ ...restProps }: LabelProps) => {
  return <StyledTitle {...restProps} />;
};

export default FormTitle;
