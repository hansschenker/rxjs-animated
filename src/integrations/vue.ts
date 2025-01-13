import { animate } from "../lib/animate";
import { ObservableCSSVariableMap } from "../lib/types";

declare global {
  interface HTMLElement {
    __rxjsAnimatedSub?: any;
  }
}

export default {
  install(app: any) {
    app.directive("animate", {
      mounted(el: HTMLElement, binding: { value: ObservableCSSVariableMap }) {
        const subscription = animate(binding.value, el).subscribe();
        el.__rxjsAnimatedSub = subscription;
      },
      unmounted(el: HTMLElement) {
        el.__rxjsAnimatedSub?.unsubscribe();
      },
    });
  },
};
