import { IBaseText } from '@/types';
import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p<IBaseText>`
  color: ${({ $color, theme }) => $color || theme.colors.dark2};
  font-size: ${({ $size, theme }) => $size || theme.fontSizes.small};
  font-weight: ${({ $weight, theme }) => $weight || theme.fontWeights.normal};
  text-align: ${({ $align }) => $align || 'left'};
  margin: ${({ $margin }) => $margin || '0'};
  padding: ${({ $padding }) => $padding || '0'};
`;
const Text = ({ children, ...rest }: IBaseText) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
