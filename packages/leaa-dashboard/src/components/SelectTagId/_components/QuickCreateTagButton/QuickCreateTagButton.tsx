import React from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { Tag } from '@leaa/common/src/entrys';
import { CREATE_TAG } from '@leaa/common/src/graphqls';

import style from './style.less';

interface IProps {
  tagName: string | undefined;
  onCreatedTagCallback: (tag: Tag) => void;
}

export const QuickCreateTagButton = (props: IProps) => {
  const { t } = useTranslation();

  // mutation
  const [createTagMutate] = useMutation<{ createTag: Tag }>(CREATE_TAG, {
    variables: { tag: { name: props.tagName } },
    onError: e => message.error(e.message),
    onCompleted({ createTag }) {
      if (props.onCreatedTagCallback) {
        props.onCreatedTagCallback(createTag);
      }
    },
  });

  return (
    <div className={cx(style['wrapper'])}>
      <Button onClick={() => createTagMutate()} size="small">
        {t('_comp:SelectTagId.createAndAdd')}
      </Button>
    </div>
  );
};
