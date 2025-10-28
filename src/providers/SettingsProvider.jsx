import { createContext, useContext } from "react";

const SettingsContext = createContext();

function SettingsProvider()
{
    return <SettingsContext.Provider>
        
    </SettingsContext.Provider>
}

function useSettings()
{
    const context = useContext(SettingsProvider);

    return context;
}

export { SettingsProvider, useSettings };
