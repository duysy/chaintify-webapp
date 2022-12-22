import React from "react";
import { useState } from "react";
import config from "../../config";
import { ethers } from "ethers";
import { useEther } from "../../contexts/useEther";
type TStatus = "WAITING" | "PENDING" | "SUCCESS" | "ERROR";
export function useSendNFT() {
  const { provider } = useEther();
  const [status, setStatus] = useState<TStatus>("WAITING");
  const send = async (from: string, to: string, id: number, amount: number) => {
    const signer = provider.getSigner();
    const address = config.CHAINTIFY_CONTRACT;
    const abi = ["function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)"];
    try {
      const contract = new ethers.Contract(address, abi, signer);
      const tx = await contract.functions.safeTransferFrom(from, to, id, amount, "0x");
      setStatus("PENDING");
      const receipt = await tx.wait();
      setStatus("SUCCESS");
      alert("SUCCESS");
    } catch (error) {
      setStatus("ERROR");
      console.log(error);
    }
  };
  return { send, status };
}
