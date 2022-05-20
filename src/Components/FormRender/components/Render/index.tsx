import type { Field, FieldFunc } from '../../types';
import { Col, Form } from 'antd';
import type { FC } from 'react';
import { memo, useState } from 'react';
import { useContext } from 'react';
import { useMemo, useRef } from 'react';
import { FormRenderContext } from '../../RenderProvider';
import { ItemCeil, RenderTabs } from '..';

import { Item } from '../Item';
interface RProps {
  length?: number; // 栅格列数
  renderProps: Field | FieldFunc; // form 的渲染实例，既可以是对象，也可以是函数
}

export const FormRender: FC<RProps> = (FormRenderProps) => {
  const { renderProps, length = 24 } = FormRenderProps;
  const FRContext = useContext(FormRenderContext);
  const { form } = FRContext;
  const depsRef = useRef<string[]>([]);
  const [, update] = useState({});
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
    const { render, col } = renderProps(proxy, FRContext?.formDataOptions?.options, form);

    const colProps = col ? col : { span: length };

    if (render) {
      if (FRContext.renderDeps) {
        FRContext.renderDeps.push(() => update({}));
      }
      return <Col {...colProps}>{render}</Col>;
    }

    return (
      <Col {...colProps}>
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
            const { type, props } = (renderProps as FieldFunc)(
              proxy,
              FRContext.formDataOptions?.options,
              form,
            );
            const { fieldProps = {}, ...itemProps } = props;
            const { name } = itemProps;
            console.log(name, 'render');
            if (typeof renderProps === 'function' && name && FRContext.formDeps) {
              FRContext.formDeps[name as string] = [...setDeps] as string[];
              depsRef.current = [...setDeps] as string[];
            }
            //  匹配对应的组件
            const Comp: any = typeof type === 'string' ? FRContext.install[type] : type;

            if (!Comp) {
              return null;
            }
            return <Item itemProps={itemProps} fieldProps={fieldProps} Comp={Comp} />;
          }}
        </Form.Item>
      </Col>
    );
  } else {
    const { type, props = {}, hideInForm, render, col } = renderProps as Field;

    const colProps = col ? col : { span: length };

    if (render) {
      return <Col {...colProps}>{render}</Col>;
    }

    const { fieldProps = {}, ...itemProps } = props;

    //  匹配对应的组件
    const Comp: any = typeof type === 'string' ? FRContext.install[type] : type;

    if (!Comp || hideInForm) {
      return null;
    }

    if (typeof type === 'string' && type === 'RenderTabs') {
      return (
        <Col {...colProps}>
          <RenderTabs itemProps={itemProps} fieldProps={fieldProps as any} />
        </Col>
      );
    }

    if (typeof type === 'string' && type === 'ItemCeil') {
      return (
        <Col {...colProps}>
          <ItemCeil itemProps={itemProps} fieldProps={fieldProps as any} />
        </Col>
      );
    }

    return (
      <Col {...colProps}>
        <Item itemProps={itemProps} fieldProps={fieldProps} Comp={Comp} />
      </Col>
    );
  }
};

export default memo(FormRender);
