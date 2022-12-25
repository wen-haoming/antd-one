import React from 'react';
import { FormRender } from '@antd-one/components';

export default () => {
  return (
    <FormRender
      fields={[
        {
          type: 'ArrayTabs',
          name: 'ArrayTabs2',
          title: 'ArrayTabs2',
          children: [
            {
              type: 'Input',
              name: 'Input',
              title: 'Input',
            }
          ]
        },
      ]}
    />
  );
};
