import { ProFormDependency } from '@ant-design/pro-form';
import type { FormInstance } from 'antd/es/form';

import type { ColumnItem, SearchField, SearchFieldFunc } from './types';
import type { FC } from 'react';

export const Render: FC<{
  columnsItem: ColumnItem;
  Colkey: number | string;
  formInstance: FormInstance;
  formDataOptions: { current: Record<string, any> };
  install: Record<string, any>;
}> = (props) => {
  const { columnsItem, Colkey, formInstance, formDataOptions, install } = props;
  if (!columnsItem.searchField) return null;

  if (typeof columnsItem.searchField === 'function') {
    const { dependencies } = columnsItem.searchField(
      formInstance.getFieldsValue(),
      formDataOptions.current,
      formInstance,
    );

    return (
      <ProFormDependency name={dependencies || []} key={Colkey}>
        {(formData) => {
          const { type, props } = (columnsItem.searchField as SearchFieldFunc<any>)(
            formData,
            formDataOptions.current,
            formInstance,
          );

          const { dataIndex, key, title } = columnsItem;
          // 表单字段的 name 取值规则，默认优先 key
          const name = props.name || key || dataIndex;
          //  匹配对应的组件
          const Comp: any = install[type];

          if (!Comp) {
            return null;
          }
          return (
            <Comp
              label={title}
              name={name}
              {...props}
              onChange={(val, opt) => {
                if (typeof opt === 'object') {
                  formDataOptions.current[name] = opt;
                }
                if (props.onChange) {
                  props.onChange(val, opt);
                }
                if (!val) {
                  // 如果该属性不存在，需要删除 opt 上的属性
                  Reflect.deleteProperty(formDataOptions.current, name);
                }
              }}
            />
          );
        }}
      </ProFormDependency>
    );
  } else {
    const { type, render, props={} } = columnsItem.searchField as SearchField<any>;

    const { dataIndex, key, title } = columnsItem;

    if (!!render) {
      return render(columnsItem);
    }

    // 表单字段的 name 取值规则，默认优先 key
    const name = props.name || key || dataIndex;

    //  匹配对应的组件
    const Comp: any = install[type];
    if (!Comp) {
      return null;
    }

    return (
      <Comp
        key={Colkey}
        label={title}
        name={name}
        {...props}
        onChange={(val, opt: any) => {
          if (typeof opt === 'object') {
            formDataOptions.current[name] = opt;
          }
          if (props.onChange) {
            props.onChange(val, opt);
          }
          if (!val) {
            // 如果该属性不存在，需要删除 opt 上的属性
            Reflect.deleteProperty(formDataOptions.current, name);
          }
        }}
      />
    );
  }
};
