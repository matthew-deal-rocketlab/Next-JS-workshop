import PageLayout3Part from '@/components/page-layouts/page-layout-3part';
import React from 'react';
import styled from 'styled-components';

//create a container with a background color

const StyledContainer = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardPage = () => {
  return <PageLayout3Part>Dashboard</PageLayout3Part>;
};

export default DashboardPage;
