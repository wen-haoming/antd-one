import { useState, useCallback } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const setTrue = useCallback(() => {
    setVisible(true);
  }, []);
  const setFalse = useCallback(() => {
    setVisible(false);
  }, []);
  return [visible, setTrue, setFalse];
};
