import { currentSelect } from '@/store';
import type { FC, ReactNode } from 'react';
import { memo, useCallback } from 'react';
import { useRecoilState } from 'recoil';

interface ComponentProps {
  id: string;
  children: ReactNode;
  inlineBlock?: boolean;
}

const Wrapper: FC<ComponentProps> = (props) => {
  const { id, inlineBlock = false } = props;

  const [currentSelectState, setCurrentSelectState] =
    useRecoilState(currentSelect);

  const handleClick = useCallback(() => {
    setCurrentSelectState({
      id,
    });
  }, [id]);

  return (
    <div
      onClick={handleClick}
      className={`hover:editor-hover z-10 m-b1 m-r1 ${
        id === currentSelectState.id && 'editor-hover'
      } ${inlineBlock ? 'inline-block' : 'inline-block'}`}
    >
      {props.children}
    </div>
  );
};

export default memo(Wrapper);
