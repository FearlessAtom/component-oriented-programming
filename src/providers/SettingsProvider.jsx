import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

function SettingsProvider({ children })
{
    const [cardCount, setCardCount] = useState(0);

    return <SettingsContext.Provider value={{ cardCount, setCardCount }}>
        { children }
    </SettingsContext.Provider>
}

function useSettings()
{
    const context = useContext(SettingsContext);

    if (!context)
    {
        throw new Error('useSettings must be used within SettingsProvider');
    }

    return context;
}

export { SettingsProvider, useSettings };
