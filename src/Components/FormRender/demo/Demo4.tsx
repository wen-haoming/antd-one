import React, { useState } from 'react';
import { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { Button, Form } from 'antd';

import type { FRField } from '..';
import FormRender from '..';

const install = {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
};

export type InstallConfig = typeof install;

const Demo4 = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({});
  return (
    <>
      <FormRender
        install={install}
        initialValues={{ text1: '文本输入 1 的初始值' }}
        form={form as any}
        onFinish={(s) => {
          alert(JSON.stringify(s));
        }}
        onValuesChange={(_, values) => {
          setState(values);
        }}
        fields={
          [
            [
              (formData) => {
                return {
                  type: 'ProFormText',
                  props: {
                    name: 'select1',
                    title: '输入1',
                    onChange(val) {
                      const {
                        target: { value },
                      } = val;
                      formData.select2 = value;
                      formData.select3 = value;
                    },
                  },
                };
              },
              {
                type: 'ProFormText',
                props: {
                  name: 'select2',
                  title: '输入2',
                },
              },
              (formData) => {
                return {
                  type: 'ProFormText',
                  props: {
                    name: 'select3',
                    title: formData.select1 + '输入3',
                  },
                };
              },
            ],
            [
              {
                type: 'ProFormText',
                props: {
                  name: 'select4',
                  rules: [{ required: true, message: '请输入' }],
                  title: '输入4',
                },
              },
            ],
            [
              {
                type: 'ProFormText',
                props: {
                  name: 'select5',
                  title: '输入5',
                },
              },
            ],
          ] as FRField<InstallConfig>
        }
      />
      <Button type="primary" onClick={form.submit}>
        提交数据
      </Button>
      <div style={{ marginTop: 10 }}>
        表单数据：<pre>{JSON.stringify(state, 2, 2)}</pre>
      </div>
    </>
  );
};

export default Demo4;
