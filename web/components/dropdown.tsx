import styled from 'styled-components';

import { themeStatic } from '@/theme';
import { IMenuItem } from '@/types';

// ** This dropdown requires a title component and an item component **

const DropdownContainer = styled.div`
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: ${themeStatic.zIndex.two};
  border-radius: 5px;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

interface Props {
  label: string;
  link: string;
  handleDropdownItemClick: (item: IMenuItem) => void;
  items: IMenuItem[];
  titleComponent: React.ComponentType<any>; //if you want to type this, you can use typeof on the parent component and export the type
  itemComponent: React.ComponentType<any>; //if you want to type this, you can use typeof on the parent component and export the type
}
const Dropdown = ({
  label,
  link,
  handleDropdownItemClick,
  items,
  titleComponent: Title,
  itemComponent: Item,
}: Props) => {
  return (
    <DropdownContainer>
      <Title>{label}</Title>
      <DropdownContent>
        {items.map((item, index) => (
          <Item
            key={`dropdownItem-${index}-${item.id}`}
            onClick={() => handleDropdownItemClick(item)}>
            {item.label}
          </Item>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
