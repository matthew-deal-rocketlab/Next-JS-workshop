import { ILinkText } from '@/types';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled(Link)<ILinkText>`
  color: ${({ $color, theme }) => $color || theme.colors.info.dark};
  font-size: ${({ $size, theme }) => $size || theme.fontSizes.small};
  font-weight: ${({ $weight, theme }) => $weight || theme.fontWeights.normal};
  text-align: ${({ $align }) => $align || 'left'};
  margin: ${({ $margin }) => $margin || '0 0 0 5px'};
  padding: ${({ $padding }) => $padding || '0'};
  &:hover {
    color: ${({ $overColor, theme }) => $overColor || theme.colors.info.main};
`;

const LinkText = ({ children, href, ...rest }: ILinkText) => {
  return (
    <StyledLink href={href} {...rest}>
      {children}
    </StyledLink>
  );
};

export default LinkText;
