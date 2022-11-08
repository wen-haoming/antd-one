import { SFC } from '@/components/Widge';
import { proxy } from 'valtio';

export type UiItem = {
  props: Record<string, any>;
  component: SFC<any>;
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMap = proxy<SchemaMap>({});
