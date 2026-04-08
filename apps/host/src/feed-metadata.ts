/** Allowed `metadata.surfaceRef` on feed POST: opaque USXD / layout handle (no path traversal). */
const SURFACE_REF_RE = /^[a-zA-Z0-9][a-zA-Z0-9._/-]{0,255}$/;

/**
 * Extracts whitelisted feed metadata from JSON body. Invalid shapes are ignored.
 */
export function pickFeedMetadata(body: unknown): Record<string, unknown> | undefined {
  if (typeof body !== "object" || body === null || !("metadata" in body)) {
    return undefined;
  }
  const m = (body as { metadata: unknown }).metadata;
  if (typeof m !== "object" || m === null) return undefined;
  const surfaceRef = (m as { surfaceRef?: unknown }).surfaceRef;
  if (typeof surfaceRef !== "string") return undefined;
  const s = surfaceRef.trim();
  if (!s || !SURFACE_REF_RE.test(s)) return undefined;
  return { surfaceRef: s };
}
