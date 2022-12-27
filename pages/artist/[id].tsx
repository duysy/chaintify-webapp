import React from "react";
import ArtistView from "../../views/Artist";
import { useRouter } from "next/router";
export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;
  return <ArtistView id={id} />;
}
