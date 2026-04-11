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
  const meta = m as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  const surfaceRef = meta.surfaceRef;
  if (typeof surfaceRef === "string") {
    const s = surfaceRef.trim();
    if (s && SURFACE_REF_RE.test(s)) out.surfaceRef = s;
  }

  const ra = meta.retroAlias;
  if (typeof ra === "object" && ra !== null) {
    const o = ra as Record<string, unknown>;
    if (
      typeof o.canonical === "string" &&
      typeof o.original === "string" &&
      typeof o.modern === "string"
    ) {
      out.retroAlias = {
        canonical: o.canonical,
        original: o.original,
        modern: o.modern,
      };
    }
  }

  return Object.keys(out).length > 0 ? out : undefined;
}
