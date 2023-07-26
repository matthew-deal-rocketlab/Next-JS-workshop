import styled from 'styled-components';
import { themeStatic } from '@/theme';

const Label = styled.div`
  font-size: ${themeStatic.fontSizes.medium};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 10px;
`;
const FooterContainer = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark2};
  padding: 10px 40px;
`;
const Title = styled.div`
  font-size: ${themeStatic.fontSizes.medium};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${themeStatic.fontWeight.bold};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>2023 | Rocket Lab.</Title>
      <Label>Contact us</Label>
    </FooterContainer>
  );
};

export default Footer;
