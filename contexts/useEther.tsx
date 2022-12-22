import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuth } from "./useAuth";
import { useProvider, useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import { useSigner } from "wagmi";

export type EtherContextValue = {};
export const Ether = createContext<EtherContextValue>({} as EtherContextValue);

type Props = {
  children: ReactChild;
};

const EtherContextProvider = ({ children }: Props) => {
  // const provider = useProvider();
  const { login, logout } = useAuth();
  const { data: signer } = useSigner();
  const [provider, setProvider] = useState<any>();
  const { connector: activeConnector, isConnected, isDisconnected } = useAccount();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      login(data);
    },
  });
  useEffect(() => {
    if (!signer) return;
    const provider_ = new ethers.providers.Web3Provider((signer?.provider as any).provider);
    console.log(provider_);
    setProvider(provider_);
  }, [signer, isConnected]);

  useEffect(() => {
    const initConnect = async () => {
      if (!isConnected) return;
      await signMessage({ message: "hello" });
    };
    initConnect();
  }, [isConnected]);

  useEffect(() => {
    const initDisConnect = async () => {
      await logout();
    };
    initDisConnect();
  }, [isDisconnected]);
  return <Ether.Provider value={{}}>{children}</Ether.Provider>;
};

export default EtherContextProvider;
export const useEther = () => useContext(Ether);
