import { createTableFormRender } from '@antd-one/components';
import { WidgeFC } from '../types';
import Columns from './Columns';

const TableFormRender: WidgeFC<any> = createTableFormRender() as any;

const random = () => Math.floor(Math.random() * 100000).toString(16);

TableFormRender.defaultProps = {
  tableProps: {
    size: 'small',
    rowKey: 'id',
  },
  request: async () => {
    return new Promise((r) => {
      setTimeout(() => {
        r({
          total: 1000,
          list: Array(1000)
            .fill('')
            .map((_, idx) => ({
              id: idx,
              a: random(),
              b: random(),
              c: random(),
              d: random(),
              e: random(),
            })),
        });
      }, 300);
    });
  },
  columns: [
    {
      title: 'a',
      dataIndex: 'a',
      searchField: {
        type: 'Input',
        required: true,
        props: {
          options: [
            { label: '选项1', value: '1 ' },
            { label: '选项2', value: '2' },
          ],
        },
      },
    },
    {
      title: 'b',
      dataIndex: 'b',
      searchField: {
        type: 'Select',
        props: {
          options: [
            { label: '选项1', value: ' 1 ' },
            { label: '选项2', value: ' 2' },
          ],
        },
      },
    },
    {
      title: 'c',
      dataIndex: 'c',
      searchField: {
        type: 'Select',
        props: {
          options: [
            { label: '选项1', value: ' 1 ' },
            { label: '选项2', value: ' 2' },
          ],
        },
      },
    },
    {
      title: 'd',
      dataIndex: 'd',
      searchField: {
        type: 'Select',
        props: {
          options: [
            { label: '选项1', value: ' 1 ' },
            { label: '选项2', value: ' 2' },
          ],
        },
      },
    },
    {
      title: 'e',
      dataIndex: 'e',
      searchField: {
        type: 'Select',
        props: {
          options: [
            { label: '选项1', value: ' 1 ' },
            { label: '选项2', value: ' 2' },
          ],
        },
      },
    },
  ],
};

TableFormRender.propsConfigArray = [
  {
    type: 'Select',
    title: 'table-size',
    name: 'tableProps.size',
    enum: [
      { label: '小', value: 'small' },
      { label: '中', value: 'middle' },
      { label: '大', value: 'large' },
    ],
  },
  {
    type: 'Switch',
    title: 'borded',
    name: 'tableProps.bordered',
  },
  {
    type: Columns,
    name: 'columns',
    title: 'columns配置',
    valueType: 'Array',
  },
];

export default TableFormRender;