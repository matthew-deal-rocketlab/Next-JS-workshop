// TODO

import { useContext } from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';
import { UiContext } from '@/context/ui-context';
import { ISimpleProps } from '../types';
import { Drawer, Footer, Navbar } from '..';

// write a container for the content of the page that will be passed in as a prop to this component with max widf of 1440 and min height of 100vh
const ContentContainer = styled.div`
  max-width: 1440px;
  min-height: calc(100vh - 150px);
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
  padding: 20px;
`;
const GlobalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  width: 100%;
  height: 100%;
  margin: 0;
`;
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${themeStatic.zIndex.three};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  transition: opacity 0.5s;
`;

const PageLayout3Part = (props: ISimpleProps) => {
  const uiData = useContext(UiContext);
  const { isDrawerOpen, setUiData } = uiData;
  const handleOverlayClick = () => {
    setUiData({ ...uiData, isDrawerOpen: false });
  };
  return (
    <GlobalContainer>
      {isDrawerOpen && <OverlayContainer onClick={handleOverlayClick} />}
      <Navbar />
      <Drawer position="left" />
      <ContentContainer>Content</ContentContainer>
      <Footer />
    </GlobalContainer>
  );
};

export default PageLayout3Part;
