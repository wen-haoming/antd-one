import { useRef, cloneElement, useEffect } from 'react';
import type {
  FormInstance,
  ModalProps,
  PopconfirmProps,
  ModalFuncProps,
} from 'antd';
import { Modal, Form } from 'antd';
import type { FC, ReactElement } from 'react';
import XButton from '../Button';
import type { FRProps } from '../FormRender/index';
import FormRender from '../FormRender';
import { useModal } from '../../hooks';

export type MFRProps = {
  trigger?: ReactElement;
  modalConfig?: ModalProps;
  formConfig: Omit<FRProps, 'install'>;
  onFinish?: (values: any, valueOpts: any) => Promise<any>;
  onVisibleChange?: (flag: boolean) => void;
  form?: FormInstance;
  beforePopConfirm?: PopconfirmProps;
  beforeConfirm?: ModalFuncProps;
  install?: Record<string, (...args: any) => any>;
};

const ModalFormRender: FC<MFRProps> = (props) => {
  const {
    modalConfig = {},
    formConfig,
    onFinish,
    trigger,
    onVisibleChange,
    form,
    beforePopConfirm,
    beforeConfirm,
    install = {},
  } = props;
  const [formRenderForm] = Form.useForm(form);
  const formRef = useRef<{
    form: FormInstance;
    formDataOptions: any;
    resetFormDataOptions: () => void;
  }>(null);
  const [visible, setTrue, setFalse] = useModal();

  const onSubmit = async () => {
    const values = await formRenderForm.validateFields();
    if (onFinish) {
      const res = await onFinish(values, formRef.current?.formDataOptions);
      if (res === true) {
        setFalse();
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      formRef.current?.form.resetFields();
      formRef.current?.resetFormDataOptions();
      // update();
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
      {trigger && cloneElement(trigger, { onClick: setTrue })}
      {trigger && (
        <Modal
          visible={visible}
          onCancel={setFalse}
          maskClosable={false}
          footer={[
            <XButton key="cancel" onClick={setFalse}>
              取消
            </XButton>,
            <XButton
              beforeQueue={[formRenderForm.validateFields]}
              key="confirm"
              beforePopConfirm={beforePopConfirm}
              beforeConfirm={beforeConfirm}
              type="primary"
              onClick={onSubmit}
            >
              确定
            </XButton>,
          ]}
          {...modalConfig}
        >
          <FormRender
            form={formRenderForm}
            ref={formRef}
            {...formConfig}
            install={install}
          />
        </Modal>
      )}
    </>
  );
};

export default ModalFormRender;
