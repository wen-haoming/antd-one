import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { useMemo } from 'react';
import { CreateOptions } from './utils';

export type FRFinstance = FormInstance & {
  formDataOpts: CreateOptions;
};

export const useForm: (form?: FormInstance) => [FRFinstance] = (form?: FormInstance) => {
  const [formInstance] = Form.useForm(form);

  const mergeForm = useMemo(() => {
    const formDataOpts = new CreateOptions();
    return {
      ...formInstance,
      resetFields: (fields?: NamePath[] | undefined) => {
        if (fields) {
          formDataOpts.del(fields as string[]);
        } else {
          formDataOpts.reset();
        }
        formInstance.resetFields(fields);
      },
      formDataOpts,
    };
  }, [formInstance]);

  return [mergeForm];
};
