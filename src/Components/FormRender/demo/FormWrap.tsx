import { Card } from 'antd';

export default (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: 'rgb(238, 238, 238)',
        padding: '40px 0px',
      }}
    >
      <Card style={{width:400}}>{props.children}</Card>
    </div>
  );
};
