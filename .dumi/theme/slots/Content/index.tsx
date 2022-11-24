import { useSidebarData, useLocation } from 'dumi';

import React, { type FC, type ReactNode } from 'react';
import './heti.scss';
import './index.less';

const Content: FC<{ children: ReactNode }> = (props) => {
  const sidebar = useSidebarData();
  const { pathname } = useLocation();

  if(pathname === '/codegen') return <div  className="dumi-default-content-codegen">
    {props.children}
  </div>


  return (
    <div
      className="dumi-default-content"
      data-no-sidebar={!sidebar || undefined}
    >
      {props.children}
    </div>
  );
};

export default Content;
