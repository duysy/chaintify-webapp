import React from "react";
import PlayListView from "../../views/Playlist";
import { useRouter } from "next/router";
export default function PlayListPage() {
  const router = useRouter();
  const { id } = router.query;
  return <PlayListView id={id} />;
}
