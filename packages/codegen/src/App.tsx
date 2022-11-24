import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.less'; // 引入官方提供的紧凑 less 样式入口文件
import zhCN from 'antd/es/locale/zh_CN';
import 'uno.css';
import Layout from './Layout';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout />
    </ConfigProvider>
  );
}

export default App;
