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
            type: "FormSelect",
            props: {
              label: '下一项输入框必选',
              name: "required",
              labelCol: {
                span: 6
              },
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
          (formData) => ({
            type: 'FormInput',
            required: formData.required,
            props: {
              label: '输入框',
              name: 'input',
              labelCol: {
                span: 6
              }
            }
          })
        ]}
      />
    </FormWrap>
  );
};

export default Demo4;
