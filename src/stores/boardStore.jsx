import {create} from "zustand";

const useBoardStore = create((set) => ({
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
}));

export default useBoardStore;
