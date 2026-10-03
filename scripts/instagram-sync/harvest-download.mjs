#!/usr/bin/env node
// Downloads media listed in harvest.json (produced by the browser harvest)
// into ./downloads and writes manifest.json for the R2 upload step.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const harvest = JSON.parse(readFileSync(resolve(import.meta.dirname, "harvest.json"), "utf8"));
const outDir = resolve(import.meta.dirname, "downloads");
mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// "21 likes, 2 comments - theadirerenova on December 29, 2025: \"caption\". "
function parseDescription(desc) {
  const m = desc?.match(/^[^"]*"([\s\S]*)"\.?\s*$/);
  let caption = m ? m[1] : (desc ?? null);
  const dateMatch = desc?.match(/on (\w+ \d{1,2}, \d{4})/);
  const postedAt = dateMatch ? new Date(dateMatch[1]).toISOString() : null;
  return { caption, postedAt };
}

const manifest = [];
for (const post of harvest) {
  const igId = post.path.split("/").filter(Boolean).pop();
  const { caption, postedAt } = parseDescription(post.desc);
  const url = post.vid ?? post.img;
  if (!url) continue;
  const ext = post.vid ? ".mp4" : ".jpg";
  const file = `${igId}${ext}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Referer: "https://www.instagram.com/",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    console.error(`SKIP ${igId}: HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(resolve(outDir, file), buf);
  manifest.push({
    igId,
    mediaType: post.vid ? "video" : "image",
    file,
    caption,
    postedAt,
    permalink: `https://www.instagram.com${post.path}`,
  });
  console.log(`OK ${file} (${Math.round(buf.length / 1024)} KB)`);
}

manifest.sort((a, b) => (b.postedAt ?? "").localeCompare(a.postedAt ?? ""));
writeFileSync(resolve(import.meta.dirname, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone: ${manifest.length} posts in manifest.json`);
