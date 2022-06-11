import type { InputProps } from 'antd';
import { Input } from 'antd';
import type { FC } from 'react';

export type FormInputProps =  InputProps

export const FormInput: FC<FormInputProps> = (props) => {
  const { allowClear = true } = props;
  return <Input  allowClear={allowClear} {...props} />;
};
