import {useMemo, useState} from "./_snowpack/pkg/react.js";
export const useModalState = (initialState = false) => {
  const [state, setState] = useState(initialState);
  return useMemo(() => {
    return {
      isOpen: state,
      open: () => setState(true),
      close: () => setState(false)
    };
  }, [state]);
};
