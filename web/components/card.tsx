import React from 'react';
import styled from 'styled-components';

import { ISimpleProps } from './types';
import { themeStatic } from '@/theme';

const StyledCard = styled.div<ISimpleProps>`
  width: 30vw;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    width: 260px;
  }
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
`;

const Card = (props: ISimpleProps) => {
  return <StyledCard x-name="Card" {...props} />;
};

export default Card;
