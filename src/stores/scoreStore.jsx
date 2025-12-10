import { create } from "zustand";
import { persist } from "zustand/middleware";

const useScoreStore = create(persist((set) => ({
    moves: 0,
    setMoves: (value) => set({moves: value}),

    percentage: 0,
    setPercentage: (value) => set({percentage: value}),

    resetScore: () => set({ moves: 0, percentage: 0 }),
}), { name: "score-storage" }));

export default useScoreStore;
