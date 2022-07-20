import {FC} from 'react'
import {Select,SelectProps} from 'antd';

export interface SearchSelectProps extends SelectProps{
  // 
}


const SearchSelect:FC<SearchSelectProps> = (props)=>{

  return <Select {...props} />
}

export default SearchSelect
