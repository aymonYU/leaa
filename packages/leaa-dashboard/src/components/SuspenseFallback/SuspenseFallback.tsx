import React from 'react';
import { Spin } from 'antd';

import style from './style.less';

export const SuspenseFallback = () => <Spin className={style['suspense-fallback-loader']} />;
