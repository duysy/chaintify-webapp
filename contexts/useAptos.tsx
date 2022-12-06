import React, { createContext, ReactChild, useContext, useState, useEffect } from "react";
import { AptosClient, AptosAccount, FaucetClient, TokenClient } from "aptos";

export type AptosContextValue = {
  onClickConnect: any;
  onClickSign: any;
  onClickCreateToken: any;
  onClickCreateCollection: any;
  onClickTokenCollection: any;
  onClickTokenInfo: any;
};
export const Aptos = createContext<AptosContextValue>({} as AptosContextValue);

type Props = {
  children: ReactChild;
};

const AptosContextProvider = ({ children }: Props) => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainName, setChainName] = useState<string | undefined>();

  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
  const tokenClient = new TokenClient(client);

  const getProvider = () => {
    if ("martian" in window) {
      return window.martian;
    }
    window.open("https://www.martianwallet.xyz/", "_blank");
  };

  useEffect(() => {
    const initWallet = async () => {
      const provide = getProvider();
      await provide.connect();
      const account = await provide.account();
      setCurrentAccount(account);
    };
    if ("martian" in window) {
      initWallet();
      return;
    }
    window.open("https://www.martianwallet.xyz/", "_blank");
  }, []);

  const collectionName = "duyduysysy";

  const onClickConnect = async () => {
    const provide = getProvider();
    await provide.connect();
    const account = await provide.account();
    setCurrentAccount(account);
  };
  const onClickSign = async () => {
    const provide = getProvider();
    const metadata = {
      address: true,
      application: true,
      chainId: true,
      message: "This is a sample message",
      nonce: 12345,
    };
    const signature = await provide.signMessage(metadata);
    console.log(signature);
  };
  const onClickCreateCollection = async () => {
    const provide = getProvider();
    const txnHash = await provide.createCollection(collectionName, "CollectionDescription", "https://aptos.dev");
    console.log(txnHash);
  };

  const onClickCreateToken = async () => {
    const provide = getProvider();
    const txnHash = await provide.createToken(collectionName, "Con mua ngang qua", "TokenDescription", 100, "https://aptos.dev/img/nyan.jpeg", 10000);
    console.log(txnHash);
  };
  const onClickMintToken = async () => {
    const provide = getProvider();
    const txnHash = await tokenClient.createToken(collectionName, "Con mua ngang qua", "TokenDescription", 100, "https://aptos.dev/img/nyan.jpeg", 10000);
    console.log(txnHash);
  };

  const onClickTokenCollection = async () => {
    const collectionData = await tokenClient.getCollectionData(currentAccount.address, collectionName);
    console.log(collectionData);
  };
  const onClickTokenInfo = async () => {
    const tokenData = await tokenClient.getTokenData(currentAccount.address, collectionName, "TokenName");
    console.log(tokenData);
  };

  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);
  return (
    <Aptos.Provider
      value={{
        onClickConnect,
        onClickSign,
        onClickCreateToken,
        onClickCreateCollection,
        onClickTokenCollection,
        onClickTokenInfo,
      }}
    >
      {children}
    </Aptos.Provider>
  );
};

export default AptosContextProvider;
export const useAptos = () => useContext(Aptos);
