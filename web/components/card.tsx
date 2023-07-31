import styled from 'styled-components';

import { ISimpleProps } from './types';
import { themeStatic } from '@/theme';

interface ICardProps extends ISimpleProps {
  width?: string;
}

const StyledCard = styled.div<ICardProps>`
  width: 300px;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    width: 80%;
  }
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const Card = (props: ICardProps) => {
  return <StyledCard x-name="Card" {...props} />;
};

export default Card;
