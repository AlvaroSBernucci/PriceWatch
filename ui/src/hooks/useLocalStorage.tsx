import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initial: string) => {
  const [state, setState] = useState(() => {
    const local = window.localStorage.getItem(key);
    return local ? local : initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
