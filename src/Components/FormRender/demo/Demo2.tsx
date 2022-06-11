import FormRender from '..';
import 'antd/dist/antd.css';
import { ConfigProvider, Button } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FormWrap from './FormWrap';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';

const Demo = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <FormWrap>
        <FormRender
          layout="vertical"
          fields={[
            {
              type: 'RenderTabs',
              props: {
                style: {
                  margin: 0,
                },
                fieldProps: {
                  defaultActiveKey: 'b',
                  tabs: [
                    {
                      tab: '账号密码登录',
                      key: 'a',
                      fields: [
                        {
                          type: 'FormInput',
                          required: true,
                          props: {
                            name: 'username',
                            label: '账号',
                            fieldProps: {
                              prefix:<UserOutlined/>,
                            },
                          },
                        },
                        {
                          type: 'InputPasswrod',
                          required: true,
                          props: {
                            name: 'paaword',
                            label: '密码',
                            fieldProps: {
                              prefix: <LockOutlined />,
                            },
                          },
                        },
                        {
                          type: 'Submit',
                          props: {
                            fieldProps: {
                              block: true,
                              text: '登录',
                            },
                          },
                        },
                      ],
                    },
                    {
                      tab: '手机登录',
                      key: 'phone',
                      fields: [
                        {
                          type: 'FormInput',
                          required: true,
                          props: {
                            name: 'username2',
                            label: '手机号',
                            filedProps: {
                              // prefix: <PhoneOutlined />,
                            },
                          },
                        },
                        {
                          type: 'InputPasswrod',
                          required: true,
                          props: {
                            name: 'paaword2',
                            label: '验证码',
                          },
                        },
                        {
                          type: 'Submit',
                          props: {
                            fieldProps: {
                              block: true,
                              text: '登录',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
            [
              {
                render: () => <Button type="link">新用户注册</Button>,
              },
              {
                render: () => <Button type="link">忘记密码？</Button>,
              },
            ],
          ]}
        />
      </FormWrap>
    </ConfigProvider>
  );
};

export default Demo;
