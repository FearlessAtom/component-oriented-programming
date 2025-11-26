import { createContext, useContext, useState } from "react";
import { defaultGameSettings } from "../config";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
    const [cardCount, setCardCount] = useState(localStorage.getItem("cardCount") ?? defaultGameSettings.cardCount);
    const [isMoveLimited, setIsMoveLimited] = useState(localStorage.getItem("isMoveLimited") === "true");
    const [moveLimit, setMoveLimit] = useState(localStorage.getItem("moveLimit") ?? defaultGameSettings.moveLimit);
    const [cardsToMatch, setCardsToMatch] = useState(localStorage.getItem("cardsToMatch") ?? defaultGameSettings.cardsToMatch);
    const [isBoardLocked, setIsBoardLocked] = useState(false);
    const [isGameGoing, setIsGameGoing] = useState(false);

    const saveCardCount = (value) => {

        if (!Number.isInteger(Number(value)) || !value) return;

        localStorage.setItem("cardCount", value);
        setCardCount(value);
    }

    const saveIsMoveLimited = (value) => {
        localStorage.setItem("isMoveLimited", value);
        setIsMoveLimited(value);
    }

    const saveMoveLimit = (value) => {
        if (!Number.isInteger(Number(value)) || !value) return;

        localStorage.setItem("moveLimit", value);
        setMoveLimit(value);
    }

    const saveCardsToMatch = (value) => {
        if (!Number.isInteger(Number(value)) || !value) return;

        localStorage.setItem("cardsToMatch", value);
        setCardsToMatch(value);
    }

    return <SettingsContext.Provider value={{ cardCount, isMoveLimited, moveLimit, cardsToMatch, saveCardCount, saveIsMoveLimited,
        saveMoveLimit, saveCardsToMatch, isBoardLocked, setIsBoardLocked, isGameGoing, setIsGameGoing }}>

        { children }
    </SettingsContext.Provider>
}

function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }

    return context;
}

export { SettingsProvider, useSettings };
