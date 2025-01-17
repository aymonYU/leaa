import React from 'react';
import cx from 'classnames';
import { Layout, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { UserMenu } from '../UserMenu/UserMenu';

import style from './style.less';

interface IProps extends RouteComponentProps {
  onCallbackSidebarTarget?: () => void;
}

export const LayoutHeader = (props: IProps) => (
  <Layout.Header className={style['full-layout-header']}>
    <Row type="flex" justify="space-between" align="middle">
      <Col className={cx(style['full-layout-breadcrumb'], 'g-full-layout-breadcrumb')}>
        <Breadcrumb {...props} />
      </Col>

      <Col className={cx(style['full-layout-toolsbar'], 'g-full-layout-toolsbar')}>
        <UserMenu {...props} />
      </Col>
    </Row>
  </Layout.Header>
);
