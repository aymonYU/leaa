import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '@leaa/dashboard/src/assets/images/logo/logo-white.svg';
import { IRouteItem } from '@leaa/dashboard/src/interfaces';
import { masterRoutes, flateMasterRoutes } from '@leaa/dashboard/src/routes/master.route';
import { authUtil, deviceUtil } from '@leaa/dashboard/src/utils';
import { ALLOW_PERMISSION, SIDERBAR_COLLAPSED_SL_KEY } from '@leaa/dashboard/src/constants';
import { SwitchLanguage } from '@leaa/dashboard/src/components/SwitchLanguage';
import { SidebarTarget } from '@leaa/dashboard/src/components/MasterLayout/_components/SidebarTarget/SidebarTarget';

import style from './style.less';

interface IProps extends RouteComponentProps {
  className?: string;
  collapsedHash?: number;
}

const getMenuName = (menu: IRouteItem) => {
  const { t } = useTranslation();

  if (menu.namei18n) {
    return t(`${menu.namei18n}`);
  }

  return menu.name;
};

const makeFlatMenu = (menu: IRouteItem): React.ReactNode => {
  let dom = null;

  // Home
  if (menu.path === '/') {
    return null;
  }

  // hasParam
  if (menu.path.includes(':')) {
    return dom;
  }

  if (menu.isCreate) {
    return dom;
  }

  if (authUtil.getAuthInfo().flatePermissions.includes(menu.permission) || menu.permission === ALLOW_PERMISSION) {
    const currentMenuCreatePermission = `${menu.permission.split('.')[0]}.create`;

    dom = (
      <Menu.Item key={menu.path} className={`g-sidebar-menu-${menu.path}`}>
        <Link to={menu.path}>
          <span className={style['nav-text']}>
            {menu.icon && <Icon type={menu.icon} />}
            <em className="menu-name">{getMenuName(menu)}</em>
          </span>
        </Link>

        {menu.canCreate &&
          (authUtil.getAuthInfo().flatePermissions.includes(currentMenuCreatePermission) ||
            menu.permission === ALLOW_PERMISSION) && (
            <Link to={`${menu.path}/create`} className={style['can-create-button']}>
              <Icon type="plus" />
            </Link>
          )}
      </Menu.Item>
    );
  }

  return dom;
};

const makeFlatMenus = (menus: IRouteItem[]): React.ReactNode => {
  return menus.map(menu => {
    if (
      menu.children &&
      (authUtil.getAuthInfo().flatePermissions.includes(menu.permission) || menu.permission === ALLOW_PERMISSION)
    ) {
      return (
        <Menu.SubMenu
          className={`g-sidebar-group-menu-${menu.path}`}
          key={menu.path}
          title={
            <span className={style['nav-text']}>
              {menu.icon && <Icon type={menu.icon} />}
              <em className="menu-name">{getMenuName(menu)}</em>
            </span>
          }
        >
          {menu.children.map(subMenu => makeFlatMenu(subMenu))}
        </Menu.SubMenu>
      );
    }

    return makeFlatMenu(menu);
  });
};

export const LayoutSidebar = (props: IProps) => {
  const pathWithoutParams = props.match.path.replace(/(^.*)\/.*/, '$1') || props.match.path;
  const [selectedKeys, setSelectedKeys] = useState<string>(pathWithoutParams);

  const curremtSelectedKey = flateMasterRoutes.find(r => r.path === props.match.path);
  const uiOpenKeys = curremtSelectedKey ? curremtSelectedKey.groupName || '' : '';

  const collapsedLs = localStorage.getItem(SIDERBAR_COLLAPSED_SL_KEY);
  let collapsedInit = collapsedLs !== null && collapsedLs === 'true';

  if (deviceUtil.isMobile() && collapsedLs === null) {
    collapsedInit = true;
  }

  const [collapsed, setCollapsed] = useState<boolean>(collapsedInit);

  const onCollapse = (isCollapsed: boolean, type: 'responsive' | 'clickTrigger') => {
    if (type === 'clickTrigger') {
      const nextCollapsed = !collapsed;
      localStorage.setItem(SIDERBAR_COLLAPSED_SL_KEY, `${nextCollapsed}`);

      setCollapsed(nextCollapsed);
    }
  };

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add('siderbar-collapsed');
    } else {
      document.body.classList.remove('siderbar-collapsed');
    }
  }, [collapsed]);

  return (
    <Layout.Sider
      collapsed={collapsed}
      defaultCollapsed={collapsed}
      collapsible
      collapsedWidth={0}
      className={style['full-layout-sidebar']}
      id="full-layout-sidebar"
      breakpoint="md"
      onCollapse={(isCollapsed, type) => onCollapse(isCollapsed, type)}
      trigger={null}
    >
      <div className={style['logo-wrapper']}>
        <Link to="/">
          <img src={logo} alt="" width={40} />
        </Link>
      </div>

      {masterRoutes && (
        <Menu
          className={style['menu-wrapper']}
          defaultSelectedKeys={[selectedKeys]}
          defaultOpenKeys={[uiOpenKeys]}
          selectable
          mode="inline"
          theme="dark"
          onSelect={() => setSelectedKeys(pathWithoutParams)}
        >
          {makeFlatMenus(masterRoutes)}
        </Menu>
      )}

      <div className={cx(style['switch-language-wrapper'], 'switch-language-wrapper')}>
        <SwitchLanguage className={style['switch-language']} placement="topLeft" dark />
      </div>

      <div className={cx(style['target-button-wrapper'], 'target-button-wrapper')}>
        <SidebarTarget onCallbackSidebarTarget={() => onCollapse(collapsed, 'clickTrigger')} collapsed={collapsed} />
      </div>
    </Layout.Sider>
  );
};
