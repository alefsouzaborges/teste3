import { createContext, useState } from 'react';

export const PagesContext = createContext({});

function PagesProvider({children}){
    
    const [pageActive, setPageActive] = useState('');

    return(
        <PagesContext.Provider value={{pageActive: pageActive, setPageActive}}>
            {children}
        </PagesContext.Provider>
    )
}

export default PagesProvider;
