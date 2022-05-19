import type { FC } from 'react';
import type { FRField } from '.';
import type { FormInstance } from 'antd/es/form';
import type { CreateOptions } from './utils';
import { Row } from 'antd';
import { memo, useMemo, createContext } from 'react';
import Render from './components/Render';
import { innerConfig } from './components';

interface ItemRenderProps {
  fields: FRField;
  form: FormInstance;
  initialValues?: Record<string, any>;
  install?: Record<string, any>;
  formDataOptions?: CreateOptions;
}

const FRProviderValue = {
  nameDeps: {},
  renderDeps: [],
  install: {},
  form: {},
  fields: [],
  formDataOptions: {},
};

export const FormRenderContext = createContext(FRProviderValue);

export const ItemRender: FC<ItemRenderProps> = (props) => {
  const { fields, form, install = innerConfig, formDataOptions } = props;

  const value = useMemo(() => {
    return {
      ...FRProviderValue,
      fields,
      install,
      form,
      formDataOptions: formDataOptions,
    };
  }, [fields, form, formDataOptions, install]);

  const fieldsRender = useMemo(() => {
    return fields.map((field, idx) => {
      if (!Array.isArray(field)) {
        return <Render length={24} renderProps={field} key={idx.toString()} />;
      } else {
        return (
          <Row key={idx.toString()} gutter={16}>
            {field.map((field2, idx2) => {
              return (
                <Render
                  length={24 / field.length}
                  renderProps={field2}
                  key={`${idx.toString()}-${idx2.toString()}`}
                />
              );
            })}
          </Row>
        );
      }
    });
  }, []);

  return (
    <FormRenderContext.Provider value={value as any}>{fieldsRender}</FormRenderContext.Provider>
  );
};

export default memo(ItemRender);
