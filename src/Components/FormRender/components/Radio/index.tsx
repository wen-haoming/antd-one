import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import type { FC } from 'react';
import { useMemo } from 'react';

export type FormRadioGroupProps = RadioGroupProps & {
  valueEnum: Record<string, any>;
};

export const FormRadioGroup: FC<FormRadioGroupProps> = (props) => {
  const { options, valueEnum, ...restProps } = props;

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

  return <Radio.Group options={innerOptions} {...restProps} />;
};
