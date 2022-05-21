import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { FC } from 'react';
import { useMemo } from 'react';

export type FormSelectProps = SelectProps<any> & {
  valueEnum: Record<string, any>;
};

export const FormSelect: FC<FormSelectProps> = (props) => {
  const { allowClear = true, valueEnum, options,...reset } = props;

  const innerOptions = useMemo(() => {
    if (options) {
      return options;
    } else if (valueEnum) {
      return Object.entries(valueEnum).map(([value, label]) => ({
        label,
        value,
      }));
    }
    return undefined;
  }, [valueEnum, options]);

  return <Select allowClear={allowClear} options={innerOptions} {...reset} />;
};
