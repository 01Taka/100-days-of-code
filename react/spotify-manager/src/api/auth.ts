import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI; // Dashboardの設定と一致させる
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
  "user-read-email",
];

const allScopes = [
  // Playlists
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  // Users
  "user-read-private",
  "user-read-email",
  // Library (お気に入り)
  "user-library-read",
  "user-library-modify",
  // Listening History (再生履歴)
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  // Spotify Connect (デバイス操作)
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  // Follow
  "user-follow-read",
  "user-follow-modify",
  // Images / Playback (特殊権限)
  "ugc-image-upload",
  "streaming", // Web Playback SDK用
  "app-remote-control", // モバイルSDK等用
];

// 1. SDKの初期化
// 権限(scopes)を指定。自動的にLocalStorageにトークンを保存・管理してくれる
export const sdk = SpotifyApi.withUserAuthorization(
  clientId,
  redirectUri,
  allScopes,
);
