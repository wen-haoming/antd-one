import { createFormRender } from '@antd-one/components';
import { Input, Select } from '@formily/antd';

const install = {
  Select,
  Input,
};

export const FormRender = createFormRender<typeof install>(install);
