import { Brand } from '@/components';
import type { TableFormRenderProps } from '@antd-one/components';
import { FormRender } from '@antd-one/components';
import { Input, Switch } from '@formily/antd';
import { ArrayField } from '@formily/core';
import { observer, useField } from '@formily/react';
import { toJS } from '@formily/reactive';
import { useBoolean } from 'ahooks';
import type { TableColumnProps } from 'antd';
import { Button, ConfigProvider, Modal, Segmented } from 'antd';
import { FC, useEffect, useState } from 'react';

const install = {
  Input,
  Switch,
};

const Columns: FC<{
  value: TableFormRenderProps<any>['columns'] & TableColumnProps<any>[];
  onChange: (p: TableFormRenderProps<any>['columns']) => void;
}> = observer(() => {
  const field = useField<ArrayField>();
  const [vis, { setTrue, setFalse }] = useBoolean();
  const value = Array.isArray(field.value) ? field.value : [];
  const dataSource = value?.length ? value : [{}];
  const [currentVal, setCurrentVal] = useState(() => dataSource[0].dataIndex);
  const [form, setForm] = useState(() => FormRender.createForm());

  const segmentedChange = (val: string | number) => {
    setCurrentVal(val);
    const index = (dataSource || []).findIndex(
      (item) => item.dataIndex === val,
    );
    const newForm = FormRender.createForm();
    setForm(newForm);
    newForm.setValues(toJS(dataSource[index]));
  };

  useEffect(() => {
    if (vis) {
      form.onMount();
      segmentedChange(currentVal);
    }
  }, [vis]);

  return value ? (
    <>
      <Button
        type="primary"
        onClick={() => {
          form.onMount();
          setTrue();
        }}
      >
        columns配置
      </Button>
      <Modal
        title={'column配置'}
        open={vis}
        onOk={async () => {
          await form.validate();
          setFalse();

          // field.value = dataSource
        }}
        onCancel={() => {
          setFalse();
          form.onUnmount();
        }}
      >
        <div className="flex w-full">
          <div className="overflow-x-auto">
            <Segmented
              value={currentVal}
              options={dataSource.map((item: any) => {
                return {
                  label: item.title as string,
                  value: item.dataIndex as string,
                };
              })}
              onChange={segmentedChange}
              onResize={undefined}
              onResizeCapture={undefined}
            />
          </div>
          <div className="btn m-l-5px">+</div>
        </div>
        <div className="w-xs mt">
          <ConfigProvider componentSize="small">
            <FormRender
              install={install}
              form={form}
              gridProps={{ maxColumns: 1 }}
              layoutProps={{ labelCol: 6 }}
              onValuesChange={(values) => {
                const index = (dataSource || []).findIndex(
                  (item) => item.dataIndex === currentVal,
                );
                field.value[index] = values;
              }}
              fields={[
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
                // {
                //   type: 'Switch',
                //   name: 'searchField',
                //   title: '表单搜索',
                // },
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
              ]}
            />
          </ConfigProvider>
        </div>
      </Modal>
    </>
  ) : null;
});

export default Columns;
