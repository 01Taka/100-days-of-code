import type {
  Page,
  PlaylistedTrack,
  SimplifiedPlaylist,
  Track,
  TrackReference,
} from "@spotify/web-api-ts-sdk";
import { sdk } from "./auth";
import { findFirstTrack } from "./track-utils";

// 2. Spotify APIのURLを構築
const getPlaylistItemsUrl = (playlistId: string) =>
  `https://api.spotify.com/v1/playlists/${playlistId}/items`;

const onFailed = async (response: Response, message: string) => {
  // エラー時の詳細をログに出力
  const errorData = await response.json();
  console.error(message, JSON.stringify(errorData, null, 2));
  throw new Error(`HTTP error! status: ${response.status}`);
};

export const fetchMyPlaylists = async () => {
  try {
    // 2. 認証実行 (ログインが必要な場合はSpotifyへリダイレクト)
    // 認証済みの場合はそのまま進む
    const { authenticated } = await sdk.authenticate();

    if (authenticated) {
      // 3. 自分のプレイリストを取得
      const playlists = await sdk.currentUser.playlists.playlists();
      return playlists.items;
    }
  } catch (error) {
    console.error("Spotify API Error:", error);
  }
};

type Playlist = Omit<SimplifiedPlaylist, "tracks"> & {
  items: TrackReference | null;
};

type Item = Omit<PlaylistedTrack<Track>, "track"> & { item: Track };

export const checkIsIncludedItem = (
  itemId: string,
  items: Page<PlaylistedTrack<Track>>,
) => {
  const ids = items.items.map((item) => (item as unknown as Item).item.id);
  return ids.includes(itemId);
};

export const filterDuplicatesItemUrl = (
  uris: string[],
  items: Page<PlaylistedTrack<Track>>,
) => {
  const itemUris = items.items.map(
    (item) => (item as unknown as Item).item.uri,
  );
  return uris.filter((uri) => !itemUris.includes(uri));
};

export const fetchPlaylistItemsManually = async (playlistId: string) => {
  // 1. SDKから現在のアクセストークンを取得
  const tokenResponse = await sdk.getAccessToken();
  if (!tokenResponse) {
    console.error("アクセストークンが取得できません。ログインしてください。");
    return;
  }

  try {
    const response = await fetch(getPlaylistItemsUrl(playlistId), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await onFailed(response, "Manual Fetch 403/Error Body:");
    }

    const data: Page<PlaylistedTrack<Track>> = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

/**
 * SDKのトークンを利用して、手動でプレイリストにアイテムを追加する
 * @param playlistId プレイリストのID
 * @param uris 追加したいトラックのURI配列 (例: ["spotify:track:xxx", "..."])
 */
export const addItemsToPlaylistManually = async (
  playlistId: string,
  uris: string[],
  isRemoveDuplicates: boolean = true,
) => {
  // 1. SDKから現在のアクセストークンを取得
  const tokenResponse = await sdk.getAccessToken();
  if (!tokenResponse) {
    console.error("アクセストークンが取得できません。ログインしてください。");
    return null;
  }

  if (isRemoveDuplicates) {
    const items = await fetchPlaylistItemsManually(playlistId);
    if (items) {
      uris = filterDuplicatesItemUrl(uris, items);
    }
  }

  if (uris.length === 0) {
    console.error("追加できるトラックがありません");
    return null;
  }

  try {
    const response = await fetch(getPlaylistItemsUrl(playlistId), {
      method: "POST", // 追加は POST メソッド
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
        "Content-Type": "application/json",
      },
      // ボディにURIのリストを含める
      body: JSON.stringify({
        uris: uris,
        // 必要に応じて position: 0 などを追加可能
      }),
    });

    if (!response.ok) {
      await onFailed(response, "Manual Add 403/Error Body:");
    }

    const data = await response.json();
    console.log("Manual Add Success (Snapshot ID):", data.snapshot_id);
    return data;
  } catch (error) {
    console.error("Add items error:", error);
  }
};

export async function searchAndAddItemsToPlaylist(
  playlistId: string,
  trackName: string,
  artistName: string,
) {
  // 1. 検索
  const track = await findFirstTrack(`${trackName} ${artistName}`);

  if (track) {
    // 2. 追加
    const data = await addItemsToPlaylistManually(playlistId, [track.uri]);

    if (data) {
      console.log(
        `Found: ${track.name} by ${track.artists[0].name}, ${track.uri}`,
      );

      return data;
    }
  } else {
    console.log("曲が見つかりませんでした。");
  }
}
