import { Divider, DividerProps } from 'antd';
import { WidgeFC } from './types';

(Divider as WidgeFC<DividerProps>).propsConfigArray = [
  {
    type: 'Switch',
    name: 'dashed',
    title: '是否虚线',
  },
];

(Divider as WidgeFC<DividerProps>).importDeclaration = {
  source: 'antd',
  import: 'Divider',
};

export default Divider;
