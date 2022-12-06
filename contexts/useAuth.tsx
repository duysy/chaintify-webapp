import { createContext, ReactChild, useContext, useState, useEffect } from "react";

export type AuthContextValue = { isLogin: boolean; setIsLogin: any; getTokenAuth: any; login: any; logout: any };
export const Auth = createContext<AuthContextValue>({} as AuthContextValue);
type TProps = {
  children: ReactChild;
};

const AuthContextProvider = ({ children }: TProps) => {
  const [isLogin, setIsLogin] = useState(false);

  const getTokenAuth = () => {
    const authorization = localStorage.getItem("Authorization");
    if (authorization) return authorization;
  };
  const login = () => {
    localStorage.setItem("Authorization", "Token 4cc01dc916871676ea03b040b0145b620e937a72");
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  // useEffect(() => {
  //   const authorization = localStorage.getItem("Authorization");
  //   if (authorization) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);
  return (
    <Auth.Provider
      value={{
        isLogin,
        setIsLogin,
        getTokenAuth,
        login,
        logout,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthContextProvider;
export const useAuth = () => useContext(Auth);
