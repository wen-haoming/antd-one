import ModalFormRender from '..';
import DrawerFormRender from '../../DrawerFormRender';
import { Button, Space } from 'antd';

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
          fields: [
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
          fields: [
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
        }}
      />
    </Space>
  );
};

export default Demo;
