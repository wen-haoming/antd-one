import type { Field } from '../../types';
import type { ColProps } from 'antd';
import { Col } from 'antd';
import type { FC, ReactNode } from 'react';
import { useContext } from 'react';
import { FormRenderContext } from '../../RenderProvider';
import { Item, innerConfig } from '..';


interface CustomerRenderProps extends Field {
  length?: number;
  col?: ColProps  // col 的栅格属性，控制列数
}

export const CustomerRender: FC<CustomerRenderProps> = (CustomerRenderProps) => {
  const { render, type, props = {}, col, } = CustomerRenderProps;
  const { fieldProps = {}, ...itemProps } = props;

  const FRContext = useContext(FormRenderContext);

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
  if (render) {
    const renderContent = typeof render === 'function' ? render() : render;
    return <Col{...col} >{renderContent}</Col>;
  }

  if (!Comp) {
    return null;
  }

  compProps.Comp = Comp;

    return (
      <Col{...col}>
        <Item {...compProps} />
      </Col>
    );
};
