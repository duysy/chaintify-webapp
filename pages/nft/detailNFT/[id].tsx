import React, { useState, useEffect } from "react";
import DetailNFTView from "../../../views/Nft/DetailNFT";
import { useRouter } from "next/router";
export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  return <DetailNFTView id={id} />;
}
