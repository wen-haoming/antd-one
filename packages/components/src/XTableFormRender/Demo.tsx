import { Input, Select } from '@formily/antd';
import XTableFormRender from './index';

const install = { Input, Select };

export default () => {
  const form = XTableFormRender.createForm({
    initialValues: {
      abc: 123,
    },
  });

  return (
    <XTableFormRender<typeof install>
      install={install}
      form={form}
      request={async () => {}}
      columns={[
        {
          title: 'abc',
          dataIndex: 'abc',
          searchField: {
            type: 'Input',
          },
        },
        {
          title: 'abcd',
          dataIndex: 'abcd',
          searchField: {
            type: 'Select',
            props: {
              options: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
              ],
            },
          },
        },
      ]}
    />
  );
};
