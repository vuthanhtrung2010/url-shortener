import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import * as Sentry from "@sentry/nextjs";
import { isURL } from "validator";

export const prisma = new PrismaClient();

// Helper function to find a unique link
async function findUniqueLink(alias: string) {
  return await prisma.links.findUnique({
    where: {
      alias,
    },
  });
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

    return result.link;
  } catch (error) {
    console.error("Error getting URL:", error);
    throw new Error("Failed to get URL.");
  }
}

export async function createRedirect(url: string, aliases: string[]) {
  try {
    console.log(chalk.blue(`Requested creating ${url} with aliases ${aliases.join(", ")}.`));

    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (data) {
        console.log(chalk.red("Some aliases already exist."));
        throw new Error("Some aliases already exist.");
      }
    }

    if (!isURL(url)) {
      console.log(chalk.red("Invalid URL."));
      throw new Error("Invalid URL.");
    }

    for (const alias of aliases) {
      try {
        await prisma.links.create({
          data: { link: url, alias, hits: 0 },
        });
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
    }

    console.log(chalk.green(`Created: ${url} with aliases ${aliases.join(", ")}.`));
  } catch (error) {
    console.error("Error creating redirect:", error);
    throw new Error("Failed to create redirect.");
  }
}

export async function updateRedirect(url: string, aliases: string[]) {
  try {
    console.log(chalk.blue(`Requested updating ${url} with aliases ${aliases.join(", ")}.`));

    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (!data) {
        console.log(chalk.red(`Cannot find existing aliases from ${aliases.join(", ")}`));
        throw new Error("Cannot find existing aliases.");
      }
    }

    if (!isURL(url)) {
      console.log(chalk.red("Invalid URL."));
      throw new Error("Invalid URL.");
    }

    for (const alias of aliases) {
      try {
        await prisma.links.update({
          where: { alias },
          data: { link: url },
        });
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
    console.log(chalk.blue(`Requested deleting all URLs with aliases: ${aliases.join(", ")}.`));

    let count = 0;
    for (const alias of aliases) {
      const data = await findUniqueLink(alias);
      if (!data) continue;

      await prisma.links.delete({ where: { alias } });
      count++;
    }

    if (count === 0) {
      console.log(chalk.red(`Cannot find existing URLs from ${aliases.join(", ")}.`));
      throw new Error(`Cannot find existing URL from ${aliases.join(", ")}.`);
    }

    console.log(chalk.green(`Deleted ${count} URLs with aliases: ${aliases.join(", ")}.`));
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