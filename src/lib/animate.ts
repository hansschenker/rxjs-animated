import { merge, Subject, of, Observable } from "rxjs";
import { scan, map } from "rxjs/operators";
import { ObservableCSSVariableMap} from "./types";
import { styledash } from "./styledas";

export const animate = (
  observableMap: ObservableCSSVariableMap,
  target: HTMLElement = document.documentElement
) => {
  if (!observableMap || typeof observableMap !== "object") {
    throw new Error("Invalid observableMap: Must be a non-null object.");
  }

  Object.keys(observableMap).forEach((key) => {
    if (!key.startsWith("--")) {
      throw new Error(`Invalid CSSVariable: ${key}. Must start with "--".`);
    }
  });

  if (!(target instanceof HTMLElement)) {
    throw new Error("Invalid target: Must be an HTML element.");
  }

  const style$ = merge(
    ...Object.entries(observableMap).map(([key, observable]) => {
      const source$ = observable instanceof Observable ? observable : of(observable);
      return source$.pipe(map((value) => ({ [key]: value })));
    })
  ).pipe(
    scan(
      (state, style) => ({
        ...state,
        ...style,
      }),
      {}
    )
  );

  const sub$ = new Subject();

  setTimeout(() =>
    style$.subscribe((style) => {
      styledash(target).set(style);
      sub$.next(style);
    })
  );

  return sub$;
};
