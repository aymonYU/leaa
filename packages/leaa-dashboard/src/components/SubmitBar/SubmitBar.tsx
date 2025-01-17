import React from 'react';
import cx from 'classnames';

import style from './style.less';

interface IProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  loading?: boolean;
  full?: boolean;
}

export const SubmitBar = (props: IProps) => (
  <div
    className={cx(style['wrapper'], props.className, {
      [style['wrapper--full']]: props.full,
    })}
  >
    <div className={style['container']}>{props.children}</div>
  </div>
);
