import { ProTable, ProColumnsItems } from '../index';
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

const demo2 = () => {
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
      searchField(formData, opts,formInstance) {
        return {
          type: 'ProFormText',
          props: {
            title:'分拨名称',
            name:'siteName',
            onChange(e) {
              formData.zoneName = e.target.value
            },
          },
        };
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
          title:'库区名称',
          name: 'zoneName',
        },
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      searchField: {
        type: 'ProFormSelect',
        props: {
          name: 'type',
          title:'类型',
          valueEnum: {
            输入框: '输入框',
            日期选择: '日期选择',
          },
        },
      },
    },
    {
      title: '类型控件',
      dataIndex: 'creatorId',
      searchField(formData,opts) {
        const type =
          formData.type === '输入框'
            ? 'ProFormText'
            : formData.type === '日期选择'
            ? 'ProFormDateRangePicker'
            : '';
        return {
          dependencies: ['type'],
          hideInSearch: formData.type === 1 || formData.type === 2,
          type: type,
          props: {
            name: 'creatorId',
            title:'类型控件'
          },
        };
      },
    },
    {
      title: '更新人',
      dataIndex: 'updatorId',
    },
  ];

  return (
    <ProTable
      install={install}
      columns={columns}
      request={demo1Api}
    />
  );
};

export default demo2;
