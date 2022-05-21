import DrawerFormRender from '..';
import { Button } from 'antd';

const Demo = () => {
  return (
    <DrawerFormRender
      trigger={<Button>打开Drawer</Button>}
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
        ],
      }}
    />
  );
};

export default Demo;
