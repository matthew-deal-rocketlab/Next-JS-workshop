import styled from 'styled-components';
import { ISimpleProps } from '../types';
// it is possible here add a aprop to change the background
const StyledPageFull = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #bfd7ea; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #bfd7ea,
    #508ca4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    ${props => props.theme.colors.tertiary},
    ${props => props.theme.colors.primary}
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const PageLayoutFullPage = (props: ISimpleProps) => {
  return <StyledPageFull>{props.children}</StyledPageFull>;
};

export default PageLayoutFullPage;
