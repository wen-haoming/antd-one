import reactElementToJSXString from 'react-element-to-jsx-string';

export function stringify(value: Record<string, any>) {
  return JSON.stringify(value, (key, val) => {
    // 处理函数丢失问题
    if (typeof val === 'function') {
      return `${val}`;
    }
    // 处理undefined丢失问题
    if (typeof val === 'undefined') {
      return 'undefined';
    }
    if (Array.isArray(val)) {
      return val.map((jsxEle) => reactElementToJSXString(jsxEle));
    }
    return val;
  });
}
