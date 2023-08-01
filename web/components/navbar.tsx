import { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { menuItems } from '@/utils/data';
import { themeStatic } from '@/theme';
import { UiContext } from '@/context/ui-context';
import { IMenuItem } from '@/types.d';
import { BarsIcon, Dropdown } from '.';

const NavbarContainer = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark2};
  color: #ffffff;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: ${themeStatic.zIndex.one};
`;

const Title = styled.h1`
  font-size: ${themeStatic.fontSizes.xlarge};
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.titleText};
  font-family: ${themeStatic.font.inter};
  text-align: center;
  @media (min-width: ${themeStatic.breakpoints.mobile}) {
    margin: 0px;
  }
`;

const MenuOptions = styled.div`
  margin: 0 auto;
  display: none;
  @media (min-width: ${themeStatic.breakpoints.mobile}) {
    display: flex;
  }
`;

const MenuItem = styled.div<{ $isActive: boolean }>`
  padding: 0 10px;
  border-bottom: 2px solid;
  border-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.tertiary : 'transparent'};
  cursor: pointer;
`;

const Button = styled.button<{ $isDrawerOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  @media (min-width: ${themeStatic.breakpoints.mobile}) {
    display: none;
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

const Navbar = () => {
  const uiData = useContext(UiContext);
  const { navbarActive, setUiData, isDrawerOpen } = uiData;
  const { push } = useRouter();
  const handleMenuItemClick = (item: IMenuItem) => {
    setUiData({ ...uiData, navbarActive: item.id, sidebarActive: item.id });
    console.log('item', item);
    push(item.link!);

    // Add any logic you want to perform when a menu item is clicked
  };
  const handleDropdownItemClick = (item: IMenuItem) => {
    // Add any logic you want to perform when a Dropdown menu item is clicked
  };
  const handleOpenDrawer = () => {
    setUiData({ ...uiData, isDrawerOpen: true });
  };
  return (
    <NavbarContainer>
      <Button $isDrawerOpen={isDrawerOpen} onClick={handleOpenDrawer}>
        <BarsIcon height={20} width={20} />
      </Button>
      <Title>My Website</Title>
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
                key={`menu--${item.id}`}
                $isActive={item.id === navbarActive}
                onClick={() => handleMenuItemClick(item)}>
                {item.label}
              </MenuItem>
            ),
          )}
        </MenuOptions>
      </>
    </NavbarContainer>
  );
};

export default Navbar;
