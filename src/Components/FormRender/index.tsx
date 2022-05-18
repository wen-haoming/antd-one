import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useMemo } from 'react';
import type { ColProps, FormProps, FormInstance } from 'antd';
import { Form } from 'antd';
import type { Field, FieldFunc } from './types';
import RenderProvider from './RenderProvider';
import { innerConfig } from './components';
import { CreateOptions } from './utils';

export type FRField = (Field | FieldFunc | (Field | FieldFunc)[])[];

export interface FRProps {
  fields: FRField;
  layout?: 'horizontal' | 'inline' | 'vertical';
  labelAlign?: 'left' | 'right';
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  onFinish?: (values: any, valuesOpts: any) => void;
  onValuesChange?: (changedValues: any, values: any, valuesOpts: any) => void;
  form?: FormInstance;
  install: Record<string, any>;
  initialValues?: Record<string, any>;
  labelWrap?: boolean;
}

const FormRender: FC<FRProps> = (props) => {
  const {
    fields = [],
    layout,
    labelAlign,
    labelCol,
    wrapperCol,
    onFinish,
    onValuesChange: valuesChange2,
    form,
    install,
    initialValues,
    labelWrap,
  } = props;
  const [formInstance] = Form.useForm(form);

  const formDataOptions = useMemo(() => new CreateOptions(), []);

  const onValuesChange = useMemo(() => valuesChange2, []);

  const formContextValue = useMemo(
    () => ({
      layout,
      labelAlign,
      labelCol,
      wrapperCol,
      labelWrap,
    }),
    [],
  );

  const mergeInstall = useMemo(() => {
    return {
      ...innerConfig,
      ...install,
    };
  }, [install]);

  const valuesChange: FormProps['onValuesChange'] = useCallback((changedValues, values) => {
    if (onValuesChange) {
      Promise.resolve().then(() =>
        onValuesChange(changedValues, formInstance.getFieldsValue(), formDataOptions.options),
      );
    }
  }, []);

  const finish: FormProps['onFinish'] = (values) => {
    if (onFinish) {
      onFinish(values, formDataOptions);
    }
  };

  // useImperativeHandle(ref, () => ({
  //   form: formInstance,
  //   formDataOptions: formDataOptions.current,
  //   resetFormDataOptions: () => {
  //     formDataOptions.current = {};
  //   },
  // }));

  return (
    <Form
      form={formInstance}
      onValuesChange={valuesChange}
      onFinish={onFinish && finish}
      initialValues={initialValues}
      {...formContextValue}
    >
      <RenderProvider
        form={formInstance}
        fields={fields}
        install={mergeInstall}
        formDataOptions={formDataOptions}
      />
    </Form>
  );
};

export default memo(FormRender);

export { default as Render } from './RenderProvider';
