import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { menuItems } from '@/utils/data';
import { IMenuItem } from './types';
import Drawer from './drawer';
import { themeStatic } from '@/theme';
import Dropdown from './dropdown';

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
  font-weight: 700;
  color: ${({ theme }) => theme.colors.titleText};
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

// REFACTOR: use a button component
const Button = styled.button<{ $isDrawerOpen: boolean }>`
  display: ${({ $isDrawerOpen }) => ($isDrawerOpen ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  @media (min-width: ${themeStatic.breakpoints.small}) {
    display: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
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

// TODO: manage the state of the menu and the drawer with something persistent with context

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
          Icon
        </Button>

        {isDrawerOpen && <>Drawer</>}
      </>
    </NavbarContainer>
  );
};

export default Navbar;
