import React ,{useState} from "react";
import Mint from "../../../views/Nft/Mint";
import { useRouter } from "next/router";
export default function MintPage() {
  const router = useRouter();
  const { id } = router.query;
  return <Mint id={id} />;
}
