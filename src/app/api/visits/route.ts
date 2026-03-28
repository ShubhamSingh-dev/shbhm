import { redis } from "@/lib/redis";
import { headers } from "next/headers";

export async function GET() {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown";

  const key = `visit:${ip}`;

  const isNew = await redis.set(key, "1", {
    nx: true,
    ex: 60 * 60 * 24,
  });

  if (isNew) {
    await redis.incr("visits");
  }

  const count = (await redis.get<number>("visits")) || 0;

  return Response.json({ count });
}
