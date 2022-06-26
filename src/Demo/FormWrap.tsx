import { Card } from 'antd';
import type { FC } from 'react';

const FormWrap: FC<any> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'rgb(238, 238, 238)',
        padding: '20px 100px',
      }}
    >
      <Card style={{ width: props.width || 400 }}>
        {props.children}
      </Card>
    </div>
  );
};
export default FormWrap;
