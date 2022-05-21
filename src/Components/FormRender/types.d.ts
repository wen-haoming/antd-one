import type { FormInstance } from 'antd/es/form';
import type React from 'react';
import type { ColProps, FormItemProps } from 'antd';
import type { innerConfig } from './components';
import type { RenderTabsProps } from './components/TabPanel';
import type { FormSelectProps } from './components/Select';
import type { FormInputProps } from './components/Input';
import type { FormRadioGroupProps } from './components/Radio';
import type { ItemCeilProps } from './components/ItemCeil';

export type Field = {
  // 如果指定了改条件那么就会有对应
  type?: keyof typeof innerConfig | React.FunctionComponent | React.ClassicComponent;
  props?: {
    fieldProps?: Omit<
      Partial<
        Record<string, any> &
          RenderTabsProps['fieldProps'] &
          Exclude<FormSelectProps, 'options'> &
          Exclude<FormInputProps, 'options'> &
          Exclude<FormRadioGroupProps, 'options'> &
          ItemCeilProps['fieldProps']
      >,
      'options'
    > & {
      options?: { label: string; value: any }[];
    };
  } & FormItemProps;

  hideInForm?: boolean; // 显隐操作
  render?: React.ReactElement; //
  col?: ColProps;
};

export type FieldFunc = (
  formData: any,
  formDataOpts: Record<string, any>,
  formInstance: FormInstance,
  render?: () => React.ReactElement,
) => Field;
