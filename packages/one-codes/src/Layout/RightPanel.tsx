import { currentState, schemaMap } from '@/store';
import { FormRender } from '@antd-one/components';
import { Switch } from '@formily/antd';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

const install = { Switch };

export type Install = typeof install;

const RightPanel = () => {
  const currentStateSnap = useSnapshot(currentState);
  // const idSchemaSnap = useSnapshot(idSchema)
  const schemaMapSnap = useSnapshot(schemaMap);
  const [formState, setFormState] = useState<{
    form: ReturnType<typeof FormRender.createForm>;
    fields: any[];
  }>(() => ({ form: FormRender.createForm({}), fields: [] }));
  // 是否已经选中
  const isSelect = !!currentStateSnap.id;

  // 获取组件的默认配置

  useEffect(() => {
    if (currentStateSnap.id) {
      const propsConfigArray =
        (schemaMapSnap &&
          currentStateSnap.id &&
          schemaMapSnap[currentStateSnap.id]?.component?.propsConfigArray) ||
        [];
      const defaultProps =
        schemaMapSnap[currentStateSnap.id]?.component.defaultProps || {};
      const props = schemaMapSnap[currentStateSnap.id]?.props || defaultProps;

      setFormState({
        form: FormRender.createForm({
          initialValues: props,
        }),
        fields: propsConfigArray,
      });
    }
  }, [currentStateSnap.id]);

  return (
    <div className="w-1/5  border-brand-line ">
      <div className="p-5">
        {isSelect && (
          <FormRender
            form={formState.form}
            layoutProps={{ layout: 'horizontal', size: 'small', labelCol: 7 }}
            gridProps={{ maxColumns: 1 }}
            install={install}
            fields={formState.fields}
            onValuesChange={(values) => {
              console.log(values, '==values');

              if (isSelect) {
                // 设置组件的props属性
                schemaMap[currentStateSnap.id].props = values;
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RightPanel;
