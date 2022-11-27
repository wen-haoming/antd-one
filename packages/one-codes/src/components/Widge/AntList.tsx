import type { ListProps } from 'antd';
import { List } from 'antd';
import type { FC } from 'react';

type AntListProps = ListProps<any>;

const AntList: FC<AntListProps> = (props) => {
  const {} = props;

  return <List {...props} />;
};

AntList.defaultProps = {};

export default AntList;
