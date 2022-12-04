import type { IFormItemProps } from '@formily/antd';
import type { createSchemaField, ISchema, SchemaKey } from '@formily/react';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';

type ArrayTableComponentType =
  | 'SortHandle'
  | 'Addition'
  | 'Remove'
  | 'MoveDown'
  | 'MoveUp'
  | 'Index';

export type FieldType<T> = Omit<ISchema, 'type'> & {
  type: 'Input' | 'Select' | 'ArrayTable' | 'Editable.Popover' | keyof T;
  valueType?:
    | 'String'
    | 'Number'
    | 'Object'
    | 'Array'
    | 'Boolean'
    | 'Date'
    | 'DateTime'
    | 'Void';
  schemafield: ReturnType<typeof createSchemaField>;
  name?: SchemaKey;
  title?: ISchema['title'];
  itemProps?: IFormItemProps;
  props?: ISchema['x-component-props'];
  required?: ISchema['required'];
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
    name?: 'string';
  })[];
};

function Field<T>(props: FieldType<T>) {
  const {
    type,
    title,
    valueType,
    required,
    schemafield: SchemaField,
    name,
    reactions,
    validator,
    itemProps,
  } = props;

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

  const Item = SchemaField[name ? valueType || 'String' : 'Void'];

  return (
    <Item
      x-validator={validator}
      x-decorator="FormItem"
      name={name}
      title={title}
      x-decorator-props={{
        style: {
          marginBottom: 12,
        },
        ...itemProps,
      }}
      x-component-props={{
        allowClear: true,
      }}
      x-component={type}
      x-reactions={reactions}
      required={required}
    />
  );
}

export default Field;
