import { useEffect } from "react";
import { animate } from "../lib/animate";
import { ObservableCSSVariableMap } from "../lib/types";

export const useAnimation = (
  observableMap: ObservableCSSVariableMap,
  target: HTMLElement | null
): void => {
  useEffect(() => {
    if (target) {
      const subscription = animate(observableMap, target).subscribe();
      return () => subscription.unsubscribe();
    }
  }, [observableMap, target]);
};
