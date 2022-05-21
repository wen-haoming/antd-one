import FormRender from '..';
import { useState } from 'react';

const Demo2 = () => {
  const [obj, setObj] = useState({});

  return (
    <>
      <FormRender
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        onValuesChange={(changedValues: any, values: any, valuesOpts: any) => {
          setObj(values);
        }}
        fields={[
          () => {
            return {
              type: 'FormInput',
              props: {
                name: '1',
                label: 'antInput内置组件',
              },
            };
          },
          () => {
            return {
              type: 'FormSelect',
              props: {
                name: '2',
                label: 'FormSelect',
                fieldProps: {
                  options: [
                    {
                      label: '是',
                      value: true,
                    },
                    {
                      label: '否',
                      value: false,
                    },
                  ],
                },
              },
            };
          },
          (formData) => {
            return {
              type: 'FormRadioGroup',
              props: {
                name: '3',
                label: 'FormRadioGroup',
                fieldProps: {
                  disabled: formData['2'],
                  options: [
                    {
                      label: '是',
                      value: true,
                    },
                    {
                      label: '否',
                      value: false,
                    },
                  ],
                },
              },
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
