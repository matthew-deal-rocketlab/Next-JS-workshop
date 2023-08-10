import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';

import { IMenuItem } from '@/types.d';
import { Icon, Collapsible, IconType } from '.';
import { themeStatic } from '@/theme';

interface ISidebarProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  menuItems: IMenuItem[];
}

interface ISidebarItemProps extends React.HTMLProps<HTMLDivElement> {
  $isActive: boolean;
  display?: string;
}

const SidebarContainer = styled.div`
  color: ${({ theme }) => theme.colors.light2};
  background-color: ${({ theme }) => theme.colors.dark2};
  width: 100%;
  height: 100%;
  margin: 0;
`;
const Title = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.colors.light2};
  font-size: ${themeStatic.fontSizes.xlarge};
  font-weight: ${themeStatic.fontWeights.bold};
  padding: 5px 20px;
  margin: 0;
  margin-top: 20px;
`;

const SidebarItem = styled.div<ISidebarItemProps>`
  display: ${({ display }) => display || 'block'};
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.4s ease;
  text-align: left;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.dark : theme.colors.dark2};
  padding: 10px 20px;
  cursor: pointer;
  margin: 1px 0;
  border-left: ${({ $isActive, theme }) =>
    $isActive && `5px solid ${theme.colors.tertiary}`};
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const Sidebar = ({ title, menuItems }: ISidebarProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handleSidebarItemClick = (item: IMenuItem) => {
    if (item.link) router.push(item.link!);
  };

  const handleSidebarSubItemClick = (item: IMenuItem, subItem: IMenuItem) => {
    if (subItem.link) router.push(subItem.link!);
  };

  return (
    <SidebarContainer>
      <Title>{title}</Title>
      <hr />
      {menuItems.map((item, index) =>
        item.items ? (
          <Collapsible
            key={index}
            title={
              <SidebarItem
                display="flex"
                $isActive={router.pathname === item.link}
                onClick={() => handleSidebarItemClick(item)}>
                {item.label}
                <Icon
                  icon={IconType.ArrowDown}
                  height={10}
                  width={10}
                  stroke={theme.colors.light2}
                />
              </SidebarItem>
            }>
            {item.items.map((subItem, index) => (
              <SidebarItem
                key={index}
                $isActive={router.pathname === subItem.link}
                onClick={() => handleSidebarSubItemClick(item, subItem)}>
                {subItem.label}
              </SidebarItem>
            ))}
          </Collapsible>
        ) : (
          <SidebarItem
            key={index}
            $isActive={router.pathname === item.link}
            onClick={() => handleSidebarItemClick(item)}>
            {item.label}
          </SidebarItem>
        ),
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
