import type { InputProps } from 'antd';
import { Input } from 'antd';
import type { FC } from 'react';

export type InputPasswrodProps = InputProps;

export const InputPasswrod: FC<InputPasswrodProps> = (props) => {
  const { allowClear = true } = props;
  return <Input.Password  allowClear={allowClear} {...props} />;
};
