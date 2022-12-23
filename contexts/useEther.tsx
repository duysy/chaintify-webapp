import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
export type EtherContextValue = {};
export const Ether = createContext<EtherContextValue>({} as EtherContextValue);

type Props = {
  children: ReactChild;
};

const EtherContextProvider = ({ children }: Props) => {
  const { login, logout } = useAuth();
  const { isConnected, isDisconnected, address } = useAccount();
  const { data: dataSign, error, isLoading, signMessage, isSuccess: isSuccessSign } = useSignMessage({});

  useEffect(() => {
    const initConnect = async () => {
      if (!isConnected) return;
      signMessage({ message: "hello" });
    };
    initConnect();
  }, [isConnected, address]);

  useEffect(() => {
    if (!dataSign) return;
    if (isConnected) login(dataSign);
  }, [isSuccessSign]);

  useEffect(() => {
    if (isDisconnected) logout();
  }, [isDisconnected]);
  return <Ether.Provider value={{}}>{children}</Ether.Provider>;
};

export default EtherContextProvider;
export const useEther = () => useContext(Ether);
