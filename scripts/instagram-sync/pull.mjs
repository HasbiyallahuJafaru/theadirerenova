#!/usr/bin/env node
// Pulls all posts (images + videos + captions) from TAR's Instagram handle
// using yt-dlp, into ./downloads with a sidecar .info.json per post.
//
// Usage:
//   node pull.mjs <handle> [--cookies cookies.txt] [--cookies-from-browser chrome|edge|firefox] [--limit 30]
//
// Instagram blocks anonymous scraping of profiles; you need to be logged in.
// On Windows, Chrome/Edge cookie decryption is blocked by app-bound encryption,
// so the reliable route is exporting a cookies.txt file (Netscape format) from
// a browser where you are logged into instagram.com, then passing --cookies.

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const handle = (args.find((a) => !a.startsWith("--")) ?? "").replace(/^@/, "");
if (!handle) {
  console.error("Usage: node pull.mjs <handle> [--cookies-from-browser <browser>] [--limit <n>]");
  process.exit(1);
}

const cookieFlag = args.includes("--cookies-from-browser")
  ? ["--cookies-from-browser", args[args.indexOf("--cookies-from-browser") + 1]]
  : args.includes("--cookies")
    ? ["--cookies", resolve(args[args.indexOf("--cookies") + 1])]
    : [];
const limit = args.includes("--limit") ? Number(args[args.indexOf("--limit") + 1]) : 30;

const outDir = resolve(import.meta.dirname, "downloads");
mkdirSync(outDir, { recursive: true });

console.log(`Pulling up to ${limit} posts from @${handle} ...`);
execFileSync(
  "yt-dlp",
  [
    `https://www.instagram.com/${handle}/`,
    "--write-info-json",
    "--no-write-playlist-metafiles",
    "--download-archive", resolve(import.meta.dirname, "archive.txt"),
    "--playlist-items", `1:${limit}`,
    ...cookieFlag,
    "-o", resolve(outDir, "%(upload_date)s-%(id)s.%(ext)s"),
  ],
  { stdio: "inherit" },
);

// Build a manifest from the sidecar info JSON files.
const manifest = [];
for (const file of readdirSync(outDir)) {
  if (!file.endsWith(".info.json")) continue;
  const info = JSON.parse(readFileSync(resolve(outDir, file), "utf8"));
  manifest.push({
    igId: String(info.id),
    mediaType: info.ext === "mp4" || info.duration ? "video" : "image",
    file,
    title: info.title ?? null,
    description: info.description ?? null,
    postedAt: info.timestamp ? new Date(info.timestamp * 1000).toISOString() : null,
    permalink: info.webpage_url ?? null,
  });
}
manifest.sort((a, b) => (b.postedAt ?? "").localeCompare(a.postedAt ?? ""));
writeFileSync(resolve(import.meta.dirname, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Done: ${manifest.length} posts recorded in manifest.json`);
