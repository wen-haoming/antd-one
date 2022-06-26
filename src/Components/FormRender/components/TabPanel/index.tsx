import type { ColProps, FormItemProps, TabsProps } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { Tabs } from 'antd';
import type { FC } from 'react';
import type { FRField } from '../..';
import { splitCol } from '../../utils';
import FormRender from '../Render';

const { TabPane } = Tabs;

/**
 * type:'RenderTabs',
    props:{
        defaultActiveKey: xxx
        tabs:[
              {
                tab:xxx,
                key:xxx
                fields:[]
              }
            ]
          }
 */

export type RenderTabsProps = {
  itemProps: FormItemProps & { title?: string };
  fieldProps: InnerTabsProps;
};

type InnerTabsProps = {
  tabs?: {
    tab?: React.ReactNode;
    key?: string | number | null | undefined;
    fields: FRField;
  }[];
  value?: string | number;
  colProps?: ColProps
} & TabsProps;

const InnerTabs: FC<InnerTabsProps> = (props) => {
  const { value, tabs, colProps, ...restTabsProps } = props;

  return (
    <Tabs destroyInactiveTabPane activeKey={value as any} {...restTabsProps}>
      {(tabs || []).map((tab, idx) => {
        return (
          <TabPane animated tab={tab.tab} key={tab.key || idx}>
            {tab.fields.map((field, idx2) => {
              if (Array.isArray(field)) {
                return field.map((field2, idx3) => {
                  return (
                    <FormRender
                      colProps={colProps ? colProps : {
                        span: splitCol(field.length)
                      }}
                      key={`${idx.toString()}-${idx2.toString()}-${idx3.toString()}`}
                      renderProps={field2}
                    />
                  );
                });
              }
              return (
                <FormRender colProps={colProps ? colProps : {
                  span: splitCol(tab.fields.length)
                }} key={`${idx.toString()}-${idx2.toString()}`} renderProps={field} />
              );
            })}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export const RenderTabs: FC<InnerTabsProps> = (props) => {
  return (
    // <Form.Item noStyle {...itemProps}>
      <InnerTabs {...props} />
    // </Form.Item>
  );
};

export default RenderTabs;
