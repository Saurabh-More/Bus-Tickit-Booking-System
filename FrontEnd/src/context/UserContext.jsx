import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) =>{
    const [user,setUser] = useState(false);
    return (
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    )
}

const useAuthContext = () => useContext(UserContext);



export { UserContextProvider,useAuthContext,UserContext };