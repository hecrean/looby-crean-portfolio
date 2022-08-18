import { writable } from "svelte/store";

interface App {
  sidebarOpen: boolean;
  menuOpen: boolean;
}
export function createAppStore() {
  const app = writable<App>({ sidebarOpen: false, menuOpen: false });
  return {
    app,
    openSidebar: () => app.update((app) => ({ ...app, sidebarOpen: true })),
    closeSidebar: () => app.update((app) => ({ ...app, sidebarOpen: false })),
    toggleSidebar: () =>
      app.update((app) => ({ ...app, sidebarOpen: !app.sidebarOpen })),
    openMenu: () => app.update((app) => ({ ...app, menuOpen: true })),
    closeMenu: () => app.update((app) => ({ ...app, menuOpen: false })),
    toggleMenu: () =>
      app.update((app) => ({ ...app, menuOpen: !app.menuOpen })),
  };
}
