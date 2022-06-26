import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { ColProps } from 'antd/es/grid/col';
import type { FC } from 'react';
import type { FRField } from '../..';
import { splitCol } from '../../utils';
import { FormRender } from '../Render';
const { Item } = Form;

export type ItemCeilProps = {
  itemProps: FormItemProps & { title?: string };
  fieldProps: {
    fields: FRField;
    colProps?: ColProps
  };
};

export const ItemCeil: FC<ItemCeilProps> = (props) => {
  const { itemProps, fieldProps } = props;

  return (
    <Item {...itemProps}>
      {(fieldProps.fields || []).map((field, idx) => {
        if (Array.isArray(field)) {
          return (
            field.map((field2, idx2) => {
              return (
                <FormRender
                  colProps={fieldProps.colProps ? fieldProps.colProps : {
                    span: splitCol(field.length)
                  }}
                  key={`${idx.toString()}-${idx2.toString()}`}
                  renderProps={field2}
                />
              );
            })
          );
        }
        return <FormRender key={`${idx.toString()}`} renderProps={field} colProps={fieldProps.colProps ? fieldProps.colProps : {
          span: splitCol(fieldProps.fields.length)
        }} />;
      })}
    </Item>
  );
};
