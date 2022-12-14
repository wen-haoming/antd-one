import { Divider, DividerProps } from 'antd';
import { WidgeFC } from './types';

(Divider as WidgeFC<DividerProps>).propsConfigArray = [
  {
    type: 'Switch',
    name: 'dashed',
    title: '是否虚线',
  },
];

export default Divider;
