import type { AntdTableResult } from 'ahooks/lib/useAntdTable/types';
import { useMemo } from 'react';

export interface ProXTableInstance {
  tableRequestInstance: Omit<AntdTableResult<any, any>, 'loading'>;
}

export const useTable = (proXTableInstance?: ProXTableInstance) => {
  return useMemo(() => {
    if (proXTableInstance) {
      return [proXTableInstance];
    } else {
      return [{} as ProXTableInstance];
    }
  }, [proXTableInstance]);
};
