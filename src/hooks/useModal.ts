import { useState, useCallback } from 'react';

export const useModal: () => [boolean, () => void, () => void] = () => {
  const [visible, setVisible] = useState(false);
  const setTrue = useCallback(() => {
    setVisible(true);
  }, []);
  const setFalse = useCallback(() => {
    setVisible(false);
  }, []);
  return [visible, setTrue, setFalse];
};
