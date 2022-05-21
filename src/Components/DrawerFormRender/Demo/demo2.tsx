import DrawerFormRender, { useForm } from '..';
import { Button, message } from 'antd';
import { useRequest } from 'ahooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name1: 'name1',
        name2: 'name2',
        name3: 'name3',
        name4: 'name4',
        radio1: '是',
        select1: '是',
      } as any);
    }, 500);
  });
}

function sleep(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 500);
  });
}

const Demo = () => {
  const [form] = useForm();

  const request = useRequest(getUsername, {
    manual: true,
    onSuccess(vo) {
      form.setFieldsValue(vo);
    },
  });

  const submitRequest = useRequest(sleep, {
    manual: true,
    onSuccess() {
      message.success('提交成功');
    },
  });

  return (
    <DrawerFormRender
      trigger={<Button onClick={request.run}>打开Drawer</Button>}
      onFinish={async () => {
        await submitRequest.runAsync();
        return true;
      }}
      form={form}
      drawerConfig={{
        width: 500,
        title: '异步加载数据',
      }}
      loading={request.loading}
      beforePopConfirm={{
        title: '请确认是否提交',
      }}
      beforePopCancel={{
        title: '关闭抽屉会清空已填入数据，是确认是否关闭？',
      }}
      formConfig={{
        fields: [
          {
            type: 'FormInput',
            props: {
              label: 'input',
              name: 'name1',
            },
          },
          [
            {
              type: 'FormInput',
              props: {
                label: 'input2',
                name: 'name2',
              },
            },
            {
              type: 'FormInput',
              props: {
                label: 'input3',
                name: 'name3',
              },
            },
          ],
          [
            {
              type: 'FormInput',
              props: {
                label: 'input4',
                name: 'name4',
              },
            },
            () => {
              return {
                type: 'FormRadioGroup',
                props: {
                  label: 'radio1',
                  name: 'radio1',
                  fieldProps: {
                    options: [
                      {
                        label: '是',
                        value: '是',
                      },
                      {
                        label: '否',
                        value: '否',
                      },
                    ],
                  },
                },
              };
            },
          ],
          {
            type: 'FormSelect',
            props: {
              label: 'select1',
              name: 'select1',
              fieldProps: {
                options: [
                  {
                    label: '是',
                    value: '是',
                  },
                  {
                    label: '否',
                    value: '否',
                  },
                ],
              },
            },
          },
        ],
      }}
    />
  );
};

export default Demo;
