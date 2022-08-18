import { PointerDifference } from "@/lib/pannable";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onpanstart?: (e: CustomEvent<{ x: number; y: number }>) => void;
    onpanend?: (
      e: CustomEvent<{ x: number; y: number; dx: number; dy: number }>
    ) => void;
    onpanmove?: (e: CustomEvent<PointerDifference>) => void;
  }
}

export {};
