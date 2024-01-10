import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  active: boolean;
  setActive: () => void;
  dialogOpen: boolean;
  secondaryPage: boolean;
  activeApp: string;
  setDialogOpen: () => void;
  setSecondaryPage: (open: boolean) => void;
  points: Record<string, number>;
  setClickPoints: (points: Record<string, number>) => void;
  apps: Record<string, string>[];
  setApps?: (apps: Record<string, string>[]) => void;
  setActiveApp: (activeApp: string) => void;
}

export const useGlobaltore = create<State>()(
  persist(
    (set, get) => {
      return {
        active: true,
        secondaryPage: true,
        dialogOpen: true,
        activeApp: "",
        points: { x: 0, y: 0 },
        apps: [
          {
            name: "Settings",
            title: "Settings",
          },
          {
            name: "Collection",
            title: "Collection",
          },
          {
            name: "Cloud",
            title: "Cloud",
          },
          {
            name: "About",
            title: "About",
          },
          {
            name: "Online",
            title: "Online",
          },
          {
            name: "Navigate",
            title: "Navigate",
          },
          {
            name: "Offset",
            title: "Offset",
          },
          {
            name: "IOSignal",
            title: "I/O Signal",
          },
        ],
        setClickPoints: (target: Record<string, number>) => {
          set({ points: { ...target } });
        },
        setActive: () => {
          const { active, dialogOpen } = get();
          set({ active: !active, dialogOpen: !dialogOpen });
        },
        setDialogOpen: () => {
          const { dialogOpen, active } = get();
          set({ dialogOpen: !dialogOpen, active: !active });
        },
        setActiveApp: (activeApp: string) => {
          set({ activeApp });
        },
        setSecondaryPage: (open: boolean) => {
          set({ secondaryPage: open });
        },
      };
    },
    {
      // default set in localstorage
      name: "global",
    }
  )
);
