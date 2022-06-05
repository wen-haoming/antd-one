import type { FC } from 'react';
import type { FRField } from '.';
import type { FormInstance } from 'antd/es/form';
import { CreateOptions } from './utils';
import type { ColProps } from 'antd';
import { Row } from 'antd';
import { memo, useMemo, createContext } from 'react';
import Render from './components/Render';
import { innerConfig } from './components';

export { useForm } from './useForm';
interface ItemRenderProps {
  fields: FRField;
  form: FormInstance;
  initialValues?: Record<string, any>;
  install?: Record<string, any>;
  formDataOptions?: CreateOptions;
  col?: ColProps | boolean;
}

const FRProviderValue = {
  nameDeps: {},
  renderDeps: [],
  install: {},
  form: {},
  fields: [],
  formDataOptions: new CreateOptions(),
  formDeps: {},
  col: true,
};

type FRProviderValueContext = typeof FRProviderValue & {
  form: FormInstance;
  install: Record<string, any>;
  renderDeps: (() => void)[];
  formDeps: Record<string, any>;
};

export const FormRenderContext = createContext<FRProviderValueContext>(
  FRProviderValue as FRProviderValueContext,
);

export const ItemRender: FC<ItemRenderProps> = (props) => {
  const { fields, form, install = innerConfig, formDataOptions, col = true } = props;

  const value = useMemo(() => {
    return {
      ...FRProviderValue,
      fields,
      install,
      form,
      formDataOptions: formDataOptions,
      col,
    };
  }, [col, fields, form, formDataOptions, install]);

  const fieldsRender = useMemo(() => {
    return fields.map((field, idx) => {
      if (!Array.isArray(field)) {
        return <Render length={24} renderProps={field} key={idx.toString()} />;
      } else {
        const fieldsArr = field.map((field2, idx2) => {
          return (
            <Render
              length={24 / field.length}
              renderProps={field2}
              key={`${idx.toString()}-${idx2.toString()}`}
            />
          );
        });
        return fieldsArr;
      }
    });
  }, [fields]);

  return (
    <FormRenderContext.Provider value={value as any}>
      <Row gutter={20}>{fieldsRender}</Row>
    </FormRenderContext.Provider>
  );
};

export default memo(ItemRender);
