import { proxy } from 'valtio';

type CurrentState = {
  id?: string;
  panelMode: 'edit' | 'code';
};

export const currentState = proxy<CurrentState>({
  panelMode: 'edit',
});
