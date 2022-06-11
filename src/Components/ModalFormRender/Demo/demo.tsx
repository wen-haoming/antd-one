import ModalFormRender from '..';
import DrawerFormRender from '../../DrawerFormRender';
import { Button, Space } from 'antd';

const fields = [
  {
    type: 'FormInput',
    props: {
      label: 'input',
      name: 'input',
    },
  },
  {
    type: 'FormInput',
    props: {
      label: 'input2',
      name: 'input2',
      rules: [{ required: true }],
    },
  },
]

const Demo = () => {
  return (
    <Space>
      <ModalFormRender
        trigger={<Button>打开 Modal</Button>}
        onFinish={async () => {
          return true;
        }}
        ModalConfig={{
          title: '标题',
        }}
        formConfig={{
          fields
        }}
      />
      <DrawerFormRender
        trigger={<Button>打开 Drawer</Button>}
        onFinish={async () => {
          return true;
        }}
        drawerConfig={{
          title: '标题',
        }}
        formConfig={{
          fields,
        }}
      />
    </Space>
  );
};

export default Demo;
