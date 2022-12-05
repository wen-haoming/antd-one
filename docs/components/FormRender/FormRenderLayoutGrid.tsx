import React, { useState } from 'react';
import { Radio } from 'antd'
import { FormRender } from '@antd-one/components';

export default () => {
  const [layout, setLayout] = useState('Horizontal');
  
  return (
    <>
      <Radio.Group value={layout} onChange={e => setLayout(e.target.value)}>
        <Radio.Button value="horizontal">Horizontal</Radio.Button>
        <Radio.Button value="vertical">Vertical</Radio.Button>
        <Radio.Button value="inline">Inline</Radio.Button>
      </Radio.Group>
      <FormRender
        layoutProps={{
          layout:layout
        }}
        fields={[
          {
            type: 'Input',
            name: 'Input',
            title: 'Input',
          },
          {
            type:'Select',
            name: 'Select',
            title: 'Select',
          }
        ]
        }
      />
    </>)
};
