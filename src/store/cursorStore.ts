import { create } from "zustand";

export enum CursorType {
  DEFAULT = "default",
  HOVERED = "hovered",
  ARROW = "arrow",
  CROSS = "cross",
}

interface CursorState {
  cursorType: CursorType;
  setCursor: (cursorType: CursorType) => void;
  setDefault: () => void;
  setHovered: () => void;
  setArrow: () => void;
  setCross: () => void;
}

const useCursorStore = create<CursorState>((set) => ({
  // Initial State :)
  cursorType: CursorType.DEFAULT,

  // Global
  setCursor: (cursorType: CursorType) => set({ cursorType }),

  // Actions
  setDefault: () => set({ cursorType: CursorType.DEFAULT }),
  setHovered: () => set({ cursorType: CursorType.HOVERED }),
  setArrow: () => set({ cursorType: CursorType.ARROW }),
  setCross: () => set({ cursorType: CursorType.CROSS }),
}));

export { useCursorStore };
