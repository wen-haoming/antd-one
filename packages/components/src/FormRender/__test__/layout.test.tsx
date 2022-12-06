import React from 'react';
import { render } from '../../../utils/test-utils';

import FormRender from '../'
import { expect, it, describe } from 'vitest';
// function toJson(component: renderer.ReactTestRenderer) {
//   const result = component.toJSON();
//   expect(result).toBeDefined();
//   expect(result).not.toBeInstanceOf(Array);
//   return result as renderer.ReactTestRendererJSON;
// }`

describe('base', () => {
  it('mount label', () => {
    const screen = render(<FormRender
      fields={[
        {
          type: 'Input',
          name: 'input',
          title: 'input'
        }
      ]}
    />)

    expect(screen.getByText('input')).toBeInTheDocument();
  })

  it('initialValues', () => {
    const screen = render(<FormRender
      initialValues={{
        input: '123'
      }}
      fields={[
        {
          type: 'Input',
          name: 'input',
          title: 'input'
        }
      ]}
    />)
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  })

  it('4*4 layout', () => {
    const screen = render(<FormRender
      layoutProps={{
        layout:'vertical'
      }}
      
      fields={[
        {
          type: 'Input',
          name: 'input',
          title: 'input',
          reactions:{
            target:"",
            fulfill:{
              state:{
                componentProps:{
                  layout:'{{$self.value}}'
                }
              }
            }
          }
        }
      ]}
    />)
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  })


})
