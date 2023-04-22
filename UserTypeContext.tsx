import React, { createContext, useState} from 'react';
import { useAuthValue } from './AuthContext'; // Import auth from AuthContext

interface UserTypeContextType {
    userType: string | null;
  }
  
  const UserTypeContext = createContext<UserTypeContextType>({
    userType: null,
  });
  
  interface UserTypeProviderProps {
    children: React.ReactNode;
    initialUserType: string | null;
  }
  
  export const UserTypeProvider: React.FC<UserTypeProviderProps> = ({ children, initialUserType }) => {
    const [userType, _] = useState<string | null>(initialUserType);
  
    return (
      <UserTypeContext.Provider value={{ userType }}>
        {children}
      </UserTypeContext.Provider>
    );
  };
  
  export const useUserType = () => {
    return React.useContext(UserTypeContext);
  };