import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { FC } from 'react';
import { useContext } from 'react';
import { FormRenderContext } from '../../RenderProvider';

export const Item: FC<{
  itemProps: FormItemProps & { title?: string };
  fieldProps: Record<string, any>;
  Comp: React.ReactNode;
}> = (props) => {
  const { itemProps, fieldProps, Comp } = props;
  const { label, name, ...restItemProps } = itemProps;
  const FRContext = useContext(FormRenderContext);

  const handleChange = (val: any, opt?: any) => {
    if (typeof opt === 'object') {
      FRContext.formDataOptions?.set(name, opt);
    }
    if (fieldProps.onChange) {
      fieldProps.onChange(val, opt);
    }
    if (!val) {
      // 如果该属性不存在，需要删除 opt 上的属性
      Reflect.deleteProperty(FRContext.formDataOptions, name as string);
    }
  };

  return (
    <Form.Item label={label} name={name} {...restItemProps}>
      <Comp {...fieldProps} onChange={handleChange} />
    </Form.Item>
  );
};
