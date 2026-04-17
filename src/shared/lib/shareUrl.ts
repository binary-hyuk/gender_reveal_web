/**
 * 입력값을 URL 쿼리(`?s=...`)로 인코딩/디코딩.
 * JSON → UTF-8 → base64url. 브라우저 환경에서만 동작.
 */

function toBase64Url(s: string): string {
  // btoa는 Latin-1만 지원하므로 UTF-8 안전하게 변환
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const base64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function encodeShareState(state: unknown): string {
  return toBase64Url(JSON.stringify(state));
}

export function decodeShareState<T>(encoded: string): T | null {
  try {
    return JSON.parse(fromBase64Url(encoded)) as T;
  } catch {
    return null;
  }
}

/**
 * 현재 페이지 URL 에 `?s=<encoded>` 쿼리를 붙여 반환.
 */
export function buildShareUrl(state: unknown): string {
  if (typeof window === "undefined") return "";
  const encoded = encodeShareState(state);
  const url = new URL(window.location.href);
  url.searchParams.set("s", encoded);
  return url.toString();
}

/**
 * 현재 window.location 에서 `?s=...` 쿼리를 읽어 디코딩.
 */
export function readShareStateFromUrl<T>(): T | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const s = params.get("s");
  if (!s) return null;
  return decodeShareState<T>(s);
}
