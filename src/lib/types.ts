// Project: RxJS Animated Library
// Reactive animations library based on suggestions and implementations made by ChatGPT in the year 2025

import { Observable } from "rxjs";

// src/lib/types.ts
export type CSSVariable = `--${string}`;

export type CSSValue = string | number;

export type CSSVariableMap = {
  [key in CSSVariable]: CSSValue;
};

export type ObservableOrValue<T> = Observable<T> | T;
export type ObservableCSSVariableMap = {
  [key in CSSVariable]: ObservableOrValue<CSSValue>;
};