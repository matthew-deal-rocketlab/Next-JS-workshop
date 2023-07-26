import styled from 'styled-components';
import { themeStatic } from '@/theme';

const Label = styled.div`
  font-size: ${themeStatic.fontSizes.medium};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
`;
const FooterContainer = styled.nav`
  height: 80px;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark2};
`;
const Title = styled.div`
  font-size: ${themeStatic.fontSizes.medium};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${themeStatic.fontWeight.bold};
  padding: 0 20px;
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
