import FormRender, { useForm } from '..';
import { Divider } from 'antd';
import FormWrap from '../../../Demo/FormWrap';

const Demo3 = () => {
  const [form] = useForm();

  return (
    <FormWrap width={600}>
      <FormRender
        form={form}
        layout="horizontal"
        fields={[
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
          () => ({
            render: (
              <Divider plain style={{ marginTop: 0 }}>
                自定义渲染分割线
              </Divider>
            ),
          }),
          [
            {
              type: 'FormInput',
              props: {
                label: 'input4',
                name: 'name4',
              },
            },
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
            type: 'Submit',
            props: {
              fieldProps: {
                block: true,
              },
            },
          },
        ]}
      />
    </FormWrap>
  );
};

export default Demo3;
