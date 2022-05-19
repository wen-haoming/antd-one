import TableFormRender from '../index';
import { demo1Api } from './mock';

const demo2 = () => {
  return (
    <TableFormRender
      columns={[
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
          searchField(formData, opts, formInstance) {
            return {
              type: 'FormInput',
              props: {
                label: '分拨名称',
                name: 'siteName',
                onChange(e) {
                  formData.zoneName = e.target.value;
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
            type: 'FormInput',
            props: {
              label: '库区名称',
              name: 'zoneName',
            },
          },
        },
        {
          title: '类型',
          dataIndex: 'type',
          searchField: {
            type: 'FormSelect',
            props: {
              name: 'type',
              label: '类型',
              fieldProps: {
                valueEnum: {
                  输入框: '输入框',
                  日期选择: '日期选择',
                },
              },
            },
          },
        },
        {
          title: '类型控件',
          dataIndex: 'creatorId',
          searchField(formData, opts) {
            const type =
              formData.type === '输入框'
                ? 'FormSelect'
                : formData.type === '日期选择'
                ? 'FormInput'
                : 'FormInput';
            return {
              hideInSearch: formData.type === 1 || formData.type === 2,
              type: type,
              props: {
                name: 'creatorId',
                label: '类型控件',
              },
            };
          },
        },
        {
          title: '更新人',
          dataIndex: 'updatorId',
        },
      ]}
      request={demo1Api}
    />
  );
};

export default demo2;
