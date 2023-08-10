import { themeStatic } from '@/theme';
import Link from 'next/link';
import styled from 'styled-components';

interface ILinkElement extends React.HTMLProps<typeof Link> {
  href: string;
  fontSize?: string;
  overColor?: string;
  margin?: string;
  padding?: string;
  align?: string;
  weight?: string;
}

const StyledLink = styled(Link)<ILinkElement>`
  color: ${({ color, theme }) => color || theme.colors.info.dark};
  font-size: ${({ fontSize }) => fontSize || themeStatic.fontSizes.small};
  font-weight: ${({ weight }) => weight || themeStatic.fontWeights.normal};
  text-align: ${({ align }) => align || 'left'};
  margin: ${({ margin }) => margin || '0 0 0 5px'};
  padding: ${({ padding }) => padding || '0'};
  &:hover {
    color: ${({ overColor, theme }) => overColor || theme.colors.info.main};
`;

const LinkText = ({ children, href, ...rest }: ILinkElement) => {
  return (
    <StyledLink href={href} {...rest}>
      {children}
    </StyledLink>
  );
};

export default LinkText;
