import { useMemo, useState } from "react";

export const useModalState = (
    /**
     * @default false
     */
    initialState = false
) => {
    const [state, setState] = useState(initialState);
    return useMemo(() => {
        return {
            isOpen: state,
            open: () => setState(true),
            close: () => setState(false)
        };
    }, [state]);
};
