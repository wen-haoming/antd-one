import { idSchema, schemaMap } from '@/store';
import { parse } from '@/utils/parse';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export const Code = () => {
  const ref = useRef<any>();
  const monacoRef = useRef<any>();
  const idSchemaSnap = useSnapshot(idSchema);
  const schemaMapSnap = useSnapshot(schemaMap);

  useEffect(() => {
    if (!monacoRef.current) {
      monacoRef.current = monaco.editor.create(ref.current, {
        value: '',
        theme: 'vs-dark',
        language: 'javascript',
        readOnly: true, // 编辑器不可编辑
      });
    }
  }, []);

  useEffect(() => {
    const UiComponents = idSchemaSnap.map(({ id }) => {
      const component = schemaMapSnap[id].component;
      const props = schemaMapSnap[id].props || component.defaultProps;
      return {
        component,
        props,
      };
    });
    if (monacoRef.current) {
      monacoRef.current.setValue(parse(UiComponents));
    }
  }, [idSchemaSnap]);

  return <div ref={ref} className="overflow-auto flex-1 break-words" />;
};

export default Code;
