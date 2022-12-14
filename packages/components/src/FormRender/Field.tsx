import type { IFormItemProps } from '@formily/antd';
import { FormItem } from '@formily/antd';
import { FieldReaction, Form, IFieldFactoryProps } from '@formily/core';
import type { createSchemaField, ISchema } from '@formily/react';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';

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
    | (() => JSX.Element);
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
  reactions?: FieldReaction[] | FieldReaction;
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
  form?: Form;
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
};

export function Field(props: FieldType<any>) {
  const {
    type,
    valueType = 'String',
    schemafield: SchemaField,
    props: componentProps,
    form,
    ...fieldProps
  } = props;

  const Item = (SchemaField as any)[fieldProps.name ? valueType : 'Void'];

  if (typeof type !== 'string' && form && valueType) {
    const fieldObjProps: IFieldFactoryProps<any, any> = {
      name: fieldProps.name as any,
      title: fieldProps.title,
      component: [type, fieldProps],
      decorator: [FormItem, fieldProps.itemProps],
      validator: fieldProps.validator,
      reactions: fieldProps.reactions,
      required: fieldProps.required,
      initialValue: fieldProps.initialValue,
      display: fieldProps.display,
      visible: fieldProps.visible,
      hidden: fieldProps.hidden,
      data: fieldProps.enum || fieldProps.dataSource,
      disabled: fieldProps.disabled,
      editable: fieldProps.editable,
      readOnly: fieldProps.readOnly,
      readPretty: fieldProps.readPretty,
    };
    if (valueType === 'String' && fieldProps.name) {
      form.createField(fieldObjProps);
    } else if (valueType === 'Array' && fieldProps.name) {
      form.createArrayField(fieldObjProps);
    } else if (valueType === 'Object' && fieldProps.name) {
      form.createObjectField(fieldObjProps);
    } else if (valueType === 'Void' && !fieldProps.name) {
      form.createVoidField(fieldObjProps);
    }
    return;
  }

  return (
    <Item
      x-read-pretty={fieldProps.readPretty}
      x-read-only={fieldProps.readOnly}
      x-editable={fieldProps.hidden}
      x-disabled={fieldProps.hidden}
      x-hidden={fieldProps.hidden}
      x-display={fieldProps.display}
      name={fieldProps.name}
      enum={fieldProps.dataSource || fieldProps.enum}
      x-validator={fieldProps.validator}
      x-decorator="FormItem"
      title={fieldProps.title}
      x-decorator-props={fieldProps.itemProps}
      x-component-props={componentProps}
      x-component={type as any}
      x-reactions={fieldProps.reactions}
      required={fieldProps.required}
    />
  );
}

export default Field;

// if (type === 'ArrayTable') {
//   const { addition = {}, ...fieldProps } = props.props

//   return <SchemaField.Array
//     x-validator={validator}
//     x-decorator="FormItem"
//     x-component="ArrayTable"
//     x-decorator-props={itemProps}
//     x-component-props={{
//       pagination: { pageSize: 10 },
//       scroll: { x: '100%' },
//       ...fieldProps
//     }}
//     x-reactions={reactions}

//   >
//     <SchemaField.Object>
//       <SchemaField.String
//         name="required_3"
//         title="必填"
//         x-component="Input"
//         x-decorator="FormItem"
//       />
//       {
//         columns?.map((column, idx) => {
//           const { name, formField, operations, ...resetColumnProps } = column;
//           const key = `column-${idx}`;
//           if (operations) {
//             // 按钮组模式
//             return <SchemaField.Void
//               key={key}
//               x-component="ArrayTable.Column"
//               x-component-props={resetColumnProps}
//             >
//               <SchemaField.Void
//                 x-decorator="FormItem"
//                 x-component="FormItem"
//               >
//                 {
//                   operations.map((operationType, key) => <SchemaField.Void key={`column-${idx}-${operationType}-${key}`} x-component={`ArrayTable.${operationType}`} />)
//                 }
//               </SchemaField.Void>
//             </SchemaField.Void>
//           } else if (formField) {
//             const { name, valueType, validator, decorator, type, reactions, itemProps, props, ...resetFormField } = formField
//             const Item = SchemaField[(name || resetColumnProps.dataIndex) ? (valueType || 'String') : 'Void'];
//             // 普通模式
//             return <SchemaField.Void
//               key={key}
//               name={`column-${resetColumnProps.dataIndex}`}
//               x-component="ArrayTable.Column"
//               x-component-props={resetColumnProps}
//             >
//               <Item
//                 {...resetFormField}
//                 x-validator={validator}
//                 name={name || resetColumnProps.dataIndex}
//                 x-decorator={decorator || 'FormItem'}
//                 x-component={type as any}
//                 x-reactions={reactions}
//                 x-decorator-props={itemProps}
//                 x-component-props={props}
//               />
//             </SchemaField.Void>
//           }
//         })
//       }
//     </SchemaField.Object>
//     {addition && <SchemaField.Void
//       x-component="ArrayTable.Addition"
//       title={addition.title || "添加条目"}
//     />}
//   </SchemaField.Array>
// }
