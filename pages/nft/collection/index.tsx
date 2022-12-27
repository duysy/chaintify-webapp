import React ,{useState} from "react";
import CollectionView from "../../../views/Nft/Collection";
import { useRouter } from "next/router";
export default function MintPage() {
  const router = useRouter();
  return <CollectionView />;
}
