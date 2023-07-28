import styled from 'styled-components';

import { ISimpleProps } from '../types';
import { Footer, Navbar, Sidebar } from '..';

// write a container for the content of the page that will be passed in as a prop to this component with max widf of 1440 and min height of 100vh
const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 150px);
  background-color: ${({ theme }) => theme.colors.light};
  margin: 0 auto;
  padding: 20px;
`;
const GlobalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  width: 100%;
  height: 100%;
  margin: 0;
`;

const Grid = styled.div`
  width: 100%;
  min-height: calc(100vh - 150px);
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 100%;
`;

const PageLayout4Part = (props: ISimpleProps) => {
  return (
    <GlobalContainer>
      <Navbar />
      <Grid>
        <Sidebar />
        <ContentContainer>Content</ContentContainer>
      </Grid>
      <Footer />
    </GlobalContainer>
  );
};

export default PageLayout4Part;
