import {
  createPortalProvider,
  createPortalRoot,
  loading,
  usePrefixCls,
} from '@formily/antd/esm/__builtins__';
import { createForm, Form, IFormProps } from '@formily/core';
import { FormProvider, Observer, observer, ReactFC } from '@formily/react';
import { toJS } from '@formily/reactive';
import {
  applyMiddleware,
  IMiddleware,
  isBool,
  isFn,
  isNum,
  isStr,
} from '@formily/shared';
import { Modal, ModalProps, PopconfirmProps, Space, version } from 'antd';
import React, { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';

type ModalTitle = string | number | React.ReactElement;

const isModalTitle = (props: any): props is ModalTitle => {
  return (
    isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props)
  );
};

const getModelProps = (props: any): IModalProps => {
  if (isModalTitle(props)) {
    return {
      title: props,
    };
  } else {
    return props;
  }
};

export interface IFormDialog {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDialog;
  forConfirm(middleware: IMiddleware<Form>): IFormDialog;
  forCancel(middleware: IMiddleware<Form>): IFormDialog;
  open(props?: IFormProps): Promise<any>;
  close(): void;
}

export interface IModalProps extends ModalProps {
  onOk?: (event: React.MouseEvent<HTMLElement>) => void | boolean;
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void | boolean;
  loadingText?: React.ReactNode;
}

export function FormDialog(
  title: any,
  id: any,
  renderer: any,
  buttonProps?: {
    beforePopConfirm?: PopconfirmProps;
    onFinish?: (
      values: Record<string, any>,
      valuesOptions: Record<string, any>,
    ) => Promise<any> | void;
  },
): IFormDialog {
  const { beforePopConfirm, onFinish } = buttonProps || {};
  if (isFn(id) || React.isValidElement(id)) {
    // eslint-disable-next-line no-param-reassign
    renderer = id;
    // eslint-disable-next-line no-param-reassign
    id = 'form-dialog';
  }
  const env = {
    host: document.createElement('div'),
    form: null,
    promise: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  } as any;

  const root = createPortalRoot(env.host, id);
  const props = getModelProps(title);
  const modal = {
    ...props,
    afterClose: () => {
      props?.afterClose?.();
      root.unmount();
    },
  };
  const DialogContent = observer(() => {
    return (
      <Fragment>{isFn(renderer) ? renderer(env.form) : renderer}</Fragment>
    );
  });
  const renderDialog = (
    visible = true,
    resolve?: () => Promise<any>,
    reject?: () => any,
  ) => {
    const adaptProps = {
      [version > '4.23.0' ? 'open' : 'visible']: visible,
    };
    return (
      <Observer>
        {() => (
          <Modal
            {...modal}
            {...adaptProps}
            onCancel={(e) => {
              if (modal?.onCancel?.(e) !== false && reject) {
                reject();
              }
            }}
            footer={[
              <Space key="buttonList">
                <Button
                  key="cancel"
                  onClick={(e) => {
                    if (modal?.onCancel?.(e) !== false && reject) {
                      reject();
                    }
                  }}
                >
                  取消
                </Button>
                <Button
                  key="confirm"
                  beforePopConfirm={beforePopConfirm}
                  type="primary"
                  onClick={async (e) => {
                    if (modal?.onOk?.(e) !== false && resolve) {
                      return resolve();
                    }
                  }}
                >
                  确定
                </Button>
              </Space>,
            ]}
          >
            <FormProvider form={env.form}>
              <DialogContent />
            </FormProvider>
          </Modal>
        )}
      </Observer>
    );
  };

  document.body.appendChild(env.host);
  const formDialog = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware);
      }
      return formDialog;
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware);
      }
      return formDialog;
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware);
      }
      return formDialog;
    },
    open: async (props: IFormProps) => {
      if (env.promise) return env.promise;
      env.promise = new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line no-param-reassign
          props = loading(modal.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares),
          ) as any;
          env.form = env.form || createForm(props);
        } catch (e) {
          reject(e);
        }

        const onOk = () => {
          return env.form
            .submit(async () => {
              await applyMiddleware(env.form, env.confirmMiddlewares);
              const values = env.form.values;
              const valuesOptions = Object.keys(values).reduce<
                Record<string, any>
              >((pre, key) => {
                const val = env.form.getFieldState(key)?.inputValues;
                if (val && val.length && val.length > 1) {
                  pre[key] = val[1];
                }
                return pre;
              }, {});
              if (onFinish) {
                await onFinish(toJS(values), toJS(valuesOptions));
              }
              resolve(undefined);
              formDialog.close();
            })
            .catch((e) => {
              console.error(e);
            });
        };
        const onCancel = async () => {
          await loading(modal.loadingText, () =>
            applyMiddleware(env.form, env.cancelMiddlewares),
          );
          formDialog.close();
        };
        root.render(() => renderDialog(true, onOk, onCancel));
      });
      return env.promise.then(() => {
        formDialog.close();
      });
    },
    close: () => {
      if (!env.host) return;
      root.render(() => renderDialog(false));
    },
  };
  return formDialog;
}

const DialogFooter: ReactFC = (props) => {
  const ref = useRef<HTMLDivElement>();
  const [footer, setFooter] = useState<HTMLDivElement>();
  const footerRef = useRef<HTMLDivElement>();
  const prefixCls = usePrefixCls('modal');
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}-content`);
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(`.${prefixCls}-footer`);
        if (!footerRef.current) {
          footerRef.current = document.createElement('div');
          footerRef.current.classList.add(`${prefixCls}-footer`);
          content.appendChild(footerRef.current);
        }
      }
      setFooter(footerRef.current);
    }
  });

  footerRef.current = footer;

  return (
    <div ref={ref} style={{ display: 'none' }}>
      {footer && createPortal(props.children, footer)}
    </div>
  );
};

FormDialog.Footer = DialogFooter;

FormDialog.Portal = createPortalProvider('form-dialog');

export default FormDialog;
