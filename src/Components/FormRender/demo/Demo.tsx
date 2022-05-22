import FormRender from '..';
import { useState } from 'react';
import 'antd/dist/antd.css';

const Demo = () => {
  const [obj, setObj] = useState({});

  return (
    <>
      <FormRender
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ select: 123 }}
        onValuesChange={(changedValues: any, values: any, valuesOpts: any) => {
          setObj(values);
        }}
        fields={[
          (formData) => {
            console.log('update-select',formData.select, 'formData.select');
            return {
              type: 'FormInput',
              props: {
                name: 'select',
                label: 'FormInput',
              },
            };
          },
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
        ]}
      />
      <pre>
        <code>{JSON.stringify(obj, null, 2)}</code>
      </pre>
    </>
  );
};

export default Demo;
