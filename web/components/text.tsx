import { themeStatic } from '@/theme';
import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';

interface ITextElement extends React.HTMLProps<HTMLParagraphElement> {
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  align?: string;
  margin?: string;
  padding?: string;
}

const StyledText = styled.p<ITextElement>`
  color: ${({ color, theme }) => color || theme.colors.dark2};
  font-size: ${({ fontSize }) => fontSize || themeStatic.fontSizes.small};
  font-weight: ${({ fontWeight }) =>
    fontWeight || themeStatic.fontWeights.normal};
  text-align: ${({ align }) => align || 'left'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;
const Text = ({ children, align, margin, ...rest }: ITextElement) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
