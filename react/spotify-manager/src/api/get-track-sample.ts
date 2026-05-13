// import type { MaxInt, Track } from "@spotify/web-api-ts-sdk";
// import { sdk } from "./auth";

// export const fetchMyPlaylistTracks = async (playlistId: string) => {
//   try {
//     const { authenticated } = await sdk.authenticate();

//     if (authenticated) {
//       // const tracks = await sdk.playlists.getPlaylist(playlistId);
//       const tracks = await sdk.playlists.getPlaylistItems(playlistId);
//       return tracks;
//     }
//   } catch (error) {
//     console.error("Spotify API Error:", error);
//   }
// };
