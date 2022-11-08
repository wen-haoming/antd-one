import { proxy } from 'valtio';

type IdMap = {
  id: string;
  slot?: {
    id: string;
    slotMap: string;
  }[];
};

export const idMap = proxy<IdMap[]>([]);
