import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    '@antd-one/components': path.resolve('./packages/components/src/index.tsx'),
  },
  base: '/antd-one',
  publicPath: '/antd-one/',
  resolve: {
    docDirs: ['docs'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.bootcdn.net/ajax/libs/antd/4.23.6/antd.css',
    },
  ],
  favicons: [
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  ],
  themeConfig: {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    name: 'antd-one',
    nav: [
      { title: '组件', link: '/components' },
      { title: '代码生成器', link: 'https://wen-haoming.github.io/antd-one/codegen' },
      { title: '案例', link: '/case' },
    ],
  },
});
