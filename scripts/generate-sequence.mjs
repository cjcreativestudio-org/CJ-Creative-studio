#!/usr/bin/env node
/**
 * generate-sequence.mjs
 *
 * Generates a cinematic studio video via the muapi.ai API (using the
 * open-generative-ai local studio package's Seedance model) then extracts
 * 150 frames with FFmpeg into public/assets/sequence/.
 *
 * Usage:
 *   node scripts/generate-sequence.mjs <YOUR_MUAPI_API_KEY>
 *   -- or --
 *   MUAPI_API_KEY=xxx node scripts/generate-sequence.mjs
 *
 * Your muapi API key is visible in the open-generative-ai studio UI
 * (it's stored in your browser's localStorage under 'muapi_api_key').
 */

import { execSync, spawnSync } from "node:child_process";
import { createWriteStream, mkdirSync, existsSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SEQUENCE_DIR = path.join(PROJECT_ROOT, "public", "assets", "sequence");
const TMP_VIDEO = path.join(PROJECT_ROOT, ".tmp-cinematic.mp4");

const API_KEY = process.argv[2] || process.env.MUAPI_API_KEY;
const BASE_URL = "https://api.muapi.ai";

const PROMPT =
  "A photorealistic, cinematic 3D tracking shot of a high-end minimalist creative studio workspace. " +
  "Moody dramatic lighting, dark aesthetic, warm accent light on a desk. " +
  "Slow push-in camera movement, ultra detailed, 4K quality.";

// ── helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(`\n[sequence] ${msg}\n`);
}

async function apiFetch(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function poll(requestId, maxAttempts = 180, intervalMs = 5000) {
  const url = `${BASE_URL}/api/v1/predictions/${requestId}/result`;
  for (let i = 1; i <= maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, intervalMs));
    process.stdout.write(".");
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    });
    if (!res.ok) continue;
    const data = await res.json();
    const status = (data.status || "").toLowerCase();
    if (["completed", "succeeded", "success"].includes(status)) return data;
    if (["failed", "error"].includes(status))
      throw new Error(`Generation failed: ${data.error || "unknown"}`);
  }
  throw new Error("Timed out waiting for video.");
}

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

function findFfmpeg() {
  // Common winget install paths
  const wingetPaths = [
    "C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe",
    `${process.env.LOCALAPPDATA}\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe`,
  ];
  for (const p of wingetPaths) {
    if (existsSync(p)) return p;
  }

  // Try PATH
  const result = spawnSync("where", ["ffmpeg"], { encoding: "utf8" });
  if (result.status === 0) return result.stdout.trim().split("\n")[0].trim();

  return null;
}

// ── main ─────────────────────────────────────────────────────────────────────

if (!API_KEY) {
  console.error(
    "\nError: no API key provided.\n" +
      "Run: node scripts/generate-sequence.mjs <YOUR_MUAPI_API_KEY>\n" +
      "Your key is in the open-generative-ai studio (browser localStorage → muapi_api_key).\n"
  );
  process.exit(1);
}

log("Checking FFmpeg...");
const ffmpeg = findFfmpeg();
if (!ffmpeg) {
  console.error(
    "\nFFmpeg not found. It was installed via winget but may not be on PATH yet.\n" +
      "Try: restart your terminal, then re-run this script.\n" +
      "Or set the path manually in this script (findFfmpeg function).\n"
  );
  process.exit(1);
}
log(`FFmpeg found: ${ffmpeg}`);

log("Submitting video generation to muapi.ai (seedance-pro-t2v)...");
const submit = await apiFetch("/api/v1/seedance-pro-t2v", {
  prompt: PROMPT,
  aspect_ratio: "16:9",
  duration: 5,
  resolution: "720p",
});

const requestId = submit.request_id || submit.id;
if (!requestId) throw new Error("No request_id in response: " + JSON.stringify(submit));
log(`Job submitted. ID: ${requestId} — polling (this takes 2–4 minutes)`);

const result = await poll(requestId);
const videoUrl = result.outputs?.[0] || result.url || result.output?.url;
if (!videoUrl) throw new Error("No video URL in result: " + JSON.stringify(result));
log(`\nVideo ready: ${videoUrl}`);

log("Downloading video...");
await downloadFile(videoUrl, TMP_VIDEO);
log(`Saved to ${TMP_VIDEO}`);

log("Ensuring output directory exists...");
mkdirSync(SEQUENCE_DIR, { recursive: true });

log("Extracting 150 frames at 30fps with FFmpeg...");
execSync(
  `"${ffmpeg}" -y -i "${TMP_VIDEO}" -vf "fps=30,scale=1920:-2" -q:v 3 -frames:v 150 "${SEQUENCE_DIR}/%04d.jpg"`,
  { stdio: "inherit" }
);

log("Done! Frames saved to public/assets/sequence/0001.jpg … 0150.jpg");
log("You can now run: npm run dev — and scroll through the cinematic section.");
