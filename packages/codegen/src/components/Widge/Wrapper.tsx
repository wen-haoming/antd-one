import { currentState } from '@/store';
import type { FC, ReactNode } from 'react';
import { memo, useCallback } from 'react';
import { useSnapshot } from 'valtio';

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

  return (
    <div
      onClick={handleClick}
      className={`hover:editor-hover z-10 m-b1 m-r1 ${
        id === currentStateSnap.id && 'editor-hover'
      } ${inlineBlock ? 'inline-block' : 'inline-block'}`}
    >
      {props.children}
    </div>
  );
};

export default memo(Wrapper);
