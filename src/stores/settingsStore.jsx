import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultGameSettings } from "../config";

const useSettingsStore = create(persist((set) => ({
    cardCount: defaultGameSettings.cardCount,
    setCardCount: (value) => set({ cardCount: value }),

    cardsToMatch: defaultGameSettings.cardsToMatch,
    setCardsToMatch: (value) => set({ cardsToMatch: value }),

    isMoveLimited: false,
    setIsMoveLimited: (value) => set({ isMoveLimited: value }),

    moveLimit: defaultGameSettings.moveLimit,
    setMoveLimit: (value) => set({ moveLimit: value }),

    isBoardLocked: false,
    setIsBoardLocked: (value) => set({ isBoardLocked: value }),

    isGameGoing: false,
    setIsGameGoing: (value) => set({ isGameGoing: value }),
})));

export default useSettingsStore;
