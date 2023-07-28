import { useContext } from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';
import { menuItems } from '@/utils/data';
import { UiContext } from '@/context/ui-context';
import { IMenuItem } from './types';
import { Collapsible } from '.';

const SidebarContainer = styled.div`
  color: ${({ theme }) => theme.colors.light2};
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 100%;
  margin: 0;
`;
const Title = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.colors.titleText};
  font-size: ${themeStatic.fontSizes.xlarge};
  font-weight: ${themeStatic.fontWeight.bold};
  padding: 5px 20px;
  margin: 0;
  margin-top: 20px;
`;

const SidebarItem = styled.div<{ $isActive: boolean }>`
  transition: background-color 0.4s ease;
  text-align: left;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.secondary : theme.colors.primary};
  padding: 10px 20px;
  cursor: pointer;
  margin: 1px 0;
  border-left: ${({ $isActive, theme }) =>
    $isActive && `5px solid ${theme.colors.tertiary}`};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  &:focus {
    outline: none;
  }
`;

const Sidebar = () => {
  const uiData = useContext(UiContext);
  const { sidebarActive, subSidebarActive, setUiData } = uiData;
  const handleSidebarItemClick = (item: IMenuItem) => {
    setUiData({ ...uiData, sidebarActive: item.id, subSidebarActive: '' });
  };
  const handleSidebarSubItemClick = (item: IMenuItem, subItem: IMenuItem) => {
    setUiData({
      ...uiData,
      sidebarActive: item.id,
      subSidebarActive: subItem.id,
    });
  };

  return (
    <SidebarContainer>
      <Title>Title side</Title>
      <hr />
      {menuItems.map((item, index) =>
        item.items ? (
          <Collapsible
            key={index}
            title={
              <SidebarItem
                $isActive={sidebarActive === item.id}
                onClick={() => handleSidebarItemClick(item)}>
                {item.label}
              </SidebarItem>
            }>
            {item.items.map((subItem, index) => (
              <SidebarItem
                key={index}
                $isActive={subSidebarActive === subItem.id}
                onClick={() => handleSidebarSubItemClick(item, subItem)}>
                {subItem.label}
              </SidebarItem>
            ))}
          </Collapsible>
        ) : (
          <SidebarItem
            key={index}
            $isActive={sidebarActive === item.id}
            onClick={() => handleSidebarItemClick(item)}>
            {item.label}
          </SidebarItem>
        ),
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
