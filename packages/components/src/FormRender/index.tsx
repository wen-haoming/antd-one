import {
  FormButtonGroup,
  IFormGridProps,
  IFormItemProps,
  IFormLayoutProps,
  Reset,
  Submit,
} from '@formily/antd';
import {
  ArrayTable,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd/esm';
import { createForm, Form } from '@formily/core';
import {
  createSchemaField,
  FormProvider,
  JSXComponent,
  ReactFC,
} from '@formily/react';
import { observable } from '@formily/reactive';
import { useCreation } from 'ahooks';
import { SpaceProps } from 'antd';
import { useEffect, useMemo } from 'react';
import Field, { FieldType } from './Field';

interface FormRenderProps {
  gridProps?: IFormGridProps;
  layoutProps?: IFormLayoutProps;
  install?: Record<any, JSXComponent>;
  fields: Omit<FieldType<keyof FormRenderProps['install']>, 'schemafield'>[];
  form?: Form;
  initialValues?: Partial<any>;
  children?: (schemafield: JSX.Element) => JSX.Element;
}

function FormRender(props: FormRenderProps) {
  const {
    layoutProps = {},
    gridProps = {},
    fields = [],
    form: formRef,
    initialValues,
    install,
  } = props;

  const SchemaField = useMemo(() => {
    return createSchemaField({
      components: {
        FormLayout,
        FormItem,
        FormGrid,
        Input,
        Select,
        ArrayTable,
        ...install,
      },
      scope: {},
    });
  }, []);

  const form = useCreation(
    () =>
      formRef
        ? formRef
        : createForm({
            initialValues: initialValues,
            effects() {},
          }),
    [!!formRef],
  );

  const obs = useMemo(
    () =>
      observable({
        layoutProps,
        gridProps,
      }),
    [],
  );

  useEffect(() => {
    obs.layoutProps = layoutProps;
  }, Object.values(layoutProps));

  useEffect(() => {
    obs.gridProps = gridProps;
  }, Object.values(gridProps));

  const schemafield = (
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-reactions={(field) => {
          field.setComponentProps(obs.layoutProps);
        }}
      >
        <SchemaField.Void
          x-component="FormGrid"
          x-reactions={(field) => {
            field.setComponentProps(obs.gridProps);
          }}
        >
          {fields.map((field: any, key) => (
            <Field<typeof install>
              key={key}
              {...field}
              schemafield={SchemaField as any}
            />
          ))}
        </SchemaField.Void>
      </SchemaField.Void>
    </SchemaField>
  );

  return (
    <FormProvider form={form}>
      {props.children && typeof props.children === 'function'
        ? props.children(schemafield)
        : schemafield}
    </FormProvider>
  );
}
FormRender.FormButtonGroup = FormButtonGroup as ReactFC<
  Omit<SpaceProps, 'align' | 'size'> & {
    align?: React.CSSProperties['textAlign'];
    gutter?: number;
  }
> & {
  Sticky: ReactFC<React.PropsWithChildren<any>>;
  FormItem: ReactFC<
    IFormItemProps & {
      gutter?: number;
    }
  >;
};
FormRender.createForm = createForm;
FormRender.Submit = Submit;
FormRender.Reset = Reset;

export default FormRender;
