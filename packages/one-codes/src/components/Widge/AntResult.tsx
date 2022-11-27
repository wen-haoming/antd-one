import type { ResultProps } from 'antd';
import { Button, Result } from 'antd';
import type { SFC } from '.';

type AntResultProps = ResultProps;

const AntResult: SFC<AntResultProps> = (props) => {
  const {} = props;

  return <Result {...props} />;
};

AntResult.importDeclaration = {
  source: 'antd',
  import: 'Result',
};

AntResult.defaultProps = {
  status: 'success',
  title: 'Successfully Purchased Cloud Server ECS!',
  subTitle:
    'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
  extra: [
    <Button type="primary" key="console">
      Go Console
    </Button>,
    <Button key="buy">Buy Again</Button>,
  ],
};

AntResult.propsConfigArray = [
  {
    valueType: 'TextArea',
    label: '标题',
    name: 'title',
  },
  {
    valueType: 'TextArea',
    label: '小标题',
    name: 'subTitle',
  },
  {
    valueType: 'FormSelect',
    label: '状态',
    name: 'status',
    valueEnum: {
      403: '403',
      404: '404',
      500: '500',
      error: 'error',
      info: 'info',
      success: 'success',
      warning: 'warning',
    },
  },
];

export default AntResult;
