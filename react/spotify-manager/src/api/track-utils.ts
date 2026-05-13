import type { Track, MaxInt } from "@spotify/web-api-ts-sdk";
import { sdk } from "./auth";

function normalizeString(text: string): string {
  return (
    text
      // 1. Remove all full-width and half-width spaces
      .replace(/[\s\u3000]/g, "")
      // 2. Convert alphabet to lowercase
      .toLowerCase()
      // 3. Convert full-width numbers to half-width
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      // 4. Convert Katakana to Hiragana
      .replace(/[\u30A1-\u30F6]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0x60),
      )
  );
}

const checkMatchArtistName = (
  track: Track,
  name: string,
  requirePerfectMatch: boolean,
) => {
  const names = track?.artists.map((artist) => artist.name) ?? [];
  if (requirePerfectMatch) {
    return names.includes(name);
  } else {
    const normalizedName = normalizeString(name);
    const normalizedNames = names.map((name) => normalizeString(name));
    return normalizedNames.some((name) => name.includes(normalizedName));
  }
};

export async function searchTrack(query: string) {
  // "track" タイプで検索。結果を10件取得
  const results = await sdk.search(query, ["track"], undefined, 10);

  console.log("Search Results:", results.tracks.items);
  return results.tracks.items; // 楽曲の配列が返る
}

export async function findFirstTrack(
  query: string,
  artistFilter?: string,
  searchLimit: MaxInt<50> = 10,
) {
  // "track" タイプで検索。結果を10件取得
  const results = await sdk.search(query, ["track"], undefined, searchLimit);
  const tracks = results.tracks.items;
  return tracks.find((track) => {
    return !artistFilter || checkMatchArtistName(track, artistFilter, false);
  });
}
