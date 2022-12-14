// import type { PropsConfigArray } from '@/utils/propsTramsform';
import type { FC } from 'react';
import AntButton from './AntButton';
import AntDivider from './AntDivider';
import AntInput from './AntInput';
import AntResult from './AntResult';
import AntTabs from './AntTabs';
import TableFormRender from './TableFormRender';

export type SFC<Props> = FC<Props> & {
  propsConfigArray: any;
  importDeclaration: {
    source: string;
    importDefault?: string;
    import?: string;
  };
};

export const componentsInstall = {
  AntButton,
  AntInput,
  AntTabs,
  AntResult,
  TableFormRender,
  AntDivider,
};

export type ComponentName = keyof typeof componentsInstall;
