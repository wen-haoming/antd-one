import type {
  ButtonProps as AntButtonProps,
  ModalFuncProps,
  PopconfirmProps,
} from 'antd';
import { Button as AntButton, Modal, Popconfirm } from 'antd';
import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';

export interface ButtonProps extends AntButtonProps {
  onClick?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void | Promise<any>;
  loadingText?: string;
  beforeConfirm?: ModalFuncProps; // 点击 onClick 前 Confirm 二次确认
  beforePopConfirm?: PopconfirmProps; // 点击 onClick 前 popConfirm 二次确认
}

const ConfirmModal = (beforeConfirm: ModalFuncProps) => {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      ...beforeConfirm,
      onOk(...args) {
        if (beforeConfirm.onOk) {
          beforeConfirm.onOk(...args);
        }
        resolve();
      },
      onCancel(...args) {
        if (beforeConfirm.onCancel) {
          beforeConfirm.onCancel(...args);
        }
        reject();
      },
    });
  });
};

const Button: FC<ButtonProps> = (props) => {
  const {
    onClick,
    loading,
    beforeConfirm,
    loadingText,
    beforePopConfirm,
    ...rest
  } = props;
  const [btnLoading, setBtnLoading] = useState(false);

  const btnClick: React.MouseEventHandler<HTMLElement> = useCallback(
    async (e) => {
      if (onClick) {
        if (beforeConfirm) {
          await ConfirmModal(beforeConfirm);
        }
        const res = onClick(e);
        if (typeof res === 'object' && res instanceof Promise) {
          setBtnLoading(true);
          res.then(() => setBtnLoading(false));
          res.catch(() => setBtnLoading(false));
        }
      }
    },
    [beforeConfirm, onClick],
  );

  const antLoading = useMemo(() => {
    return typeof loading === 'undefined' && onClick ? btnLoading : loading;
  }, [loading, onClick, btnLoading]);

  if (beforePopConfirm) {
    return (
      <Popconfirm
        {...beforePopConfirm}
        onConfirm={(e) => {
          if (e) {
            btnClick(e);
          }
        }}
      >
        <AntButton loading={antLoading} {...rest}>
          {antLoading && loadingText ? loadingText : props.children}
        </AntButton>
      </Popconfirm>
    );
  }

  return (
    <AntButton loading={antLoading} {...rest} onClick={btnClick}>
      {antLoading && loadingText ? loadingText : props.children}
    </AntButton>
  );
};

export default Button;
