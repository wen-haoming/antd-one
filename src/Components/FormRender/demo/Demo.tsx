import FormRender from '..';
import { useState } from 'react';
import 'antd/dist/antd.css';

const Demo = () => {
  const [obj, setObj] = useState({});

  return (
    <>
      <FormRender
        initialValues={{ select: 123 }}
        onValuesChange={(changedValues: any, values: any, valuesOpts: any) => {
          setObj(values);
        }}
        fields={[
            [() => {
              return {
                type: 'FormInput',
                required: true,
                format: [],
                props: {
                  name: 'select',
                  label: 'FormInput',
                },
              };
            },
            () => {
              return {
                type: 'FormInput',
                required: true,
                format: [],
                props: {
                  name: 'select2',
                  label: 'FormInput',
                },
              };
            },
          ],
          () => {
            console.log('update-select2');
            return {
              type: 'FormSelect',
              props: {
                name: 'select2',
                label: 'FormSelect',
                fieldProps: {
                  valueEnum: {
                    yes: '正确',
                    no: '失败',
                  },
                },
              },
            };
          },
          () => {
            console.log('update-select2');
            return {
              type: 'FormSelect',
              props: {
                name: 'select4',
                label: 'FormSelect',
                fieldProps: {
                  valueEnum: {
                    yes: '正确',
                    no: '失败',
                  },
                },
              },
            };
          }
        ]}
      />
      <pre>
        <code>{JSON.stringify(obj, null, 2)}</code>
      </pre>
    </>
  );
};

export default Demo;
