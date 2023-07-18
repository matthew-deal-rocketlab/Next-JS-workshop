import React, { ReactNode, ReactPropTypes } from 'react';
import styled from 'styled-components';
import { ISimpleProps } from '../types';

const StyledPageFull = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageLayoutFullPage = (props: ISimpleProps) => {
  return <StyledPageFull>{props.children}</StyledPageFull>;
};

export default PageLayoutFullPage;
