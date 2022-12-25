import { Brand } from '@/components';
import type { TableFormRenderProps } from '@antd-one/components';
import { FormRender } from '@antd-one/components';
import { ArrayField } from '@formily/core';
import { observer, useField } from '@formily/react';
import { toJS } from '@formily/reactive';
import { useBoolean } from 'ahooks';
import type { TableColumnProps } from 'antd';
import { Button, ConfigProvider, Modal } from 'antd';
import { FC, useEffect, useMemo } from 'react';

const Columns: FC<{
  value: TableFormRenderProps<any>['columns'] & TableColumnProps<any>[];
  onChange: (p: TableFormRenderProps<any>['columns']) => void;
}> = observer(() => {
  const field = useField<ArrayField>();
  const [vis, { setTrue, setFalse }] = useBoolean();
  const value = Array.isArray(field.value) ? field.value : [];
  // const dataSource = value?.length ? value : [{}];
  const form = useMemo(() => FormRender.createForm(), []);

  useEffect(() => {
    if (vis) {
      form.setValues({
        columns: field.value || [],
      });
    }
  }, [vis]);

  return value ? (
    <>
      <Button type="primary" onClick={setTrue}>
        columns配置
      </Button>
      <Modal
        title={'column配置'}
        open={vis}
        onOk={async () => {
          setFalse();
          field.value = toJS(form.values.columns);
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
                    type: 'Input',
                    required: true,
                    title: 'title',
                    name: 'searchField.title',
                  },
                  {
                    type: 'Input',
                    required: true,
                    name: 'searchField.name',
                    title: 'name',
                  },
                  {
                    type: 'Select',
                    required: true,
                    name: 'searchField.type',
                    title: 'type',
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
                ],
              },
            ]}
          />
        </ConfigProvider>
      </Modal>
    </>
  ) : null;
});

export default Columns;
