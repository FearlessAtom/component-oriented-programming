import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
    const [currentPath, setCurrentPath] = useState("/");

    const navigate = (path) => {
        window.history.pushState({}, "", path);
        setCurrentPath(path);
    };

    const value = { currentPath, navigate };

    return <NavigationContext.Provider value={value}>
        {children}
    </NavigationContext.Provider>
}

function useNavigation() {
    const context = useContext(NavigationContext);
    
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    
    return context;
}

export { NavigationProvider, useNavigation };
