import { create } from 'zustand';

interface DroneState {
  autoSpin: boolean;
  wireframe: boolean;
  exploded: boolean;
  propSpeed: number;
  hoverEnabled: boolean;
  hoveredComponent: string | null;
  showLabels: boolean;
  toggleSpin: () => void;
  toggleWireframe: () => void;
  toggleExplode: () => void;
  setPropSpeed: (speed: number) => void;
  toggleHover: () => void;
  setHoveredComponent: (name: string | null) => void;
  toggleLabels: () => void;
}

export const useDroneStore = create<DroneState>((set) => ({
  autoSpin: true,
  wireframe: false,
  exploded: false,
  propSpeed: 1.0,
  hoverEnabled: true,
  hoveredComponent: null,
  showLabels: true,
  toggleSpin: () => set((s) => ({ autoSpin: !s.autoSpin })),
  toggleWireframe: () => set((s) => ({ wireframe: !s.wireframe })),
  toggleExplode: () => set((s) => ({ exploded: !s.exploded })),
  setPropSpeed: (speed) => set({ propSpeed: speed }),
  toggleHover: () => set((s) => ({ hoverEnabled: !s.hoverEnabled })),
  setHoveredComponent: (name) => set({ hoveredComponent: name }),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
}));
