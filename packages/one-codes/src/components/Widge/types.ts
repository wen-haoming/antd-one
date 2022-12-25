import { Install } from '@/Layout/RightPanel';
import { FieldType } from '@antd-one/components';
import { FC } from 'react';

export type WidgeFC<Props> = FC<Props> & {
  propsConfigArray?: FieldType<Install>[];
  importDeclaration?: {
    source: string;
    importDefault?: string;
    import?: string;
  };
};
