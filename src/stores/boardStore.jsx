import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBoardStore = create(persist((set) => ({
    cards: [],
    setCards: (value) => set({cards:value}),

    flippedCards: [],
    setFlippedCards: (value) => set({flippedCards: value}),

    cardsToMatchIds: [],
    setCardsToMatchIds: (value) => set({cardsToMatchIds: value}),

    matchedCards: [],
    setMatchedCards: (value) => set({matchedCards: value}),

    isGameResultsModalOpen: false,
    setIsGameResultsModalOpen: (value) => set({isGameResultsModalOpen: value}),
}), { name: "board-storage" }));

export default useBoardStore;
