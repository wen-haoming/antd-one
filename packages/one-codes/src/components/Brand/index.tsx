import type { FC } from 'react';

export const Brand: FC<{ str: string }> = (props) => (
  <div className="flex m-b-2">
    <div className="w-5px b-rd-2px bg-brand-primary mr-7px" />
    <div className="flex-1 text-3.5 font-bold">{props.str}</div>
  </div>
);
