import { cloneElement, useEffect } from 'react';
import type { DrawerProps, PopconfirmProps, ModalFuncProps } from 'antd';
import { Drawer, Space, Spin } from 'antd';
import type { FC, ReactElement } from 'react';
import XButton from '../Button';
import type { FRProps } from '../FormRender';
import FormRender, { useForm } from '../FormRender';
import { useModal } from '../../hooks/useModal';
import type { FRFinstance } from '../FormRender/useForm';
export { useForm } from '../FormRender';

export type MFRProps = {
  trigger?: ReactElement;
  drawerConfig?: DrawerProps;
  formConfig: Omit<FRProps, 'install'>;
  onFinish?: (values: any, valueOpts: any) => Promise<any>;
  onVisibleChange?: (flag: boolean) => void;
  form?: FRFinstance;
  beforePopConfirm?: PopconfirmProps;
  beforeConfirm?: ModalFuncProps;
  beforePopCancel?: PopconfirmProps;
  beforeCancel?: ModalFuncProps;
  loading?: boolean;
};

const DrawerFormRender: FC<MFRProps> = (props) => {
  const {
    drawerConfig = {},
    formConfig,
    onFinish,
    trigger,
    onVisibleChange,
    form,
    beforePopConfirm,
    beforeConfirm,
    beforePopCancel,
    beforeCancel,
    loading = false,
  } = props;
  const [formRenderForm] = useForm(form);
  const [visible, setTrue, setFalse] = useModal();

  const onSubmit = async () => {
    const values = await formRenderForm.validateFields();
    if (onFinish) {
      const res = await onFinish(values, form?.formDataOpts.options);
      if (res === true) {
        setFalse();
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      formRenderForm?.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          ...trigger.props,
          onClick: (...args: any[]) => {
            setTrue();
            if (trigger?.props?.onClick) {
              trigger?.props?.onClick(...args);
            }
          },
        })}
      {trigger && (
        <Drawer
          visible={visible}
          onClose={setFalse}
          destroyOnClose
          footer={
            <Space>
              <XButton
                key="cancel"
                beforePopConfirm={beforePopCancel}
                beforeConfirm={beforeCancel}
                onClick={setFalse}
              >
                取消
              </XButton>
              <XButton
                key="confirm"
                beforePopConfirm={beforePopConfirm}
                beforeConfirm={beforeConfirm}
                type="primary"
                onClick={onSubmit}
              >
                确定
              </XButton>
            </Space>
          }
          {...drawerConfig}
        >
          <Spin spinning={loading} tip={'加载中...'}>
            <FormRender form={formRenderForm} {...formConfig} />
          </Spin>
        </Drawer>
      )}
    </>
  );
};

export default DrawerFormRender;
