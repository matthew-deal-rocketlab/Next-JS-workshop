import React, { useState } from 'react';
import styled from 'styled-components';
import { IMenuItem } from './types';
import { menuItems } from '@/utils/data';
import { themeStatic } from '@/theme';
import { ArrowDownIcon, ArrowUpIcon, XMarkIcon } from '@/components';

const DrawerContainer = styled.div<{ $isDrawerOpen: boolean }>`
  text-align: center;
  height: 100vh;
  width: 50%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.dark2};
  overflow-x: hidden;
  transform: translateX(${({ $isDrawerOpen }) => ($isDrawerOpen ? 0 : 100)}%);
  transition: transform 0.5s;
  @media (min-width: ${themeStatic.breakpoints.mobile}) {
    width: 30%;
  }
  @media (min-width: ${themeStatic.breakpoints.tablet}) {
    width: 15%;
  }
`;

// REFACTOR: use or create reusable components
const Title = styled.h1`
  font-size: ${themeStatic.fontSizes.xlarge};
  padding: 500px 0x;
  font-weight: ${themeStatic.fontWeight.bold};
  color: ${({ theme }) => theme.colors.titleText};
`;

const MenuItem = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.dark : theme.colors.dark2};
  padding: 10px 0;
  cursor: pointer;
  margin: 1px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }
  &:focus {
    outline: none;
  }
`;

const GroupMenuItem = styled(MenuItem)`
  display: grid;
  grid-template-columns: 90% 10%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-left: 10%;
`;

const Button = styled.button`
  width: 20%;
  float: right;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }
  &:focus {
    outline: none;
  }
`;

const MenuItemContainer = styled.div`
  overflow: hidden;
`;

const Drawer = ({
  setIsDrawerOpen,
  isDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: any;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0].index);
  const [activeSubItem, setActiveSubItem] = useState<number | null>();

  const handleMenuItemClick = (item: IMenuItem) => {
    setIsMenuOpen(false);
    setActiveSubItem(null);
    setActiveItem(item.index);
    // Add any logic you want to perform when a menu item is clicked
  };
  const handleSubMenuItemClick = (item: IMenuItem) => {
    setActiveSubItem(item.index);

    // Add any logic you want to perform when a sub menu item is clicked
  };
  const handleClickeableMenuItemClick = (item: IMenuItem) => {
    setIsMenuOpen(!isMenuOpen);
    setActiveItem(item.index);
    // Add any logic you want to perform when a menu item is clicked
  };

  return (
    <DrawerContainer $isDrawerOpen={isDrawerOpen}>
      <Button onClick={() => setIsDrawerOpen(false)}>
        <XMarkIcon
          height={15}
          width={15}
          fill="white"
          onClick={() => setIsDrawerOpen(false)}
        />
      </Button>
      <Title>Menu</Title>
      {menuItems.map((item, index) =>
        item.items ? (
          // Is a group menu item
          <MenuItemContainer key={`sub-menu-${index}-${item.index}`}>
            <GroupMenuItem
              $isActive={item.index === activeItem}
              onClick={() => handleClickeableMenuItemClick(item)}>
              {item.label}
              {isMenuOpen && activeItem === item.index ? (
                <ArrowUpIcon fill="white" height={10} width={10} />
              ) : (
                <ArrowDownIcon fill="white" height={10} width={10} />
              )}
            </GroupMenuItem>
            {isMenuOpen &&
              activeItem === item.index &&
              item.items.map((item, subindex) => (
                <GroupMenuItem
                  key={`menu--${item.index}`}
                  $isActive={index === activeItem && subindex === activeSubItem}
                  onClick={() => handleSubMenuItemClick(item)}>
                  {item.label}
                </GroupMenuItem>
              ))}
          </MenuItemContainer>
        ) : (
          // Is a simple menu item
          <MenuItem
            key={`menu--${item.index}`}
            $isActive={item.index === activeItem}
            onClick={() => handleMenuItemClick(item)}>
            {item.label}
          </MenuItem>
        ),
      )}
    </DrawerContainer>
  );
};

export default Drawer;
