import React, { useState } from 'react';
import styled from 'styled-components';
import { menuItems } from '@/utils/data';
import { IMenuItem } from './types';

const Label = styled.div`
  font-size: 14px;
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
  border-left: 1px solid #212529;
  border-right: 1px solid #212529;
`;
const Title = styled.div`
  font-size: 16px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 700;
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
