import { saveAs } from 'file-saver';

import index from './template/index.html?raw';
import pkg from './template/package.json?raw';
import tsconfig from './template/tsconfig.json?raw';
import tsconfigNode from './template/tsconfig.node.json?raw';
import config from './template/vite.config.js?raw';

import AppCss from './template/src/App.css?raw';
import AppTsx from './template/src/App.tsx?raw';
import IndexCss from './template/src/index.css?raw';
import mainTsx from './template/src/main.tsx?raw';
import dts from './template/src/vite-env.d.ts?raw';

import viteSvg from './template/public/vite.svg';

export async function downloadProject(content: string) {
  if (!confirm('是否下载项目文件?')) {
    return;
  }

  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();

  // basic structure
  zip.file('index.html', index);
  zip.file('package.json', pkg);
  zip.file('vite.config.js', config);
  zip.file('tsconfig.json', tsconfig);
  zip.file('tsconfig.node.json', tsconfigNode);

  // project src
  const src = zip.folder('src')!;

  src.file('App.css', AppCss);
  src.file('App.tsx', AppTsx);
  src.file('index.css', IndexCss);
  src.file('main.tsx', mainTsx);
  src.file('Page.tsx', content);
  src.file('vite-env.d.ts', dts);

  const publicFold = zip.folder('public')!;

  publicFold.file('vite.svg', viteSvg);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'antd-one-project.zip');
}
