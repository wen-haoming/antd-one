import { SFC } from '@/components/Widge';
import { proxy } from 'valtio';

export type UiItem = {
  props: Record<string, any>;
  component: SFC<any>;
};

export const uiTree = proxy<Record<string, UiItem[]>>({});
