import React, { useContext, useState } from "react";

export const useSidebarContext = () => {
    return useContext(SidebarContext);
}

export const useSidebarToggleContext = () => {
    return useContext(SidebarToggleContext);
}

const SidebarContext = React.createContext();
const SidebarToggleContext = React.createContext();

export const SidebarContextProvider = ( { children } ) => {

    const [ isShow , setIsShow ] = useState(false);

    const toggleIsShow = () => {
        setIsShow( prevIsShow => !prevIsShow );
    }

    return (
        <SidebarContext.Provider value={isShow}>
            <SidebarToggleContext.Provider value={toggleIsShow}>
                {children}
            </SidebarToggleContext.Provider>
        </SidebarContext.Provider>
    )
   
}