import { writable } from "svelte/store";

export const canvasStore = writable<HTMLCanvasElement | null>(null);
export const glStore = writable<CanvasRenderingContext2D | null>(null);
