import React, {useContext} from 'react';

const AuthContext = React.createContext();  

export function AuthProvider({children, value}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  console.log("useAuthValue called");
  console.log("argument:");
  console.log(AuthContext);
  const return_value = useContext(AuthContext);
  console.log("returning:");
  console.log(return_value);
  return return_value;
  //return useContext(AuthContext)
}


