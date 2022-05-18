import { useRef, cloneElement, useEffect, useMemo } from 'react';
import type { FormInstance, DrawerProps, PopconfirmProps, ModalFuncProps } from 'antd';
import { Drawer, Form, Space, Spin } from 'antd';
import type { FC, ReactElement } from 'react';
import XButton from '../Button';
import type { FRProps } from '../FormRender';
import FormRender from '../FormRender';
import { useModel } from '../../hooks/useModel';
import { installConfig } from '..';

export type MFRProps = {
  trigger?: ReactElement;
  drawerConfig?: DrawerProps;
  formConfig: Omit<FRProps, 'install'>;
  onFinish?: (values: any, valueOpts: any) => Promise<any>;
  onVisibleChange?: (flag: boolean) => void;
  form?: FormInstance;
  beforePopConfirm?: PopconfirmProps;
  beforeConfirm?: ModalFuncProps;
  install?: Record<string, (...args: any) => any>;
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
    install = {},
    loading,
  } = props;
  const [formRenderForm] = Form.useForm(form);
  const formRef = useRef<{
    form: FormInstance;
    formDataOptions: any;
    resetFormDataOptions: () => void;
  }>(null);
  const [visible, setTrue, setFalse] = useModel();

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

  const mergeInstall = useMemo(() => {
    return { ...installConfig, ...install };
  }, []);

  return (
    <>
      {trigger && cloneElement(trigger, { onClick: setTrue })}
      {trigger && (
        <Drawer
          visible={visible}
          onClose={setFalse}
          maskClosable={false}
          footer={
            <Space>
              <XButton key="cancel" onClick={setFalse}>
                取消
              </XButton>
              ,
              <XButton
                beforeQueue={[formRenderForm.validateFields]}
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
            <FormRender
              form={formRenderForm}
              ref={formRef}
              {...formConfig}
              install={mergeInstall}
            />
          </Spin>
        </Drawer>
      )}
    </>
  );
};

export default DrawerFormRender;
