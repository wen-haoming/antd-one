// 可搜索的选择框，带弹出框可以查看详细信息
import type { FC } from 'react';
import type { InnerBaseSelectProps } from './Select';
import type { PopModalProps } from './Modal';
import PopModal from './Modal';
import BaseSelect from './Select';
import { memo, useCallback } from 'react';

export type { FetchCallback } from './Select';

export interface WrapperSelectProps extends InnerBaseSelectProps {
  ModalConfig?: Omit<PopModalProps, 'fetchCallback' | 'onModalSelect'>;
}

export const SelectWithModal: FC<WrapperSelectProps> = (props) => {
  const {
    fetchCallback,
    ModalConfig,
    onSelect,
    onChange,
    disabled,
    placeholder,
    value: propsValue,
    labelInValue,
    ...rest
  } = props;
  // 弹窗回调
  const ModalSelect = useCallback(
    (val: any, opt: any) => {
      if (rest.onChangeOption) {
        rest.onChangeOption(opt);
      }
      if (onChange && labelInValue) {
        onChange({ value: opt.value, label: opt.label }, opt);
      } else if (onChange && !labelInValue) {
        onChange(val, opt);
      }
    },
    [labelInValue, onChange, rest],
  );

  // 弹窗的标题
  if (ModalConfig) {
    ModalConfig.title = ModalConfig.title ? ModalConfig.title : placeholder;
    ModalConfig.width = ModalConfig.width ? ModalConfig.width : '60vw';
  }

  return (
    <div style={{ position: 'relative' }}>
      <BaseSelect
        {...rest}
        value={propsValue}
        onSelect={onChange}
        fetchCallback={fetchCallback}
        disabled={disabled}
        placeholder={placeholder}
        labelInValue={labelInValue}
      />
      {ModalConfig && !disabled && (
        <PopModal {...ModalConfig} onModalSelect={ModalSelect} fetchCallback={fetchCallback} />
      )}
    </div>
  );
};

export default memo(SelectWithModal);
