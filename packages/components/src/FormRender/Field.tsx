import type { IFormItemProps } from '@formily/antd';
import type { createSchemaField, ISchema } from '@formily/react';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';
import { FC } from 'react';

type ArrayTableComponentType =
  | 'SortHandle'
  | 'Addition'
  | 'Remove'
  | 'MoveDown'
  | 'MoveUp'
  | 'Index';

export type FieldType<T> = Omit<ISchema, 'type'> & {
  type:
    | 'Input'
    | 'Select'
    | 'ArrayTable'
    | 'Editable.Popover'
    | keyof T
    | (() => JSX.Element)
    | FC<any>;
  valueType?:
    | 'String'
    | 'Number'
    | 'Object'
    | 'Array'
    | 'Boolean'
    | 'Date'
    | 'DateTime'
    | 'Void';
  schemafield?: ReturnType<typeof createSchemaField>;
  name?: string;
  title?: ISchema['title'];
  itemProps?: IFormItemProps;
  props?: ISchema['x-component-props'];
  required?: boolean;
  reactions?: ISchema['x-reactions'];
  validator?: ISchema['x-validator'];
  decorator?: 'FormItem' | 'Editable';
  // ArrayTablle 才需要
  columns?: ((Omit<ColumnGroupType<any>, 'children'> & ColumnType<any>) & {
    dataIndex: string;
    formField?: FieldType<T> & {
      popoverFields?: FieldType<T>[];
    };
    operations?: ArrayTableComponentType[];
    name?: string;
  })[];
  initialValue?: any;
  display?: 'none' | 'hidden' | 'visible'; //字段展示形式
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty'; //字段交互模式
  hidden?: boolean; //字段是否隐藏
  visible?: boolean; //字段是否显示
  editable?: boolean; //字段是否可编辑
  disabled?: boolean; //字段是否禁用
  readOnly?: boolean; //字段是否只读
  readPretty?: boolean; //字段是否为阅读态
  dataSource?: any[]; //字段数据源
  children?: FieldType<any>[];
};

function Field(props: FieldType<any>) {
  const {
    type,
    valueType = 'String',
    schemafield: SchemaField,
    props: componentProps,
    ...fieldProps
  } = props;

  const Item = (SchemaField as any)[
    fieldProps.name
      ? type === 'ArrayTabs' || type === 'ArrayTable'
        ? 'Array'
        : valueType
      : 'Void'
  ];

  const schemafieldArr = fieldProps.children?.map((item, idx) => (
    <Field schemafield={SchemaField} {...item} key={idx} />
  ));

  const children =
    (schemafieldArr || [])?.length > 0 && SchemaField ? (
      <SchemaField.Object>{schemafieldArr}</SchemaField.Object>
    ) : (
      schemafieldArr
    );

  return (
    <Item
      x-read-pretty={fieldProps.readPretty}
      x-read-only={fieldProps.readOnly}
      x-editable={fieldProps.editable}
      x-disabled={fieldProps.disabled}
      x-hidden={fieldProps.hidden}
      x-display={fieldProps.display}
      name={fieldProps.name}
      enum={fieldProps.dataSource || fieldProps.enum}
      x-validator={fieldProps.validator}
      x-decorator={fieldProps.decorator || 'FormItem'}
      x-decorator-props={fieldProps.itemProps}
      title={fieldProps.title}
      x-component-props={componentProps}
      x-component={type as any}
      x-reactions={fieldProps.reactions}
      required={fieldProps.required}
    >
      {children}
    </Item>
  );
}

export default Field;
