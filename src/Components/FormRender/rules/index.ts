import type { Field } from '../types';

export const formatRule = (field: Field): Field => {
  if (!field.props?.rules) {
    field.props = {
      ...field.props,
      rules: [],
    };
  }

  // 如果有设置 required
  if (typeof field.required === 'boolean') {
    field.props?.rules?.push({
      required: field.required,
    });
  } else if (typeof field.required === 'object') {
    field.props?.rules?.push(field.required);
  }
  
  return field;
};
