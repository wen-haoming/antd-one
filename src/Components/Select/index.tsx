// 可搜索的选择框，带弹出框可以查看详细信息
import type { FC } from 'react';
import { memo } from 'react';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import { usefilterItemProps } from '@/hooks';
import getVal from 'lodash/get';
import { useMemo } from 'react';
import type { WrapperSelectProps } from './SelectWithModal';
import SelectWithModal from './SelectWithModal';

export * from './SelectWithModal';

export type ProFormBaseSelectProps = Omit<WrapperSelectProps & FormItemProps, 'fetchCallback'>;

export const ProFormBaseSelect: FC<
  WrapperSelectProps &
    FormItemProps & {
      noFormItem?: boolean;
    }
> = (props) => {
  const { itemProps, CompProps } = usefilterItemProps<WrapperSelectProps & FormItemProps>(
    props,
  ) as any;

  useMemo(() => {
    // 自动计算出placeholder
    const placeholderStr = CompProps.placeholder
      ? CompProps.placeholder
      : itemProps.label
      ? `请选择${itemProps.label}`
      : '';

    // 如果设置了 rule 的第一项 是 required，并且没有带上 message 的话 自动带上 message
    if (getVal(itemProps.rules, '[0].required') && !getVal(itemProps.rules, '[0].message')) {
      (itemProps.rules as any)[0].message = placeholderStr;
      itemProps.rules = itemProps.rules;
    }
  }, [itemProps, CompProps]);

  if (CompProps.noFormItem) {
    Reflect.deleteProperty(CompProps, 'noFormItem');
    return <SelectWithModal {...CompProps} />;
  }

  return (
    <Form.Item {...itemProps} style={CompProps.style || {}}>
      <SelectWithModal {...CompProps} />
    </Form.Item>
  );
};

export default memo(ProFormBaseSelect);
