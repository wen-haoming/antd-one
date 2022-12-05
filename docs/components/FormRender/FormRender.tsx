import React from 'react';
import { FormRender } from '@antd-one/components';

export default () => {
  return (
    <FormRender
      fields={[
        {
          type: 'Input',
          name: 'Input',
          title: 'Input',
        },
      ]}
    />
  );
};
