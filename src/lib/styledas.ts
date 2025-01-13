import { CSSVariable, CSSValue, CSSVariableMap } from "./types";

interface StyledashOptions {
  fallback?: Partial<CSSVariableMap>;
}

export const styledash = (
  target: HTMLElement = document.documentElement,
  options: StyledashOptions = {}
) => ({
  set: (key: CSSVariable | CSSVariableMap, val?: CSSValue) => {
    if (typeof key === "object" && val === undefined) {
      return Object.entries(key).forEach(([k, v]) =>
        styledash(target, options).set(k as CSSVariable, v)
      );
    }

    const fallback = options.fallback?.[key as CSSVariable];
    const valueToSet = val ?? fallback;

    if (valueToSet !== undefined) {
      target.style.setProperty(key as CSSVariable, String(valueToSet));
    }
  },

  get: (key: CSSVariable): CSSValue | undefined => {
    const value = target.style.getPropertyValue(key).trim();
    return value || options.fallback?.[key];
  },
});
