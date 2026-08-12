import type { H3Event } from "h3";

const DEFAULT_ALLOWED_ORIGINS = ["https://localhost", "http://localhost"];

export const applyApiCors = (event: H3Event) => {
  const configuredOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...configuredOrigins,
  ]);
  const origin = getHeader(event, "origin");

  if (origin && allowedOrigins.has(origin)) {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    });
  }
};
