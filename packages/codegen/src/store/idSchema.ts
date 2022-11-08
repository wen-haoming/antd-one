import { proxy } from 'valtio';

type IdSchema = {
  id: string;
  slot?: {
    id: string;
    slotMap: string;
  }[];
}[];

export const idSchema = proxy<IdSchema>([]);
