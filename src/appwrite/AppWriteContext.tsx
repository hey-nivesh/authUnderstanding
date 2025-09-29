import { View, Text } from 'react-native'
import React, { Children, createContext, PropsWithChildren, useState } from 'react'
import Appwrite from './service'

type AppWriteContextType = {
    appwrite: typeof Appwrite;
    isloggedIn: boolean;
    setIsLoggedIn: (islogedIn: boolean) => void;
}

export const AppwriteContext = createContext<AppWriteContextType>({
    appwrite: Appwrite,
    isloggedIn: false,
    setIsLoggedIn: () => {}
})

export const AppwriteProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const defaultValue = {
        appwrite: Appwrite,
        isloggedIn,
        setIsLoggedIn
    };
    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    );
}

export default AppwriteContext;