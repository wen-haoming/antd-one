import { cloneElement, useEffect } from 'react';
import type { PopconfirmProps, ModalFuncProps, ModalProps } from 'antd';
import { Modal, Space, Spin } from 'antd';
import type { FC, ReactElement } from 'react';
import XButton from '../Button';
import type { FRProps } from '../FormRender';
import FormRender, { useForm } from '../FormRender';
import { useModal } from '../../hooks/useModal';
import type { FRFinstance } from '../FormRender/useForm';
export { useForm } from '../FormRender';

export type MFRProps = {
  trigger?: ReactElement;
  ModalConfig?: ModalProps;
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

const ModalFormRender: FC<MFRProps> = (props) => {
  const {
    ModalConfig = {},
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
  const [visible, setTrue, setFalse] = useModel();

  const onSubmit = async () => {
    const values = await formRenderForm.validateFields();
    if (onFinish) {
      const res = await onFinish(values, formRenderForm?.formDataOpts.options);
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
        <Modal
          visible={visible}
          onCancel={setFalse}
          maskClosable={false}
          destroyOnClose
          footer={
            <Space>
              <XButton
                key="cancel"
                beforePopConfirm={beforePopCancel}
                beforeConfirm={beforeCancel}
                onClick={setFalse}
              >
                ??????
              </XButton>
              <XButton
                key="confirm"
                beforePopConfirm={beforePopConfirm}
                beforeConfirm={beforeConfirm}
                type="primary"
                onClick={onSubmit}
              >
                ??????
              </XButton>
            </Space>
          }
          {...ModalConfig}
        >
          <Spin spinning={loading} tip={'?????????...'}>
            <FormRender form={formRenderForm} {...formConfig} />
          </Spin>
        </Modal>
      )}
    </>
  );
};

export default ModalFormRender;
