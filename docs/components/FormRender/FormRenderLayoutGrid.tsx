import React, { useState } from 'react';
import { Radio, Form, Row, Col, Slider } from 'antd'
import { FormRender } from '@antd-one/components';

export default () => {
  const [layout, setLayout] = useState('horizontal');
  const [size, setSize] = useState('small');
  const [gridColumnGap, setgridColumnGap] = useState(9);
  const [labelCol, setlabelCol] = useState(7);
  const [wrapperCol, setwrapperCol] = useState(17);

  const [minColumns, setminColumns] = useState(0);
  const [maxColumns, setmaxColumns] = useState();
  const [columnGap, setcolumnGap] = useState(8);
  const [rowGap, setrowGap] = useState(4);

  return (
    <>
      <Row gutter={100}>
        <Col span={12}>
          <Form size="small">
            <Form.Item label="layout">
              <Radio.Group value={layout} onChange={e => setLayout(e.target.value)}>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="inline">Inline</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="size">
              <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                <Radio.Button value="large">large</Radio.Button>
                <Radio.Button value="default">default</Radio.Button>
                <Radio.Button value="small">small</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="网格布局列间距">
              <Slider
                min={1}
                max={10}
                step={1}
                onChange={setgridColumnGap}
                value={gridColumnGap}
              />
            </Form.Item>
            <Form.Item label="labelCol">
              <Slider
                min={1}
                max={24}
                step={1}
                onChange={setlabelCol}
                value={labelCol}
              />
            </Form.Item>
            <Form.Item label="弹性间距">
              <Slider
                min={1}
                max={24}
                step={1}
                onChange={setwrapperCol}
                value={wrapperCol}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Form size="small">
            <Form.Item label="最小列数">
              <Slider
                min={1}
                max={10}
                step={1}
                onChange={setminColumns}
                value={minColumns}
              />
            </Form.Item>
            <Form.Item label="最大列数">
              <Slider
                min={1}
                max={10}
                step={1}
                onChange={setmaxColumns}
                value={maxColumns}
              />
            </Form.Item>
            <Form.Item label="列间距">
              <Slider
                min={1}
                max={10}
                step={1}
                onChange={setcolumnGap}
                value={columnGap}
              />
            </Form.Item>
            <Form.Item label="行间距">
              <Slider
                min={1}
                max={10}
                step={1}
                onChange={setrowGap}
                value={rowGap}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div style={{ borderTop: '1px solid rgba(0,0,0,.1)', width: '100%', margin: '20px 0' }}></div>
      <FormRender
        gridProps={{
          minColumns,
          maxColumns,
          columnGap,
          rowGap
        }}
        layoutProps={{
          layout: layout,
          size: size,
          gridColumnGap,
          labelCol,
          wrapperCol,
        }}
        fields={[
          {
            type: 'Input',
            name: 'Input',
            title: 'Input',
          },
          {
            type: 'Select',
            name: 'Select',
            title: 'Select2',
          },
          {
            type: 'Input',
            name: 'Input2',
            title: 'Input',
          },
          {
            type: 'Select',
            name: 'Select2',
            title: 'Select2',
          }
        ]
        }
      />

      <code>
        <pre>
          {
            `<FormRender
   layoutProps={{
      layout: ${layout},
      size: ${size},
      gridColumnGap:${gridColumnGap},
      labelCol:${labelCol},
      wrapperCol:${wrapperCol},
    }}
    gridProps={{
      minColumns:${minColumns},
      maxColumns:${maxColumns},
      columnGap:${columnGap},
      rowGap:${rowGap},
   }}
    fields={[...]}
   />`
          }
        </pre>
      </code>

    </>)
};
