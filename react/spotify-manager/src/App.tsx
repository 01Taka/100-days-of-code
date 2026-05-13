import { useEffect, useState } from "react";
import "./App.css";
import {
  checkIsIncludedItem,
  fetchMyPlaylists,
  fetchPlaylistItemsManually,
  searchAndAddItemsToPlaylist,
} from "./api/playlist-utils";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const call = async () => {
      const playlists = await fetchMyPlaylists();
      if (playlists && playlists.length > 0) {
        const targetPlaylist = playlists[0];

        const items = await fetchPlaylistItemsManually(targetPlaylist.id);
        if (items) {
          console.log(checkIsIncludedItem("17rhDgnYYryQU4uS71ZxFu", items));
        }

        searchAndAddItemsToPlaylist(targetPlaylist.id, "光の中", "結束バンド");
      }
    };
    call();
  }, []);

  return <div>HOME</div>;
}

export default App;
