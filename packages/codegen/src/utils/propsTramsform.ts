import type { Field } from '@/components';

export type PropsConfigArray = {
  valueType: Field['type'];
  label: string;
  name: string;
  valueEnum?: Record<string, any>;
  defaultValue?: any;
}[];

export const propsTramsform = (propsArray: PropsConfigArray) => {
  return propsArray.map((item) => {
    const field: Field = {
      type: item.valueType,
      props: {
        name: item.name,
        label: item.label,
      },
    };
    if (item.valueEnum && field.props) {
      field.props.fieldProps = {
        valueEnum: item.valueEnum,
      };
    }
    return field;
  });
};
