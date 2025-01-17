import React from 'react';
import { Divider, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { IPage } from '@leaa/dashboard/src/interfaces';
import { useStore } from '@leaa/dashboard/src/stores';
import { HtmlMeta } from '@leaa/dashboard/src/components/HtmlMeta';
import { SelectTagId } from '@leaa/dashboard/src/components/SelectTagId';

export default (props: IPage) => {
  const { t } = useTranslation();

  const store = useStore();
  store.mapping.abcMapping = ['AAAAAAAAAAAAAAAAAA'];

  const ls = [];

  for (let i = 0, len = localStorage.length; i < len; i += 1) {
    if (typeof localStorage.key(i) === 'string') {
      ls.push(localStorage.getItem(localStorage.key(i) as string));
    }
  }

  return (
    <div>
      <HtmlMeta title={t(`${props.route.namei18n}`)} />

      <h2>TAG</h2>

      <SelectTagId />

      {/* <h2>STORE</h2> */}

      {/* <code> */}
      {/*  <Input.TextArea rows={5} value={JSON.stringify(store)} /> */}
      {/* </code> */}

      {/* <Divider /> */}

      {/* <h2>LOCALSTORAGE</h2> */}
      {/* <code> */}
      {/*  <Input.TextArea rows={10} value={JSON.stringify(ls)} /> */}
      {/* </code> */}
    </div>
  );
};
