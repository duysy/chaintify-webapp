import React, { useState } from "react";
import AlbumView from "../../../views/Album/private";
import { useRouter } from "next/router";
export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  return <AlbumView id={id} />;
}
