import { memo, useCallback } from 'react';
import { useMemo } from 'react';
import { Form } from 'antd';
import RenderProvider from './RenderProvider';
import { innerConfig } from './components';
import type { FRFinstance } from './useForm';
import type { ColProps, FormProps } from 'antd';
import type { Field, FieldFunc } from './types';
import type { FC } from 'react';

export type FRField = (Field | FieldFunc | (Field | FieldFunc)[])[];

export interface FRProps {
  fields: FRField;
  layout?: 'horizontal' | 'inline' | 'vertical';
  labelAlign?: 'left' | 'right';
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  onFinish?: (values: any, valuesOpts: any) => void;
  onValuesChange?: (changedValues: any, values: any, valuesOpts: any) => void;
  form?: FRFinstance;
  install?: Record<string, any>;
  initialValues?: Record<string, any>;
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
  } = props;
  const [formInstance] = Form.useForm(form);

  const onValuesChange = useMemo(() => valuesChange2, []);

  const formContextValue = useMemo(
    () => ({
      layout,
      labelAlign,
      labelCol,
      wrapperCol,
    }),
    [],
  );

  const mergeInstall = useMemo(() => {
    return {
      ...innerConfig,
      ...install,
    };
  }, [install]);

  const valuesChange: FormProps['onValuesChange'] = useCallback(
    (changedValues: Record<string, any>) => {
      if (onValuesChange) {
        Promise.resolve().then(() =>
          onValuesChange(changedValues, formInstance.getFieldsValue(), form?.formDataOpts),
        );
      }
    },
    [],
  );

  const finish: FormProps['onFinish'] = (values) => {
    if (onFinish) {
      onFinish(values, form?.formDataOpts?.options);
    }
  };

  const innerFields = useMemo(() => {
    return fields;
  }, [JSON.stringify(fields, (_key, value) => {
    if (typeof value === 'object' || typeof value === 'function') {
      return ''
    }
    return value
  })]);

  return (
    <Form
      form={formInstance}
      onValuesChange={valuesChange}
      onFinish={onFinish && finish}
      initialValues={initialValues}
      autoComplete="off"
      {...formContextValue}
    >
      <RenderProvider
        form={formInstance}
        fields={innerFields}
        install={mergeInstall}
        formDataOptions={form?.formDataOpts}
        colProps={formContextValue.labelCol}
      />
    </Form>
  );
};

export default memo<FRProps>(FormRender);
export { useForm } from './useForm';
export { default as Render } from './RenderProvider';
