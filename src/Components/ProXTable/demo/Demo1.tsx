import type { ProColumnsItems} from '../index';
import { ProTable } from '../index';
import {
  ProFormText,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { demo1Api } from './mock';

// 组件注册
export const install = {
  ProFormText,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormTextArea,
  ProFormSelect,
};

export type InstallConfig = typeof install;

const demo1 = () => {
  const columns: ProColumnsItems<typeof install> = [
    {
      title: '序号',
      dataIndex: 'order',
      width: 50,
      fixed: 'left',
      render(txt, col, idx) {
        return idx + 1;
      },
    },
    {
      title: '分拨名称',
      dataIndex: 'siteName',
      fixed: 'left',
      searchField: {
        type: 'ProFormText',
        props: {
          title: '分拨名称',
          name: 'siteName',
        },
      },
    },
    {
      title: '库区编码',
      dataIndex: 'zoneCode',
    },
    {
      title: '库区名称',
      dataIndex: 'zoneName',
      searchField: {
        type: 'ProFormText',
        props: {
          title: '库区名称',
          name: 'siteName2',
        },
      },
    },
    {
      title: '创建人',
      dataIndex: 'creatorId',
      searchField: {
        type: 'ProFormSelect',
        props: {
          title: '创建人',
          name: 'siteName3',
          valueEnum: {
            1: '1',
            2: '2',
          },
        },
      },
    },
    {
      title: '更新人',
      dataIndex: 'updatorId',
    },
  ];

  return <ProTable install={install} columns={columns} request={demo1Api} />;
};

export default demo1;
