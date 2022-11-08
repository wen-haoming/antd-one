import type { UiTree } from '@/store';
import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import reactElementToJSXString from 'react-element-to-jsx-string';

// 分析依赖
export const getImports = (uiTree: UiTree) => {
  const importMap = uiTree.reduce<Record<string, string | string[]>>(
    (pre, uiTreeItem) => {
      const {
        importDefault,
        import: importName,
        source,
      } = uiTreeItem.UiComponent.importDeclaration;
      if (uiTreeItem && typeof pre[source] === 'undefined') {
        if (importDefault) {
          pre[source] = importDefault;
        } else if (importName) {
          pre[source] = [importName];
        }
      } else if (uiTreeItem && pre[source]) {
        if (Array.isArray(pre[source]) && importName) {
          pre[source] = [...new Set(pre[source].concat(importName))];
        }
      }
      return pre;
    },
    {},
  );

  return Object.entries(importMap)
    .map(([source, importValue]) => {
      if (Array.isArray(importValue)) {
        return `import { ${importValue.join(', ')} } from '${source}';`;
      } else {
        return `import ${importValue} from '${source}';`;
      }
    })
    .join(`\n`);
};

// const getPropsString = (props: Record<string, any>) => {
//   return Object.entries(props)
//     .map(([propsKey, propsValue]) => {
//       if (typeof propsValue === 'string') {
//         // 字符串
//         return `${propsKey}='${propsValue}'`;
//       } else if (typeof propsValue === 'boolean' || typeof propsValue === 'number') {
//         // 布尔值
//         return `${propsKey}={${propsValue}}`;
//       } else if (Array.isArray(propsValue)) {
//         // 数组
//         return `${propsKey}={${stringify(propsValue)}}`;
//       } else if (!Array.isArray(propsValue) && typeof propsValue === 'object') {
//         // 对象
//         return `${propsKey}={${stringify(propsValue)}}`;
//       }
//     })
//     .join(' ');
// };

const getJsx = (uiTree: UiTree) => {
  return uiTree
    .map((uiTreeItem) => {
      const { UiComponent, props } = uiTreeItem;
      const Ele = (UiComponent.importDeclaration.importDefault ||
        UiComponent.importDeclaration.import) as any;

      return reactElementToJSXString(<Ele {...props} />, {
        showFunctions: true,
        functionValue: (fn) => {
          if (fn.name === 'request') {
            return () => {
              return {
                total: 'totalNumber',
                list: [],
              };
            };
          } else {
            return () => {};
          }
        },
      });
    })
    .join('\n');
};

export const parse = (uiTree: UiTree) => {
  const str = `${getImports(uiTree)}

  const Page = () => {

    return <>
        ${getJsx(uiTree)}
    </>
  }

  export default Page
  `;
  return prettier.format(str, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};
