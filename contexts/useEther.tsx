import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useSignMessage } from "wagmi";
import { get as getNone } from "../apis/private/auth/none/get_none";

export type EtherContextValue = {};
export const Ether = createContext<EtherContextValue>({} as EtherContextValue);

type Props = {
  children: ReactChild;
};

const EtherContextProvider = ({ children }: Props) => {
  const { login, logout } = useAuth();
  const { isConnected, isDisconnected, address } = useAccount();
  const { data: dataSign, error, isLoading, signMessage, isSuccess: isSuccessSign } = useSignMessage({});
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [none, setNone] = useState();

  useEffect(() => {
    const initConnect = async () => {
      if (!isConnected) return;
      if (!address) return;
      const { none } = await getNone({ address: address });
      setNone(none);
      await signMessage({ message: none });
    };
    initConnect();
  }, [isConnected, address]);

  useEffect(() => {
    if (!dataSign) return;
    if (isConnected) login(dataSign, none);
  }, [isSuccessSign]);

  useEffect(() => {
    if (isDisconnected) logout();
  }, [isDisconnected]);

  useEffect(() => {
    if (!chain) return;
    if (chain.id != 80001) {
      switchNetwork?.(80001);
    }
  }, [isConnected]);
  return <Ether.Provider value={{}}>{children}</Ether.Provider>;
};

export default EtherContextProvider;
export const useEther = () => useContext(Ether);
