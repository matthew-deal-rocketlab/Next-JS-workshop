import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { Footer, Navbar, Sidebar } from '..';
import { GlobalContainer } from './common';
import { ICommonProps } from '@/types';
import { themeStatic } from '@/theme';

interface ILayout4PageProps extends ICommonProps {
  sidebar: ReactElement<typeof Sidebar>;
  onPageEnter?: VoidFunction;
}

// write a container for the content of the page that will be passed in as a prop to this component with max widf of 1440 and min height of 100vh
const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 150px);
  height: 100%;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 20px;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    padding: 20px 1px;
  }
`;

const Grid = styled.div`
  width: 100%;
  min-height: calc(100vh - 150px);
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 100%;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const PageLayout4Part = ({
  sidebar,
  onPageEnter,
  children,
}: ILayout4PageProps) => {
  var ranOnce = false;

  useEffect(() => {
    if (!ranOnce && typeof onPageEnter === 'function') {
      ranOnce = true;
      onPageEnter();
    };
  }, [])

  return (
    <GlobalContainer>
      <Navbar />
      <Grid>
        {sidebar}
        <ContentContainer>{children}</ContentContainer>
      </Grid>
      <Footer />
    </GlobalContainer>
  );
};

export default PageLayout4Part;
