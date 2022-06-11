import TableFormRender from '../index';
import { demo1Api } from './mock';

const demo1 = () => {
  return (
    <TableFormRender
      tableProps={{
        rowKey: 'id',
        columns: [
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
            searchField: () => {
              console.log('分拨名称render');
              return {
                type: 'FormInput',
                props: {
                  label: '分拨名称',
                  name: 'siteName',
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
                name: 'siteName2',
              },
            },
          },
          {
            title: '创建人',
            dataIndex: 'creatorId',
            searchField: {
              type: 'FormSelect',
              props: {
                label: '创建人',
                name: 'siteName3',
                fieldProps: {
                  valueEnum: {
                    1: '1',
                    2: '2',
                  },
                },
              },
            },
          },
          {
            title: '更新人',
            dataIndex: 'updatorId',
            searchField: {
              type: 'FormSelect',
              props: {
                label: '创建人4',
                name: 'siteName4',
                fieldProps: {
                  valueEnum: {
                    1: '1',
                    2: '2',
                  },
                },
              },
            },
          },
          {
            title: '更新人2',
            dataIndex: 'updatorId2',
            searchField: {
              type: 'FormSelect',
              props: {
                label: '创建人4',
                name: 'siteName5',
                fieldProps: {
                  valueEnum: {
                    1: '1',
                    2: '2',
                  },
                },
              },
            },
          },
        ],
      }}
      request={demo1Api}
    />
  );
};

export default demo1;
