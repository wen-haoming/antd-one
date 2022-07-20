import '@testing-library/jest-dom';
import { render } from '../../../test'
import { expect, it } from 'vitest'
import SearchSelect from '../'; 

it('render select',async ()=>{
  render(<SearchSelect/>)
})
