import { ArrayTable, DatePicker, Input, Select } from '@formily/antd';
import { Button } from 'antd';
import createModalFormRender from './';

const install = {
  Input,
  Select,
  RangePicker: DatePicker.RangePicker,
  ArrayTable,
};

const Modal = createModalFormRender<typeof install>(install);

export default () => {
  return (
    <Modal
      trigger={<Button>打开表单</Button>}
      beforePopConfirm={{
        title: '请确认是否提交？',
      }}
      onFinish={async (value, options) => {
        console.log(value, options);

        return new Promise((r) => {
          setTimeout(() => {
            r();
          }, 3000);
        });
      }}
      fields={() => [
        {
          type: 'Input',
          name: 'input',
          title: 'input',
        },
        {
          type: 'ArrayTable',
          name: 'ArrayTable',
          columns: [
            {
              title: 'column1',
              dataIndex: 'column1',
              formField: {
                type: 'Input',
                name: 'Input',
                valueType: 'String',
              },
            },
            {
              title: 'column1',
              dataIndex: 'column1',
              formField: {
                decorator: 'Editable',
                type: 'Input',
                name: 'Input',
                valueType: 'String',
              },
            },
            {
              title: 'column4',
              dataIndex: 'column4',
            },
          ],
        },
      ]}
    />
  );
};
