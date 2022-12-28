import Code from '@/components/Code';
import Render from '@/components/Render';
import { currentState } from '@/store';
import { FileCode, Workbench } from '@icon-park/react';
import { Space } from 'antd';
import { useSnapshot } from 'valtio';

const modeList: {
  type: 'edit' | 'code';
  Icon: any;
}[] = [
  {
    type: 'edit',
    Icon: Workbench,
  },
  {
    type: 'code',
    Icon: FileCode,
  },
];

const RenderPanel = () => {
  const currentStateSnap = useSnapshot(currentState);

  return (
    <div className="flex flex-col flex-1 bg-brand-grey p-t-0">
      <Space className="flex h-7 w-full bg-white b-brand-grey border-l-1 border-r-1 justify-end items-center p-x2">
        {modeList.map((item, key) => {
          const { Icon } = item;
          // eslint-disable-next-line react/jsx-key
          return (
            <Icon
              key={key}
              className="cursor-pointer"
              onClick={() => {
                currentState.panelMode = item.type;
              }}
              theme="outline"
              size="16"
              fill={
                currentStateSnap.panelMode === item.type ? '#2558fb' : '#9b9b9b'
              }
              strokeLinejoin="miter"
            />
          );
        })}
      </Space>
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-white overflow-y-auto m-2 p-1 flex-col">
        {currentStateSnap.panelMode === 'edit' && <Render />}
        {currentStateSnap.panelMode === 'code' && <Code />}
      </div>
    </div>
  );
};

export default RenderPanel;
