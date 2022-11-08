import type { ButtonProps } from 'antd';
import { Button } from 'antd';

import type { SFC } from '.';

type AntButtonProps = ButtonProps;

const AntButton: SFC<AntButtonProps> = (props) => {
  const {} = props;

  return <Button {...props} />;
};

// 默认值
AntButton.defaultProps = {
  children: '按钮',
  type: 'primary',
  shape: 'default',
};

// 依赖模块
AntButton.importDeclaration = {
  source: 'antd',
  import: 'Button',
};

// 配置属性
AntButton.propsConfigArray = [
  {
    valueType: 'FormInput',
    label: '文字',
    name: 'children',
    defaultValue: 'primary',
  },
  {
    valueType: 'FormSelect',
    label: '按钮类型',
    name: 'type',
    valueEnum: {
      primary: '主按钮',
      ghost: '幽灵按钮',
      dashed: '虚线按钮',
      link: '链接按钮',
      text: '文本按钮',
      default: '次按钮',
    },
    defaultValue: 'primary',
  },
  {
    valueType: 'FormSelect',
    label: '按钮形状',
    name: 'shape',
    valueEnum: {
      default: '默认',
      circle: '圆形',
      round: '椭圆',
    },
  },
];

export default AntButton;
