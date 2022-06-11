import FormRender from '..';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FormWrap from './FormWrap';

const Demo = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <FormWrap>
        <FormRender
          layout="vertical"
          fields={[
            {
              type: 'FormInput',
              required: true,
              props: {
                name: 'username',
                label: '账号',
              },
            },
            {
              type: 'InputPasswrod',
              required: true,
              props: {
                name: 'paaword',
                label: '密码',
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
          ]}
        />
      </FormWrap>
    </ConfigProvider>
  );
};

export default Demo;
