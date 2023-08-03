import styled from 'styled-components';

import { ICommonProps } from '@/types.d';
import { themeStatic } from '@/theme';

// Note default width can be override with inline style
// example: <Card style={{ width: '640px' }}>

const StyledCard = styled.div<ICommonProps>`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const Card = (props: ICommonProps) => {
  return <StyledCard x-name="Card" {...props} />;
};

export default Card;
