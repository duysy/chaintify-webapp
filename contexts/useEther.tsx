import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuth } from "./useAuth";
export type EtherContextValue = {
  onClickConnect: any;
  currentAccount: string | undefined;
  onClickDisconnect: any;
};
export const Ether = createContext<EtherContextValue>({} as EtherContextValue);

type Props = {
  children: ReactChild;
};

const EtherContextProvider = ({ children }: Props) => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainName, setChainName] = useState<string | undefined>();
  const [provider, setProvider] = useState<any>();
  const [isConnect, setIsConnect] = useState<any>();
  const { setIsLogin, login, logout } = useAuth();

  useEffect(() => {
    if (!provider) return;
    provider
      .send("eth_requestAccounts", [])
      .then((accounts: any) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e: any) => console.log(e));
  }, [provider]);

  useEffect(() => {
    if (!provider) return;
    if (!currentAccount) return;
    provider.getBalance(currentAccount).then((result: any) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result: any) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
    console.log(chainName, chainId, balance);
  }, [provider]);

  useEffect(() => {
    const check = async () => {
      if (!provider) return;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x7A69" }],
        });
      } catch (e: any) {
        if (e.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x61",
                  chainName: "Smart Chain - Testnet",
                  nativeCurrency: {
                    name: "Binance",
                    symbol: "BNB", // 2-6 characters long
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        // console.error(e)
      }
    };
    check();
  }, [provider, chainId]);

  useEffect(() => {
    if (!provider) return;
    login();
    setIsConnect(true);
  }, [provider]);

  useEffect(() => {
    onClickConnect();
  }, []);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      window.location.href = "https://metamask.io/";
      return;
    }
    const provider_ = new ethers.providers.Web3Provider(window?.ethereum);
    setProvider(provider_);
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
    logout();
    setIsConnect(true);
  };

  return (
    <Ether.Provider
      value={{
        onClickConnect,
        currentAccount,
        onClickDisconnect,
      }}
    >
      {children}
    </Ether.Provider>
  );
};

export default EtherContextProvider;
export const useEther = () => useContext(Ether);
