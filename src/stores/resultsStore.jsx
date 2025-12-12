import { create } from "zustand";
import { persist } from "zustand/middleware";

const useResultsStore = create(persist((set) => ({
    results: [],

    addResult: (result) => set((state) => ({
         results: [...state.results, result].slice(-10),
    })),

    clearResults: () => set({ results: [] }),

    findResultById: (id) => useResultsStore.getState().results.find(result => result.id === id),
}), { name: "results-storage" }));


export default useResultsStore;
