import type { FRField } from '..';
import FormRender from '..';
import { Input, Select } from 'antd';
import { useMemo, useState } from 'react';

const install = {
  antSelect: Select,
  antInput: Input,
};

const Demo2 = () => {
  const [obj, setObj] = useState({});

  return (
    <>
      <FormRender
        install={install}
        initialValues={{ select3: '哈哈哈', select: true }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        onValuesChange={(changedValues: any, values: any, valuesOpts: any) => {
          setObj(values);
        }}
        fields={[
          () => {
            return {
              type: 'antSelect',
              props: {
                name: 'select',
                label: '下一项是否必填？',
                fieldProps: {
                  options: [
                    {
                      label: '必填',
                      value: true,
                    },
                    {
                      label: '非必填',
                      value: false,
                    },
                  ],
                },
              },
            };
          },
          (formData) => {
            return {
              type: 'antSelect',
              props: {
                name: 'select2',
                label:
                  '下一项渲染什么22222222' +
                  (formData.select ? 'true' : 'false'),
                rules: [{ required: formData.select, message: '请选择' }],
                fieldProps: {
                  options: [
                    {
                      label: '必填',
                      value: true,
                    },
                    {
                      label: '非必填',
                      value: false,
                    },
                  ],
                },
              },
            };
          },
          {
            type: 'antInput',
            props: {
              name: 'select3',
              label: '输入框',
              rules: [{ required: true }],
            },
          },
          (formData, opts, formInstance) => {
            console.log('antInput')
            return {
              type: 'antInput',
              props: {
                name: 'abc',
                label: 'hhh',
                fieldProps: {
                  onChange(e) {
                    formInstance.setFieldsValue({
                      abc2: e.target.value,
                    });
                  },
                },
              },
            };
          },
          () => {
            return {
              type: 'antInput',
              props: {
                name: 'abc2',
                label: 'hhh2',
              },
            };
          },
          (formData) => {
            return {
              render: <h1>1234{formData.abc}</h1>,
            };
          },
        ]}
      />
      <pre>
        <code>{JSON.stringify(obj, null, 2)}</code>
      </pre>
    </>
  );
};

export default Demo2;
