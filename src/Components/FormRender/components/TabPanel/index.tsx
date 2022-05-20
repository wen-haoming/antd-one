import type { FormItemProps, TabsProps } from 'antd';
import { Row } from 'antd';
import { Form } from 'antd';
import { Tabs } from 'antd';
import type { FC } from 'react';
import type { FRField } from '../..';
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
} & TabsProps;

const InnerTabs: FC<InnerTabsProps> = (props) => {
  const { value, tabs, ...restTabsProps } = props;
  return (
    <Tabs destroyInactiveTabPane activeKey={value as any} {...restTabsProps}>
      {(tabs || []).map((tab, idx) => {
        return (
          <TabPane animated tab={tab.tab} key={tab.key || idx} style={{ paddingTop: 5 }}>
            {tab.fields.map((field, idx2) => {
              if (Array.isArray(field)) {
                return (
                  <Row key={`${idx.toString()}-${idx2.toString()}`} gutter={16}>
                    {field.map((field2, idx3) => {
                      return (
                        <FormRender
                          length={24 / field.length}
                          key={`${idx.toString()}-${idx2.toString()}-${idx3.toString()}`}
                          renderProps={field2}
                        />
                      );
                    })}
                  </Row>
                );
              }
              return (
                <FormRender key={`${idx.toString()}-${idx2.toString()}`} renderProps={field} />
              );
            })}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export const RenderTabs: FC<RenderTabsProps> = (props) => {
  const { itemProps, fieldProps } = props;

  return (
    <Form.Item noStyle {...itemProps}>
      <InnerTabs {...fieldProps} />
    </Form.Item>
  );
};

export default RenderTabs;
