import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTimerStore = create(persist((set, get) => ({
    seconds: 0,
    intervalId: null,

    start: () => {
        const currentId = get().intervalId;
        if (currentId) return;

        const id = setInterval(() => {
            set((state) => ({ seconds: state.seconds + 1 }));
        }, 1000);

        set({ intervalId: id });
    },

    stop: () => {
        const id = get().intervalId;

        if (id) {
            clearInterval(id);
            set({ intervalId: null });
        }
    },

    reset: () => {
        get().stop();
        set({ seconds: 0 });
    },

    cleanup: () => {
        const id = get().intervalId;

        if (id) {
            clearInterval(id);
        }

        set({ intervalId: null });
    },
}),
{
    name: "timer-storage",
    partialize: (state) => ({ seconds: state.seconds }),
}));

export default useTimerStore;
