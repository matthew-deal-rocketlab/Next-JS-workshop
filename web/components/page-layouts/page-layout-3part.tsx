// TODO

import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { UiContext } from '@/context/ui-context';
import { ICommonProps } from '@/types';
import { Drawer, Footer, Navbar } from '..';
import { GlobalContainer } from './common';
import { themeStatic } from '@/theme';

interface ILayout3PageProps extends ICommonProps {
  onPageEnter?: Function;
}

// write a container for the content of the page that will be passed in as a prop to this component with max widf of 1440 and min height of 100vh
const ContentContainer = styled.div`
  max-width: 1440px;
  min-height: calc(100vh - 150px);
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
  padding: 20px;
`;
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => themeStatic.zIndex.three};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  transition: opacity 0.5s;
`;

const PageLayout3Part = ({ onPageEnter, children }: ILayout3PageProps) => {
  var ranOnce = false;

  const uiData = useContext(UiContext);
  const { isDrawerOpen, setUiData } = uiData;
  const handleOverlayClick = () => {
    setUiData({ ...uiData, isDrawerOpen: false });
  };

  useEffect(() => {
    if (!ranOnce && typeof onPageEnter === 'function') {
      ranOnce = true;
      onPageEnter();
    };
  }, [])

  return (
    <GlobalContainer>
      {isDrawerOpen && <OverlayContainer onClick={handleOverlayClick} />}
      <Navbar />
      <Drawer position="left" />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </GlobalContainer>
  );
};

export default PageLayout3Part;
