import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

/**
 * Sliding-window rate limiter: 3 submissions per IP per hour.
 * Lazy singleton — fails loudly at first call if env vars are missing.
 */
export function getContactRateLimiter(): Ratelimit {
  if (limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url) throw new Error("Missing env var: UPSTASH_REDIS_REST_URL");
  if (!token) throw new Error("Missing env var: UPSTASH_REDIS_REST_TOKEN");

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "ratelimit:contact",
  });

  return limiter;
}
