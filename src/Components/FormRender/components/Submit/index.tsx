import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import type { FC } from 'react';

export interface SubmitProps extends ButtonProps {
  text?: string;
  block?: boolean;
}

export const Submit: FC<SubmitProps> = (props) => {
  const { text = '提交', block, ...buttonRest } = props;
  return (
    <Button
      type="primary"
      htmlType="submit"
      style={{ width: block ? '100%' : 'auto' }}
      {...buttonRest}
    >
      {text}
    </Button>
  );
};
