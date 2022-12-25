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
import { createForm, Form, onFormValuesChange } from '@formily/core';
import {
  createSchemaField,
  FormProvider,
  JSXComponent,
  ReactFC,
} from '@formily/react';
import { observable, toJS } from '@formily/reactive';
import { useCreation } from 'ahooks';
import { SpaceProps } from 'antd';
import { useEffect, useMemo } from 'react';
import ArrayTabs from './ArrayTabs';
import Field, { FieldType } from './Field';

export const randomId = () => {
  return Math.floor(Math.random() * 100000).toString(32);
};

// 受控的问题，一定要方便受控，比如：外部能够控制内部字段的显示隐藏，并且隐藏能够保留状态，提交的时候不携带隐藏的字段
//

interface FormRenderProps {
  gridProps?: IFormGridProps;
  layoutProps?: IFormLayoutProps;
  install?: Record<any, JSXComponent>;
  fields: Omit<FieldType<keyof FormRenderProps['install']>, 'schemafield'>[];
  form?: Form;
  initialValues?: Partial<any>;
  children?: (schemafield: JSX.Element, form: Form) => JSX.Element;
  onValuesChange?: (
    values: Record<string, any>,
    valuesOptions: Record<string, any>,
  ) => void;
}

function FormRender(props: FormRenderProps) {
  const {
    layoutProps = {},
    gridProps = {},
    fields = [],
    form: formRef,
    initialValues,
    install,
    onValuesChange,
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
        ArrayTabs: ArrayTabs,
        ...install,
      },
      scope: {},
    });
  }, []);

  const effects = () => {
    if (onValuesChange) {
      onFormValuesChange((form) => {
        const values = form.values;
        const valuesOptions = Object.keys(values).reduce<Record<string, any>>(
          (pre, key) => {
            const val = form.getFieldState(key)?.inputValues;
            if (val && val.length && val.length > 1) {
              pre[key] = val[1];
            }
            return pre;
          },
          {},
        );
        onValuesChange(toJS(values), toJS(valuesOptions));
      });
    }
  };

  const form = useCreation(() => {
    if (formRef) {
      formRef.setEffects(effects);
      return formRef;
    } else {
      return createForm({
        initialValues: initialValues,
        effects: effects,
      });
    }
  }, [formRef]);

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

  const schemafield = useMemo(() => {
    return (
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
              <Field key={key} {...field} schemafield={SchemaField as any} />
            ))}
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    );
  }, [fields]);

  return (
    <FormProvider form={form}>
      {props.children && typeof props.children === 'function'
        ? props.children(schemafield, form)
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
// FormRender.useForm = (options: IFormProps<any>,FormRenderProps?:{
//   onValuesChange: (values: Record<string, any>, valuesOptions: Record<string, any>) => void;
// }) => {
//   // ...
//   return
// };
FormRender.Submit = Submit;
FormRender.Reset = Reset;

export * from './Field';
export default FormRender;
