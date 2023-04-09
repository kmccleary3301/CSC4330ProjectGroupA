
import React, {useContext} from "react";

// Context API to share data with components at any level of react componenet tree to manage user state
const AuthContext = React.createContext();

// allows sharing of user's state to children of AuthContext.Provider
export function AuthProvider({children, value}) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// allows access to value passed to AuthContext.Provider
export function useAuthValue(){
    return useContext(AuthContext);
}