import React from "react";
import Artist from "../../views/Artist";
import { useRouter } from "next/router";
export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;
  return <Artist id={+id} />;
}
