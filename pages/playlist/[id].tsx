import React from "react";
import PlayList from "../../views/Playlist";
import { useRouter } from "next/router";
export default function PlayListPage() {
  const router = useRouter();
  const { id } = router.query;
  return <PlayList id={id} />;
}
