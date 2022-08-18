import { writable } from "svelte/store";

export function app(sidebarInitiallyOpen: boolean) {
  const sidebarIsOpen = writable<boolean>(sidebarInitiallyOpen);
  return {
    sidebarIsOpen,
    openSidebar: () => sidebarIsOpen.set(true),
    closeSidebar: () => sidebarIsOpen.set(false),
    toggleSidebar: () => sidebarIsOpen.update((n) => !n),
  };
}
