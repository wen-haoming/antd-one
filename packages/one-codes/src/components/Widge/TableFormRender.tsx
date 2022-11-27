import { createTableFormRender } from '@antd-one/components';
import { Input, Select } from '@formily/antd';

const install = {
  Select,
  Input,
};

const TableFormRender = createTableFormRender(install) as any;
const form = createTableFormRender.createForm();
TableFormRender.defaultProps = {
  tableProps: {
    size: 'small',
  },
  form,
  request: async () => {
    return new Promise((r) => {
      setTimeout(() => {
        r({
          total: 1000,
          list: Array(1000)
            .fill('')
            .map((_, idx) => ({ abc: idx, abcd: idx, id: idx })),
        });
      }, 300);
    });
  },
  columns: [
    {
      title: 'abc1211',
      dataIndex: 'abc123',
      searchField: {
        type: 'Input',
        title: 'abc1211',
        required: true,
        props: {
          options: [
            { label: '选项1', value: '1 ' },
            { label: '选项2', value: '2' },
          ],
        },
      },
    },
    {
      title: 'abcd',
      dataIndex: 'abcd',
      searchField: {
        type: 'Select',
        required: true,
        props: {
          options: [
            { label: '选项1', value: ' 1 ' },
            { label: '选项2', value: ' 2' },
          ],
        },
      },
    },
  ],
};

export default TableFormRender;
