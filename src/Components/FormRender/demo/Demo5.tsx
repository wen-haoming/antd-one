import { LockOutlined, UserOutlined } from '@ant-design/icons';
import FormRender from '..';
import FormWrap from '../../../Demo/FormWrap';

const Demo4 = () => {
  return (
    <FormWrap width={600}>
      <FormRender
        layout="horizontal"
        labelAlign="left"
        fields={[
          {
            type: 'FormInput',
            props: {
              label: 'FormInput',
              name: 'FormInput',
            }
          },
          {
            type: "FormSelect",
            props: {
              label: 'FormSelect',
              name: "required",
              fieldProps: {
                options: [{
                  value: true,
                  label: '必选',
                }, {
                  value: false,
                  label: '非必选'
                }]
              }
            }
          },
          {
            type: 'FormRadioGroup',
            props: {
              name: 'FormRadioGroup',
              label: 'FormRadioGroup',
              fieldProps: {
                options: [{
                  value: true,
                  label: '必选',
                }, {
                  value: false,
                  label: '非必选'
                }]
              }
            }
          },
          {
            type: 'InputPasswrod',
            props: {
              name: 'InputPasswrod',
              label: 'InputPasswrod'
            }
          },
          {
            type: 'RenderTabs',
            props: {
              name:'RenderTabs',
              label:'RenderTabs',
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
        ]}
      />
    </FormWrap>
  );
};

export default Demo4;
