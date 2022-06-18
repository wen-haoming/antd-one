import { SheetComponent } from '@antv/s2-react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Spin } from 'antd';

interface StableProps {}

// 1. 准备数据
const data = [
  {
    province: '浙江',
    city: '杭州',
    type: '家具',
    sub_type: '桌子',
    price: '1',
  },
  {
    province: '浙江',
    city: '杭州',
    type: '家具',
    sub_type: '沙发',
    price: '2',
  },
  {
    province: '浙江',
    city: '杭州',
    type: '办公用品',
    sub_type: '笔',
    price: '3',
  },
  {
    province: '浙江',
    city: '杭州',
    type: '办公用品',
    sub_type: '纸张',
    price: '4',
  },
];

// 2. 配置数据
const dataCfg = {
  fields: {
    // rows: ['province', 'city','type','sub_type','price'],
    columns: ['type', 'city', 'sub_type', 'province', 'price'],
    // values: ['price'],
  },
  data,
};

const Stable: FC<StableProps> = () => {

  return (
        <SheetComponent  onClick={(item)=>{
          console.log('item',item);
        }} sheetType="table" dataCfg={dataCfg} adaptive />
  );
};

export default Stable;
