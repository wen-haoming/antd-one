import { currentState, idSchema, schemaMap } from '@/store';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FC, ReactNode } from 'react';
import { memo, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import './index.less';

interface ComponentProps {
  id: string;
  children: ReactNode;
  inlineBlock?: boolean;
}

const Wrapper: FC<ComponentProps> = (props) => {
  const { id, inlineBlock = false } = props;
  const currentStateSnap = useSnapshot(currentState);

  const handleClick = useCallback(() => {
    currentState.id = id;
  }, [id]);

  const deleComponent = () => {
    const findIndex = idSchema.findIndex((item) => item.id === id);
    idSchema.splice(findIndex, 1);
    Promise.resolve().then(() => {
      delete currentState.id;
      delete schemaMap[id];
    });
  };

  const cancel = () => {
    Promise.resolve().then(() => {
      delete currentState.id;
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`relative hover:editor-hover z-10 m-b1 m-r1 ${
        id === currentStateSnap.id && 'editor-hover'
      } ${inlineBlock ? 'inline-block' : 'inline-block'}`}
    >
      {props.children}
      {id === currentStateSnap.id && (
        <div className="absolute -right-0px	bottom-0px text-white">
          <>
            <DeleteOutlined
              onClick={deleComponent}
              className="bg-brand-primary text-white  text-10px cursor-pointer p-8px "
            />
            <CloseOutlined
              onClick={cancel}
              className="bg-brand-primary  text-white	text-10px cursor-pointer p-8px"
            />
          </>
        </div>
      )}
    </div>
  );
};

export default memo(Wrapper);
