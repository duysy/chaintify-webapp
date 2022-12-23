import React from "react";
import { useState, useEffect } from "react";
import config from "../../config";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export function useSendNFT() {
  const [dataMint, setData] = useState<any>();
  const [enabled, setEnabled] = useState<boolean>(false);
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
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "safeTransferFrom",
    args: [dataMint?.from, dataMint?.to, dataMint?.id, dataMint?.amount, "0x"],
    enabled: enabled,
  });
  const { data, error, isError, write } = useContractWrite(configWrite);

  const { isLoading, isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  const send = (from: string, to: string, id: number, amount: number) => {
    setData({ from, to, id, amount });
    setEnabled(true);
  };

  useEffect(() => {
    if (write && isPrepareSuccess) write();
  }, [isPrepareSuccess]);
  return { write, send, setEnabled, data, prepareError, isPrepareError, error, isError, isLoading, isSuccess, status };
}
