import React from "react";
import { useState, useEffect } from "react";
import config from "../../config";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export function useMintNFT() {
  const [dataMint, setData] = useState<any>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isOpenWallet, setIsOpenWallet] = useState<boolean>(false);
  const {
    config: configWrite,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: isPrepareSuccess,
  } = usePrepareContractWrite({
    address: config.CHAINTIFY_CONTRACT,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to_",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id_",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount_",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxSupply_",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri_",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "data_",
            type: "bytes",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "mint",
    args: [dataMint?.to, dataMint?.id, dataMint?.amount, dataMint?.maxSupply, dataMint?.uri, "0x"],
    enabled: enabled,
  });
  const { data, error, isError, write } = useContractWrite(configWrite);

  const { isLoading, isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  const mint = (to: string, id: number, amount: number, maxSupply: number, uri: string) => {
    setIsOpenWallet(true);
    setData({ to: to, id: id, amount: amount, maxSupply: maxSupply, uri: uri });
    setEnabled(true);
  };
  useEffect(() => {
    if (write && isPrepareSuccess) write();
  }, [isPrepareSuccess]);

  useEffect(() => {
    if (isLoading) setIsOpenWallet(false);
  }, [isLoading]);
  return { write, mint, setEnabled, data, prepareError, isPrepareError, error, isError, isLoading, isSuccess, status, isOpenWallet };
}
