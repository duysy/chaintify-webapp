import React ,{useState} from "react";
import Album from "../../../views/Nft/Album";
import { useRouter } from "next/router";
export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  return <Album id={id} />;
}
