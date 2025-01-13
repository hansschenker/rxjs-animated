import { Observable } from "rxjs";
// src/lib/easing.ts
export const easing = {
    linear: (t: number): number => t,
    easeInQuad: (t: number): number => t * t,
    easeOutQuad: (t: number): number => t * (2 - t),
    easeInOutQuad: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  };
  

  
  export const keyframes = (keyframes: number[], duration: number): Observable<number> => {
    const totalFrames = keyframes.length - 1;
    return new Observable<number>((subscriber) => {
      let currentTime = 0;
      const interval = duration / totalFrames;
  
      const tick = () => {
        const frameIndex = Math.min(Math.floor(currentTime / interval), totalFrames);
        subscriber.next(keyframes[frameIndex]);
  
        currentTime += interval;
        if (currentTime <= duration) {
          requestAnimationFrame(tick);
        } else {
          subscriber.complete();
        }
      };
  
      tick();
    });
  };
