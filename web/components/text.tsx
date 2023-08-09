import React from 'react';
import styled from 'styled-components';

interface ITextElement extends React.HTMLProps<HTMLParagraphElement> {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  align?: string;
  margin?: string;
  padding?: string;
}

const StyledText = styled.p<ITextElement>`
  color: ${({ color, theme }) => color || theme.colors.dark2};
  font-size: ${({ fontSize, theme }) => fontSize || theme.fontSizes.small};
  font-weight: ${({ fontWeight, theme }) => fontWeight || theme.fontWeights.normal};
  text-align: ${({ align }) => align || 'left'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;
const Text = ({ children, ...rest }: ITextElement) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
