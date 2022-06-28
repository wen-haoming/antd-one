import type { ColProps } from 'antd/es/grid/col';
import type { FC } from 'react';
import type { FRField } from '../..';
import { splitCol } from '../../utils';
import { FormRender } from '../Render';

export type ItemCeilProps = {
  fields: FRField;
  colProps: ColProps
};

export const ItemCeil: FC<ItemCeilProps> = (props) => {
  const { fields = [], colProps } = props;
  return <>{(
    (fields || []).map((field, idx) => {
      if (Array.isArray(field)) {
        return (
          field.map((field2, idx2) => {
            return (
              <FormRender
                colProps={colProps ? colProps : {
                  span: splitCol(field.length)
                }}
                key={`${idx.toString()}-${idx2.toString()}`}
                renderProps={field2}
              />
            );
          })
        );
      }
      return <FormRender key={`${idx.toString()}`} renderProps={field} colProps={colProps ? colProps : {
        span: splitCol(fields.length)
      }} />;
    })
  )}</>;
};
