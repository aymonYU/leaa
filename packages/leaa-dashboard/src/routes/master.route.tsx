import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

import { IRouteItem, IPage } from '@leaa/dashboard/src/interfaces';
import { MasterLayout } from '@leaa/dashboard/src/components/MasterLayout';
import { SuspenseFallback } from '@leaa/dashboard/src/components/SuspenseFallback';
import { ALLOW_PERMISSION } from '@leaa/dashboard/src/constants';

// TIPS: ALLOW_PERMISSION is always display

export const masterRoutes: IRouteItem[] = [
  {
    name: 'Create User',
    namei18n: '_route:createUser',
    permission: 'user.create',
    path: '/users/create',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateUser' */ '../pages/User/CreateUser/CreateUser')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit User',
    namei18n: '_route:editUser',
    permission: 'user.item',
    path: '/users/:id(\\d+)',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditUser' */ '../pages/User/EditUser/EditUser')),
    exact: true,
  },
  {
    name: 'User',
    namei18n: '_route:user',
    permission: 'user.list',
    path: '/users',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'UserList' */ '../pages/User/UserList/UserList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Role',
    namei18n: '_route:createRole',
    permission: 'role.create',
    path: '/roles/create',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateRole' */ '../pages/Role/CreateRole/CreateRole')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Role',
    namei18n: '_route:editRole',
    permission: 'role.item',
    path: '/roles/:id(\\d+)',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditRole' */ '../pages/Role/EditRole/EditRole')),
    exact: true,
  },
  {
    name: 'Role',
    namei18n: '_route:role',
    permission: 'role.list',
    path: '/roles',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'RoleList' */ '../pages/Role/RoleList/RoleList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Permission',
    namei18n: '_route:createPermission',
    permission: 'permission.create',
    path: '/permissions/create',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreatePermission' */ '../pages/Permission/CreatePermission/CreatePermission'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Permission',
    namei18n: '_route:editPermission',
    permission: 'permission.item',
    path: '/permissions/:id(\\d+)',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditPermission' */ '../pages/Permission/EditPermission/EditPermission'),
    ),
    exact: true,
  },
  {
    name: 'Permission',
    namei18n: '_route:permission',
    permission: 'permission.list',
    path: '/permissions',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'PermissionList' */ '../pages/Permission/PermissionList/PermissionList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Category',
    namei18n: '_route:createCategory',
    permission: 'category.create',
    path: '/categories/create',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreateCategory' */ '../pages/Category/CreateCategory/CreateCategory'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Category',
    namei18n: '_route:editCategory',
    permission: 'category.item',
    path: '/categories/:id(\\d+)',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditCategory' */ '../pages/Category/EditCategory/EditCategory'),
    ),
    exact: true,
  },
  {
    name: 'Category',
    namei18n: '_route:category',
    permission: 'category.list',
    path: '/categories',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CategoryList' */ '../pages/Category/CategoryList/CategoryList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Article',
    namei18n: '_route:createArticle',
    permission: 'article.create',
    path: '/articles/create',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreateArticle' */ '../pages/Article/CreateArticle/CreateArticle'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Article',
    namei18n: '_route:editArticle',
    permission: 'article.item',
    path: '/articles/:id(\\d+)',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditArticle' */ '../pages/Article/EditArticle/EditArticle'),
    ),
    exact: true,
  },
  {
    name: 'Article',
    namei18n: '_route:article',
    permission: 'article.list',
    path: '/articles',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'ArticleList' */ '../pages/Article/ArticleList/ArticleList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Ax',
    namei18n: '_route:createAx',
    permission: 'ax.create',
    path: '/axs/create',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateAx' */ '../pages/Ax/CreateAx/CreateAx')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Ax',
    namei18n: '_route:editAx',
    permission: 'ax.item',
    path: '/axs/:id(\\d+)',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditAx' */ '../pages/Ax/EditAx/EditAx')),
    exact: true,
  },
  {
    name: 'Ax',
    namei18n: '_route:ax',
    permission: 'ax.list',
    path: '/axs',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'AxList' */ '../pages/Ax/AxList/AxList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  //
  {
    name: 'Create Tag',
    namei18n: '_route:createTag',
    permission: 'tag.create',
    path: '/tags/create',
    icon: 'tag',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateTag' */ '../pages/Tag/CreateTag/CreateTag')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Tag',
    namei18n: '_route:editTag',
    permission: 'tag.item',
    path: '/tags/:id(\\d+)',
    icon: 'tag',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditTag' */ '../pages/Tag/EditTag/EditTag')),
    exact: true,
  },
  {
    name: 'Tag',
    namei18n: '_route:tag',
    permission: 'tag.list',
    path: '/tags',
    icon: 'tag',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'TagList' */ '../pages/Tag/TagList/TagList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  //
  {
    name: 'Setting',
    namei18n: '_route:setting',
    permission: 'setting.list',
    path: '/settings',
    icon: 'setting',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'SettingList' */ '../pages/Setting/SettingList/SettingList'),
    ),
    exact: true,
  },
  //
  //
  //
  {
    name: 'HOME',
    namei18n: '_route:home',
    permission: ALLOW_PERMISSION,
    path: '/',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Home' */ '../pages/Home/Home/Home')),
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Lab',
    namei18n: '_route:lab',
    permission: 'lab.root',
    path: '_group',
    icon: 'experiment',
    children: [
      {
        name: 'Test Any',
        namei18n: '_route:testAny',
        permission: ALLOW_PERMISSION,
        path: '/test-any',
        icon: 'deployment-unit',
        LazyComponent: React.lazy(() => import(/* webpackChunkName: 'TestAny' */ '../pages/Test/TestAny/TestAny')),
        exact: true,
      },
      {
        name: 'Test Attachment',
        namei18n: '_route:testAttachment',
        permission: ALLOW_PERMISSION,
        path: '/test-attachment',
        icon: 'deployment-unit',
        LazyComponent: React.lazy(() =>
          import(/* webpackChunkName: 'TestAttachment' */ '../pages/Test/TestAttachment/TestAttachment'),
        ),
        exact: true,
      },
      {
        name: 'Test I18n',
        namei18n: '_route:testI18n',
        permission: ALLOW_PERMISSION,
        path: '/test-i18n',
        icon: 'deployment-unit',
        LazyComponent: React.lazy(() => import(/* webpackChunkName: 'TestI18n' */ '../pages/Test/TestI18n/TestI18n')),
        exact: true,
      },
    ],
  },
];

const routerDom: ReactNode[] = [];
const parseRoutes = (routeList: IRouteItem[]) => {
  routeList.forEach(item => {
    if (item.children) {
      parseRoutes(item.children);
    }

    routerDom.push(
      <Route key={item.children ? `group-${item.name}` : item.path} exact={item.exact} path={item.path}>
        <MasterLayout
          route={item}
          component={(matchProps: IPage) => (
            <React.Suspense fallback={<SuspenseFallback />}>
              {item.LazyComponent && <item.LazyComponent {...matchProps} />}
            </React.Suspense>
          )}
        />
      </Route>,
    );
  });

  return routerDom;
};

const flateRoutes: IRouteItem[] = [];
const parseFlatRoutes = (routeList: IRouteItem[], groupName?: string) => {
  routeList.forEach(item => {
    const nextItem = _.omit(item, 'LazyComponent');

    if (nextItem.children) {
      parseFlatRoutes(nextItem.children, nextItem.path);
    }

    // loop for children groupName
    if (groupName) {
      nextItem.groupName = groupName;
    }

    flateRoutes.push(nextItem);
  });

  return flateRoutes;
};

export const masterRoute = parseRoutes(masterRoutes);
export const flateMasterRoutes = parseFlatRoutes(masterRoutes);
