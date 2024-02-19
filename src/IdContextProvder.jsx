import { createContext, useState } from "react";

export const IdContext = createContext("")

import React from 'react';

const IdContextProvder = ({ children }) => {
    const [id, setId] = useState("1")
    return (
        <IdContext.Provider value={{ id, setId }}>
            {children}
        </IdContext.Provider>
    );
};

export default IdContextProvder;