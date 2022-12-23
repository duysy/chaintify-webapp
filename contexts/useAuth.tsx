import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { create as postSignature } from "../apis/private/auth/signature/post_signature";

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
  const login = async (signature: string) => {
    const { token } = await postSignature({ signature: signature });
    localStorage.setItem("Authorization", `Token ${token}`);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    setIsLogin(false);
  };
  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      setIsLogin(true);
    }
  }, []);
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
