import {  createContext, useContext, useState } from "react";

let AppContext = createContext();


export const AppProvider=({children})=>{
    // let greeting ="yo bro"
    let [search,setSearch]=useState('cat');
    return <AppContext.Provider value={{search,setSearch}} >
        {children}
    </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext);
}