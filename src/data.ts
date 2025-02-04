import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";
import chalk from "chalk";
import * as Sentry from "@sentry/nextjs";
import { isURL } from "validator";
import { randomBytes } from "node:crypto";

const prisma = new PrismaClient();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper function to find a unique link using Redis as a cache
async function findUniqueLink(alias: string) {
  const cacheKey = `alias:${alias}`;
  const cachedData = await redis.get(cacheKey);

  if (typeof cachedData === "string") {
    return JSON.parse(cachedData);
  }

  const result = await prisma.links.findUnique({ where: { alias } });
  if (result) {
    await redis.set(cacheKey, JSON.stringify(result), { ex: 3600 });
  }

  return result;
}

export async function getURL(alias: string): Promise<string | null> {
  try {
    const result = await findUniqueLink(alias);
    if (!result) {
      console.log(chalk.red(`No record found for alias: ${alias}`));
      return null;
    }
    await prisma.links.update({
      where: { alias },
      data: { hits: { increment: 1 } },
    });
    const updated = await prisma.links.findUnique({ where: { alias } });
    if (updated) {
      await redis.set(`alias:${alias}`, JSON.stringify(updated), { ex: 3600 });
    }
    return result.link;
  } catch (error) {
    console.error("Error getting URL:", error);
    throw new Error("Failed to get URL.");
  }
}

export async function createRedirect(
  url: string,
  aliases: string[],
): Promise<number> {
  try {
    console.log(
      chalk.blue(
        `Requested creating ${url} with aliases ${aliases.join(", ")}.`,
      ),
    );
    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (data) {
        console.log(chalk.red("Some aliases already exist."));
        return 1;
      }
    }
    if (!isURL(url)) {
      console.log(chalk.red("Invalid URL."), url);
      return 2;
    }
    for (const alias of aliases) {
      try {
        const data = await prisma.links.create({
          data: { link: url, alias, hits: 0 },
        });
        await redis.set(`alias:${alias}`, JSON.stringify(data), { ex: 3600 });
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
    }
    console.log(
      chalk.green(`Created: ${url} with aliases ${aliases.join(", ")}.`),
    );
    return 0;
  } catch (error) {
    console.error("Error creating redirect:", error);
    throw new Error("Failed to create redirect.");
  }
}

export async function updateRedirect(url: string, aliases: string[]) {
  try {
    console.log(
      chalk.blue(
        `Requested updating ${url} with aliases ${aliases.join(", ")}.`,
      ),
    );
    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (!data) {
        console.log(
          chalk.red(`Cannot find existing aliases from ${aliases.join(", ")}`),
        );
        return;
      }
    }
    if (!isURL(url)) {
      console.log(chalk.red("Invalid URL."));
      return;
    }
    for (const alias of aliases) {
      try {
        const data = await prisma.links.update({
          where: { alias },
          data: { link: url },
        });
        await redis.set(`alias:${alias}`, JSON.stringify(data), { ex: 3600 });
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
    }
    console.log(chalk.green(`Updated: ${aliases.join(", ")} with URL ${url}.`));
  } catch (error) {
    console.error("Error updating redirect:", error);
    throw new Error("Failed to update redirect.");
  }
}

export async function deleteRedirect(aliases: string[]) {
  try {
    console.log(
      chalk.blue(
        `Requested deleting all URLs with aliases: ${aliases.join(", ")}.`,
      ),
    );
    let count = 0;
    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (!data) continue;
      await prisma.links.delete({ where: { alias } });
      await redis.del(`alias:${alias}`);
      count++;
    }
    if (count === 0) {
      console.log(
        chalk.red(`Cannot find existing URLs from ${aliases.join(", ")}.`),
      );
      return;
    }
    console.log(
      chalk.green(`Deleted ${count} URLs with aliases: ${aliases.join(", ")}.`),
    );
  } catch (error) {
    console.error("Error deleting redirect:", error);
    throw new Error("Failed to delete redirect.");
  }
}

export async function getData(alias: string) {
  try {
    return await findUniqueLink(alias);
  } catch (error) {
    console.error("Error getting data:", error);
    throw new Error("Failed to get data.");
  }
}

export async function GenerateRandomAlias(): Promise<string> {
  const buf = randomBytes(4).toString("hex");
  const randomAlias: string = buf.substring(0, 8);
  const data = await findUniqueLink(randomAlias);
  if (data) {
    return GenerateRandomAlias();
  }
  return randomAlias;
}

export { prisma };
