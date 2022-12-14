import { WidgeFC } from '@/components/Widge/types';
import { proxy } from 'valtio';

export type UiItem = {
  props: Record<string, any> | null;
  component: WidgeFC<any>;
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMap = proxy<SchemaMap>({});
