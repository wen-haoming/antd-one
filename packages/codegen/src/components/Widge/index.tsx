import type { PropsConfigArray } from '@/utils/propsTramsform';
import type { FC } from 'react';
import AntButton from './AntButton';
import AntInput from './AntInput';
import AntResult from './AntResult';
import AntTabs from './AntTabs';

export type SFC<Props> = FC<Props> & {
  propsConfigArray: PropsConfigArray;
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
};

export type ComponentName = keyof typeof componentsInstall;
