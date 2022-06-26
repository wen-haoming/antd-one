import FormRender, { useForm } from '..';
import 'antd/dist/antd.css';
import { ConfigProvider, Button } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FormWrap from '../../../Demo/FormWrap';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Demo = (props: any) => {
  const [form] = useForm();

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <FormWrap>
          <FormRender
            form={form}
            layout="vertical"
            onFinish={props.setObj}
            fields={[
              {
                type: 'RenderTabs',
                props: {
                  style: {
                    margin: 0,
                  },
                  fieldProps: {
                    defaultActiveKey: 'b',
                    onChange() {
                      console.log(form.getFieldsValue(), '==');
                    },
                    tabs: [
                      {
                        tab: '账号密码登录',
                        key: 'a',
                        fields: [
                          [{
                            type: 'FormInput',
                            required: true,
                            props: {
                              name: 'username',
                              label: '账号',
                              fieldProps: {
                                prefix: <UserOutlined />,
                              },
                            },
                          }],
                          [{
                            type: 'InputPasswrod',
                            required: true,
                            props: {
                              name: 'paaword',
                              label: '密码',
                              fieldProps: {
                                prefix: <LockOutlined />,
                              },
                            },
                          }],
                          [{
                            type: 'Submit',
                            props: {
                              fieldProps: {
                                block: true,
                                text: '登录',
                              },
                            },
                          }],
                        ],
                      },
                      {
                        tab: '手机登录',
                        key: 'b',
                        fields: [
                          [{
                            type: 'FormInput',
                            required: true,
                            props: {
                              name: 'username2',
                              label: '手机号',
                              fieldProps: {
                                // prefix: <PhoneOutlined />,
                              },
                            },
                          }],
                          [{
                            type: 'InputPasswrod',
                            required: true,
                            props: {
                              name: 'paaword2',
                              label: '验证码',
                            },
                          }],
                          [{
                            type: 'Submit',
                            props: {
                              fieldProps: {
                                block: true,
                                text: '登录',
                              },
                            },
                          }],
                        ],
                      },
                    ],
                  },
                },
              },
              [
                () => ({
                  render: <Button type="link">新用户注册</Button>,
                }),
                () => ({
                  render: <Button type="link">忘记密码？</Button>,
                }),
              ],
            ]}
          />
        </FormWrap>
      </ConfigProvider>
    </>
  );
};

export default Demo;
