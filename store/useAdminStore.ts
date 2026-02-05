import { create } from "zustand";

/**
 * Admin UI state (sidebar, active tab, etc.).
 * Use this for anything that doesn't need to hit the backend.
 */
interface AdminState {
  sidebarOpen: boolean;
  activeSection: string;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  sidebarOpen: true,
  activeSection: "hero",

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}));
