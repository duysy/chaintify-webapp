import React ,{useState} from "react";
import Collection from "../../../views/Nft/Collection";
import { useRouter } from "next/router";
export default function MintPage() {
  const router = useRouter();
  return <Collection />;
}
