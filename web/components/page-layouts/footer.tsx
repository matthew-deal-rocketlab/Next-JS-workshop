import { themeStatic } from '@/theme';
import styled from 'styled-components';

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
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.7);
`;
const Title = styled.div`
  font-size: ${themeStatic.fontSizes.medium};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${themeStatic.fontWeights.bold};
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
