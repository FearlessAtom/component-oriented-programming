import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
    const [cardCount, setCardCount] = useState(localStorage.getItem("cardCount"));
    const [isMoveLimited, setIsMoveLimited] = useState(localStorage.getItem("isMoveLimited") == "true" ? true : false);
    const [moveLimit, setMoveLimit] = useState(localStorage.getItem("moveLimit"));

    const saveCardCount = (value) => {
        localStorage.setItem("cardCount", value);
        setCardCount(value);
    }

    const saveIsMoveLimited = (value) => {
        localStorage.setItem("isMoveLimited", value);
        setIsMoveLimited(value);
    }

    const saveMoveLimit = (value) => {

        localStorage.setItem("moveLimit", value);
        setMoveLimit(value);
    }

    return <SettingsContext.Provider value={{ cardCount, isMoveLimited, moveLimit, saveCardCount, saveIsMoveLimited, saveMoveLimit}}>
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
