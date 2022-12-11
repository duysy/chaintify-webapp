import React, { useState, useEffect } from "react";
import DetailNFT from "../../../views/Nft/DetailNFT";
import { useRouter } from "next/router";
export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  return <DetailNFT id={id} />;
}
