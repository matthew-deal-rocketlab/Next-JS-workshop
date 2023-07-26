import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { menuItems } from '@/utils/data';
import { IMenuItem } from './types';
import Drawer from './drawer';
import { themeStatic } from '@/theme';
import Dropdown from './dropdown';
import BarsIcon from './icons/bars';

const NavbarContainer = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark2};
  color: #ffffff;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Title = styled.h1`
  font-size: ${themeStatic.fontSizes.xlarge};
  margin: 0;
  color: ${({ theme }) => theme.colors.titleText};
  font-family: ${themeStatic.font.inter};
`;

const MenuOptions = styled.div`
  display: none;
  @media (min-width: ${themeStatic.breakpoints.small}) {
  display: flex;
`;

const MenuItem = styled.div<{ $isActive: boolean }>`
  padding: 0 10px;
  border-bottom: 2px solid;
  border-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.tertiary : 'transparent'};
  cursor: pointer;
`;

const Button = styled.button<{ $isDrawerOpen: boolean }>`
  display: ${({ $isDrawerOpen }) => ($isDrawerOpen ? 'none' : 'flex')};
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  @media (min-width: ${themeStatic.breakpoints.small}) {
    display: flex;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.light2};
  }
  &:focus {
    outline: none;
  }
`;

const DropdownItem = styled.a`
  border-radius: 5px;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// TODO: manage the state of the menu and the drawer with something persistent like context

const Navbar = () => {
  const { push } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0].index);
  const handleMenuItemClick = (item: IMenuItem) => {
    setActiveItem(item.index);

    // Add any logic you want to perform when a menu item is clicked
  };
  const handleDropdownItemClick = (item: IMenuItem) => {
    // Add any logic you want to perform when a Dropdown menu item is clicked
  };
  return (
    <NavbarContainer>
      <Title>My Website</Title>
      <Drawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
      <>
        <MenuOptions>
          {menuItems.map((item, index) =>
            item.items ? (
              <Dropdown
                items={item.items}
                label={item.label}
                handleDropdownItemClick={handleDropdownItemClick}
                key={`dropdown-${index}`}
                titleComponent={MenuItem}
                itemComponent={DropdownItem}
                link="/"
              />
            ) : (
              <MenuItem
                key={`menu--${item.index}`}
                $isActive={item.index === activeItem}
                onClick={() => handleMenuItemClick(item)}>
                {item.label}
              </MenuItem>
            ),
          )}
          {/* Just for navigation convenience, remove after */}
          <MenuItem
            $isActive={false}
            key={`login`}
            onClick={() => {
              push('/login');
            }}>
            Login
          </MenuItem>
        </MenuOptions>
        <Button
          $isDrawerOpen={isDrawerOpen}
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}>
          <BarsIcon height={20} width={20} />
        </Button>
      </>
    </NavbarContainer>
  );
};

export default Navbar;
