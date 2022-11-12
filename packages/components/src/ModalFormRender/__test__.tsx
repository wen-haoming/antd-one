import { createModalFormRender } from '@antd-one/components';
import { DatePicker, Input, Select } from '@formily/antd';
import { Button } from 'antd';
import React from 'react';

const install = { Input, Select, RangePicker: DatePicker.RangePicker };

const Modal = createModalFormRender(install);

export default () => {
  return (
    <Modal
      trigger={<Button>打开表单</Button>}
      fields={() => [
        {
          type: 'Input',
          title: 'abc',
          name: 'abc',
        },
      ]}
    />
  );
};
