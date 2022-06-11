import type { Field, FieldFunc } from '../../types';
import { Col, Form } from 'antd';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { FormRenderContext } from '../../RenderProvider';
import { Item, innerConfig } from '..';
import { formatRule } from '../../rules';

interface RProps {
  length?: number; // 栅格列数
  renderProps: Field | FieldFunc; // form 的渲染实例，既可以是对象，也可以是函数
}

const CustomerRender: FC<Field & { length?: number }> = (CustomerRenderProps) => {
  const { render, type, props = {}, length = 24 } = CustomerRenderProps;
  const { fieldProps = {}, ...itemProps } = props;

  const FRContext = useContext(FormRenderContext);
  const colProps = { span: Math.floor(length) };

  //  匹配对应的组件
  const Comp: any = typeof type === 'string' ? FRContext.install[type] || innerConfig[type] : type;

  const compProps: {
    itemProps: Record<string, any>;
    fieldProps: Record<string, any>;
    Comp?: ReactNode;
  } = {
    itemProps,
    fieldProps,
  };

  // 自定义渲染模块
  if (render && FRContext.col) {
    const renderContent = typeof render === 'function' ? render() : render;
    return <Col {...colProps}>{renderContent}</Col>;
  } else if (render && !FRContext.col) {
    const renderContent = typeof render === 'function' ? render() : render;
    return renderContent;
  }

  if (!Comp) {
    return null;
  }

  compProps.Comp = Comp;

  if (FRContext.col) {
    return (
      <Col {...colProps}>
        <Item {...compProps} />
      </Col>
    );
  } else {
    return <Item {...compProps} />;
  }
};

export const FormRender: FC<RProps> = (FormRenderProps) => {
  const { renderProps, length = 24 } = FormRenderProps;
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
            col,
            props = {},
            type,
          }: Field = formatRule(renderProps(proxy, FRContext?.formDataOptions?.options, form));
          return (
            <CustomerRender
              render={Render}
              type={type}
              props={props}
              col={FRContext.col ? FRContext.col : col}
              length={length}
            />
          );
        }}
      </Form.Item>
    );
  } else {
    const { type, props = {}, render, col } = formatRule(renderProps as Field);

    return (
      <CustomerRender
        render={render}
        type={type}
        props={props}
        col={FRContext.col ? FRContext.col : col}
        length={length}
      />
    );
  }
};

export default memo(FormRender);
