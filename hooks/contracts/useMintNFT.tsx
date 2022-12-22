import React from "react";
import { useState, useEffect } from "react";
import config from "../../config";
import { ethers } from "ethers";
import { useEther } from "../../contexts/useEther";
type TStatus = "WAITING" | "PENDING" | "SUCCESS" | "ERROR";
export function useMintNFT() {
  const { provider } = useEther();
  const [status, setStatus] = useState<TStatus>("WAITING");
  const mint = async (to: string, id: number, amount: number, maxSupply: number, uri: string) => {
    const address = config.CHAINTIFY_CONTRACT;
    const abi = ["function mint(address to_, uint256 id_, uint256 amount_, uint256 maxSupply_, string uri_, bytes data_)"];
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);
      const tx = await contract.functions.mint(to, id, amount, maxSupply, uri, "0x");
      setStatus("PENDING");
      const receipt = await tx.wait();
      setStatus("SUCCESS");
    } catch (error: any) {
      setStatus("ERROR");
      console.log({ error });
    }
  };
  return { mint, status };
}
