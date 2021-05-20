import React, {createContext} from "react";

export default createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
})