import { Brand } from '@/components';
import type { TableFormRenderProps } from '@antd-one/components';
import { FormRender } from '@antd-one/components';
import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import { useBoolean } from 'ahooks';
import type { TableColumnProps } from 'antd';
import { Button, ConfigProvider, Modal } from 'antd';
import { FC, useMemo } from 'react';

const Columns: FC<{
  value: TableFormRenderProps<any>['columns'] & TableColumnProps<any>[];
  onChange: (p: TableFormRenderProps<any>['columns']) => void;
}> = observer((props) => {
  const [vis, { setTrue, setFalse }] = useBoolean();
  const form = useMemo(() => FormRender.createForm(), []);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setTrue();
          form.setValues({
            columns: toJS(props.value || []),
          });
        }}
      >
        columns配置
      </Button>
      <Modal
        title={'column配置'}
        open={vis}
        onOk={async () => {
          await form.validate();
          let newColumns = toJS(form.values.columns);
          newColumns = newColumns.map((item: any) => {
            if (!item?.searchField?.type) {
              delete item.searchField;
            }
            return item;
          });
          props.onChange(newColumns);
          setFalse();
        }}
        onCancel={() => {
          setFalse();
        }}
      >
        <ConfigProvider componentSize="small">
          <FormRender
            form={form}
            gridProps={{ maxColumns: 2 }}
            layoutProps={{ labelCol: 0 }}
            fields={[
              {
                type: 'ArrayTabs',
                name: 'columns',
                valueType: 'Array',
                children: [
                  {
                    type: () => <Brand str="columns配置" />,
                    itemProps: {
                      style: {
                        margin: 0,
                        padding: 0,
                      },
                    },
                  },
                  {
                    type: 'Input',
                    required: true,
                    title: 'title',
                    name: 'title',
                  },
                  {
                    type: 'Input',
                    required: true,
                    title: 'dataIndex',
                    name: 'dataIndex',
                  },
                  {
                    type: () => <Brand str="table搜索配置" />,
                    itemProps: {
                      style: {
                        margin: 0,
                        padding: 0,
                      },
                    },
                  },
                  {
                    type: 'Select',
                    name: 'searchField.type',
                    title: 'type',
                    props: {
                      allowClear: true,
                    },
                    enum: [
                      {
                        label: '输入框',
                        value: 'Input',
                      },
                      {
                        label: '选择框',
                        value: 'Select',
                      },
                    ],
                  },
                  {
                    type: 'Input',
                    required: true,
                    title: 'title',
                    name: 'searchField.title',
                    reactions: {
                      dependencies: ['..searchField.type'],
                      fulfill: {
                        state: {
                          display: `{{!$deps[0]? 'none':'visible'}}`,
                        },
                      },
                    },
                  },
                  {
                    type: 'Input',
                    required: true,
                    name: 'searchField.name',
                    title: 'name',
                    reactions: {
                      dependencies: ['..searchField.type'],
                      fulfill: {
                        state: {
                          display: `{{!$deps[0]? 'none':'visible'}}`,
                        },
                      },
                    },
                  },
                ],
              },
            ]}
          />
        </ConfigProvider>
      </Modal>
    </>
  );
  // ) : null;
});

export default Columns;
