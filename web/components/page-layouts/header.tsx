import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { headerMenuItems } from '@/utils/mainmenu';
import { UiContext } from '@/context/ui-context';
import { IMenuItem } from '@/types.d';
import { Icon, Dropdown, Modal, IconType } from '@/components';
import { themeStatic } from '@/theme';

const NavbarContainer = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark2};
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.7);
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

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const uiData = useContext(UiContext);
  const { setUiData, isDrawerOpen, cleanUpUiData } = uiData;
  const router = useRouter();

  const handleMenuItemClick = (item: IMenuItem) => {
    if (item.label === 'Logout') {
      setShowModal(true);
      return;
    }
    router.push(item.link!);

    // Add any logic you want to perform when a menu item is clicked
  };
  const handleDropdownItemClick = (item: IMenuItem) => {
    // Add any logic you want to perform when a Dropdown menu item is clicked
  };

  const handleOpenDrawer = () => {
    setUiData({ ...uiData, isDrawerOpen: true });
  };

  const onConfirmModal = () => {
    setShowModal(false);
    cleanUpUiData();
    router.push('/login');
  };

  const onCancelModal = () => {
    setShowModal(false);
  };

  return (
    <NavbarContainer>
      <Button $isDrawerOpen={isDrawerOpen} onClick={handleOpenDrawer}>
        <Icon icon={IconType.Bars} height={20} width={20} />
      </Button>
      <Title>&#x1F441; Sauron</Title>
      <>
        <MenuOptions>
          {headerMenuItems.map((item, index) =>
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
                key={`menu-${index}`}
                $isActive={
                  item.link.split('/')[1] === router.pathname.split('/')[1]
                }
                onClick={() => handleMenuItemClick(item)}>
                {item.label}
              </MenuItem>
            ),
          )}
        </MenuOptions>
      </>
      <Modal
        showModal={showModal}
        onConfirm={onConfirmModal}
        onCancel={onCancelModal}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </NavbarContainer>
  );
};

export default Header;
