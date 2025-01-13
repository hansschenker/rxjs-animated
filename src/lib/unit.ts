import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const unit = {
  px: (o$: Observable<number>) => o$.pipe(map((value) => `${value}px`)),
  percent: (o$: Observable<number>) => o$.pipe(map((value) => `${value}%`)),
  opacity: (o$: Observable<number>) => o$.pipe(map((value) => `${Math.min(Math.max(value, 0), 1)}`)),
  transform: {
    rotate: (o$: Observable<number>) => o$.pipe(map((value) => `rotate(${value}deg)`)),
    scale: (o$: Observable<number>) => o$.pipe(map((value) => `scale(${value})`)),
    translateX: (o$: Observable<number>) => o$.pipe(map((value) => `translateX(${value}px)`)),
    translateY: (o$: Observable<number>) => o$.pipe(map((value) => `translateY(${value}px)`)),
  },
};
