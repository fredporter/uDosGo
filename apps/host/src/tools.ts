import fs from "node:fs";
import path from "node:path";
import type { FeedItem, Task } from "./storage.js";

export type ToolContext = {
  dataRoot: string;
  feed: FeedItem;
  task: Task;
  vaultRelPath: string;
};

function vaultAbs(dataRoot: string, rel: string): string {
  return path.join(dataRoot, "vault", rel);
}

/**
 * Deterministic stub tools: write and append markdown under the vault.
 */
export function runTool(ctx: ToolContext): { outputRefs: string[] } {
  const { dataRoot, feed, task } = ctx;
  const rel = ctx.vaultRelPath;
  const abs = vaultAbs(dataRoot, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  switch (task.toolId) {
    case "vault.write_note": {
      const body = [
        `# Gold-path note`,
        ``,
        `**Feed:** ${feed.id}`,
        ``,
        feed.raw.trim(),
        ``,
      ].join("\n");
      fs.writeFileSync(abs, body, "utf8");
      return { outputRefs: [`vault/${rel}`] };
    }
    case "vault.append_summary": {
      const prior = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
      const snippet = feed.raw.trim().slice(0, 320);
      const block = [
        prior,
        ``,
        `## Summary`,
        ``,
        snippet.length < feed.raw.trim().length
          ? `${snippet}…`
          : snippet,
        ``,
      ].join("\n");
      fs.writeFileSync(abs, block, "utf8");
      return { outputRefs: [`vault/${rel}`] };
    }
    case "vault.append_task_bullets": {
      const prior = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
      const topic = feed.raw.trim().slice(0, 80);
      const topicEllipsis = feed.raw.trim().length > 80 ? "…" : "";
      const block = [
        prior,
        ``,
        `## Extracted tasks (3)`,
        ``,
        `- [ ] Research and gather sources on: _${topic}${topicEllipsis}_`,
        `- [ ] Write or update the markdown note under vault with conclusions`,
        `- [ ] Extract and track follow-up actions in ThinUI / Host`,
        ``,
      ].join("\n");
      fs.writeFileSync(abs, block, "utf8");
      return { outputRefs: [`vault/${rel}`] };
    }
    case "review.signoff": {
      const prior = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
      if (prior.includes("\n## Reviewer\n")) {
        return { outputRefs: [`vault/${rel}`] };
      }
      const block = [
        prior,
        ``,
        `## Reviewer`,
        ``,
        `**Status:** pass`,
        ``,
        `Stub reviewer: output meets demo bar for v3.0.1 gold path.`,
        ``,
      ].join("\n");
      fs.writeFileSync(abs, block, "utf8");
      return { outputRefs: [`vault/${rel}`] };
    }
    default:
      throw new Error(`unknown_tool:${task.toolId}`);
  }
}

export function defaultVaultRelPath(feedId: string): string {
  return `gold-${feedId}.md`;
}
