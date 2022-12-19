import { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuth } from "./useAuth";

export type EtherContextValue = {
  onClickConnect: any;
  address: string | undefined;
  onClickDisconnect: any;
  provider: any;
  balance: any;
};
export const Ether = createContext<EtherContextValue>({} as EtherContextValue);

type Props = {
  children: ReactChild;
};

const EtherContextProvider = ({ children }: Props) => {
  const [balance, setBalance] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainName, setChainName] = useState<string | undefined>();
  const [provider, setProvider] = useState<any>();
  const [isConnect, setIsConnect] = useState<any>();
  const { login, logout } = useAuth();

  useEffect(() => {
    if (!provider) return;
    provider
      .send("eth_requestAccounts", [])
      .then((accounts: any) => {
        if (accounts.length > 0) setAddress(accounts[0]);
      })
      .catch((e: any) => console.log(e));
  }, [provider]);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", function (accounts: any) {
      if (accounts.length > 0) setAddress(accounts[0]);
    });
  }, []);

  useEffect(() => {
    if (!provider) return;
    if (!address) return;
    provider.getBalance(address).then((result: any) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result: any) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
    // console.log(chainName, chainId, balance);
  }, [provider, address]);

  useEffect(() => {
    const check = async () => {
      if (!provider) return;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (e: any) {
        if (e.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai",
                  nativeCurrency: {
                    name: "Polygon",
                    symbol: "MATIC", // 2-6 characters long
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
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
    onClickConnect();
  }, []);

  const onClickConnect = async () => {
    //client side code
    if (!window.ethereum) {
      // console.log("please install MetaMask");
      let value = confirm("Bạn chưa cài metamask, cài metamask");
      if (value) window.location.href = "https://metamask.io/";

      return;
    }
    const provider_ = new ethers.providers.Web3Provider(window?.ethereum);
    setProvider(provider_);
    setIsConnect(true);
    const flatSig = await signMessage();
    // console.log(flatSig);
    if (!flatSig) return;
    login(flatSig);
  };
  const signMessage = async () => {
    if (!provider) return;
    const signer = provider.getSigner();
    let flatSig = await signer.signMessage("hello");
    return flatSig;
  };
  const onClickDisconnect = () => {
    // console.log("onClickDisConnect");
    setBalance(undefined);
    setAddress(undefined);
    setIsConnect(true);
    logout();
  };

  return (
    <Ether.Provider
      value={{
        onClickConnect,
        address,
        onClickDisconnect,
        provider,
        balance,
      }}
    >
      {children}
    </Ether.Provider>
  );
};

export default EtherContextProvider;
export const useEther = () => useContext(Ether);
