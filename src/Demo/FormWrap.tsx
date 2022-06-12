import { Card } from 'antd';
import type { FC } from 'react';
import { createElement, useState } from 'react';

const FormWrap: FC = (props) => {
  const [obj, setObj] = useState({});
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        alignItems: 'center',
        background: 'rgb(238, 238, 238)',
        padding: '20px 100px',
      }}
    >
      <Card style={{ width: props.width||400 }}>
        {createElement(props.children, {
          setObj: setObj,
        })}
      </Card>
      <Card style={{ width: 400 }}>
        <pre>{JSON.stringify(obj, null, 3)}</pre>
      </Card>
    </div>
  );
};
export default FormWrap;
