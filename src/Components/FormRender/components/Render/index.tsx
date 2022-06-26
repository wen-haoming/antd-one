import type { Field, FieldFunc } from '../../types';
import type { ColProps } from 'antd';
import { Form } from 'antd';
import type { FC } from 'react';
import { memo } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { FormRenderContext } from '../../RenderProvider';
import { formatItemProps } from '../../rules';
import { CustomerRender } from './CustomerRender';


interface RProps {
  renderProps: Field | FieldFunc; // form 的渲染实例，既可以是对象，也可以是函数
  colProps: ColProps  // col 的栅格属性，控制列数
}

export const FormRender: FC<RProps> = (FormRenderProps) => {
  const { renderProps, colProps } = FormRenderProps;
  const FRContext = useContext(FormRenderContext);
  const { form } = FRContext;
  const setDeps = useMemo<Set<string>>(() => new Set(), []);

  const proxy = useMemo(() => {
    return new Proxy(
      {},
      {
        get(target, property) {
          // 依赖收集
          if (property) {
            setDeps.add(property as string);
          }
          const value = form?.getFieldValue(property as string);
          return value;
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof renderProps === 'function') {
    // 第一次调用需要获取静态属性
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => {
          // 只要依赖过的表单，就需要刷新
          if (setDeps.size == 0) return false;
          for (const key of [...setDeps]) {
            if (prevValues[key] !== curValues[key]) {
              return true;
            }
          }
          return false;
        }}
      >
        {() => {
          // 第二次调用需要获取动态属性
          const {
            render: Render,
            col, //  用户定义的 col 属性，如果有这个值，那么就取用户的
            props = {},
            type,
          }: Field = formatItemProps(renderProps(proxy, FRContext?.formDataOptions?.options, form));
          return (
            <CustomerRender
              render={Render}
              type={type}
              props={props}
              col={col ? col : colProps}
            />
          );
        }}
      </Form.Item>
    );
  } else {
    const { type, props = {}, render, col } = formatItemProps(renderProps as Field);

    return (
      <CustomerRender
        render={render}
        type={type}
        props={props}
        col={col ? col : colProps}
      />
    );
  }
};

export default memo(FormRender);
