import { onFieldInit, onFormUnmount } from '@formily/core';
import { observe } from '@formily/reactive';

export const onFieldComponentPropsChange = (pattern: any, callback: any) => {
  const disposes: any[] = [];
  onFieldInit(pattern, (field) => {
    disposes.push(observe(field.componentProps, callback));
  });
  onFormUnmount(() => {
    disposes.forEach((fn) => fn());
  });
};
