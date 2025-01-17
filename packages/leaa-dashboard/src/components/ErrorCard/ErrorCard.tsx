import React, { useEffect } from 'react';
import { notification } from 'antd';
import { ApolloError } from 'apollo-client';
import { messageUtil } from '@leaa/dashboard/src/utils';

import style from './style.less';

interface IProps {
  error: ApolloError;
  message?: React.ReactNode | string;
}

export const ErrorCard = (props: IProps) => {
  let message: string | null = null;

  if (props.error) {
    ({ message } = props.error);
  }

  if (props.message) {
    message = typeof props.message === 'string' ? props.message : JSON.stringify(props.message);
  }

  useEffect(() => {
    if (message) {
      notification.error({ message: messageUtil.formatGqlmessage(message), className: style['container'] });
    }
  }, [message]);

  return null;
};
