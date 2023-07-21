// TODO

import styled from 'styled-components';
import Footer from '../footer';
import Navbar from '../navbar';
import { ISimpleProps } from '../types';

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

const PageLayout3Part = (props: ISimpleProps) => {
  return (
    <GlobalContainer>
      <Navbar />
      <ContentContainer>Content</ContentContainer>
      <Footer />
    </GlobalContainer>
  );
};

export default PageLayout3Part;
