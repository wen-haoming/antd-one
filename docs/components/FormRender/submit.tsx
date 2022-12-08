import React from 'react';
import { FormRender } from '@antd-one/components';

export default () => {
  return (
    <>
      <FormRender
        gridProps={{
          maxColumns:1
        }}
        layoutProps={{
          layout: 'vertical',
        }}
        fields={[
          {
            type: 'Input',
            name: 'Input',
            title: 'Input',
            required: true
          },
          {
            type: 'Select',
            name: 'Select',
            title: 'Select2',
            required: true
          },
          {
            type: 'Input',
            name: 'Input2',
            title: 'Input',
            required: true
          },
          {
            type: 'Select',
            name: 'Select2',
            title: 'Select2',
            required: true
          }
        ]
        }
      >
        {(schemafield) => {
          return <>
            {schemafield}
            <FormRender.FormButtonGroup>
              <FormRender.Submit onSubmit={console}>提交</FormRender.Submit>
            </FormRender.FormButtonGroup>
          </>
        }}
      </FormRender>
    </>)
};
