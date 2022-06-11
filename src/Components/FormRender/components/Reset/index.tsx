import type { FC } from 'react';
import type { SubmitProps } from '../Submit';
import { Submit } from '../Submit';

export interface ResetProps extends SubmitProps {
  text?: string;
  block?: boolean;
}

export const Reset: FC<ResetProps> = (props) => {
  const { block, ...buttonRest } = props;
  return <Submit text="重置" type="default" {...buttonRest} />;
};
