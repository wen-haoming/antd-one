import type { Field } from '../types';

export const formatItemProps = (field: Field): Field => {
  if (!field.props?.rules) {
    field.props = {
      ...field.props,
      rules: [],
    };
  }

  if (field.type === 'Submit' || field.type === 'Reset') {
    field.props.noStyle = true;
  }

  // 如果有设置 required
  if (typeof field.required === 'boolean' && field.props?.rules) {
    field.props.rules[0] = {
      required: field.required,
    };
  } else if (typeof field.required === 'object' && field.props?.rules) {
    field.props.rules[0] = field.required;
  }

  return field;
};
