import type { FormItemProps} from 'antd';
import { Row } from 'antd';
import { Form } from 'antd';
import type { FC } from 'react';
import type { FRField } from '../..';
import { FormRender } from '../Render';
const { Item } = Form;

export type ItemCeilProps = {
  itemProps: FormItemProps & { title?: string };
  fieldProps: {
    fields: FRField;
  };
};

export const ItemCeil: FC<ItemCeilProps> = (props) => {
  const { itemProps, fieldProps } = props;
  
  return (
    <Item {...itemProps}>
      {(fieldProps.fields || []).map((field, idx) => {
        if (Array.isArray(field)) {
          return (
            <Row key={`${idx.toString()}`} gutter={16}>
              {field.map((field2, idx2) => {
                return (
                  <FormRender
                    length={24 / field.length}
                    key={`${idx.toString()}-${idx2.toString()}`}
                    renderProps={field2}
                  />
                );
              })}
            </Row>
          );
        }
        return <FormRender key={`${idx.toString()}`} renderProps={field} />;
      })}
    </Item>
  );
};
