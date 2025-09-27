import { createContext, useState, useContext } from "react";

const AppContext=createContext();

export const AppProvider = ({children}) => {
  const [search, setSearch] = useState("ocean");

  const [filters, setFilters] = useState({
    orientation: "",
    color: "",
  });


return(
    <AppContext.Provider
    value = {{
        search,
        setSearch,
        filters,
        setFilters
    }}>
        {children}
    </AppContext.Provider>
);
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};