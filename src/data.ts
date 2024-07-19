import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

export const prisma = new PrismaClient();

export async function getURL(alias: string): Promise<string | null> {
  const result = await prisma.links.findFirst({
    where: {
      aliases: {
        has: alias,
      },
    },
  });

  if (!result) {
    console.log(chalk.red(`No record found for alias: ${alias}`));
    return null;
  }

  // Update the counter.
  await prisma.links.update({
    where: {
      id: result.id,
    },
    data: {
      hits: {
        increment: 1,
      },
    },
  });

  return result.link;
}

export async function create_redirect(url: string, aliases: string[]) {
  try {
    console.log(
      chalk.blue(
        `Requested creating ${url} with aliases ${aliases.join(", ")}.`
      )
    );

    // Check if any of the aliases already exist
    const existingLinks = await prisma.links.findMany({
      where: {
        OR: aliases.map((alias) => ({
          aliases: {
            has: alias,
          },
        })),
      },
    });

    // Check if the URL already exists
    const existingURL = await prisma.links.findUnique({
      where: {
        link: url,
      },
    });

    // If any aliases or the URL already exist, handle the conflict
    if (existingLinks.length > 0 || existingURL) {
      console.log(
        chalk.red(
          "Some link/aliases already exist:",
          existingLinks,
          existingURL
        )
      );
      throw new Error("Some link/aliases already exist.");
    }

    // Proceed with creating the new redirect if no aliases exist
    const newLink = await prisma.links.create({
      data: {
        link: url,
        aliases: aliases,
        hits: 0,
      },
    });
    console.log(
      chalk.green(`Created: ${url} with aliases ${aliases.join(", ")}.`)
    );
    return newLink;
  } catch (error) {
    console.error("Error creating redirect:", error);
    throw new Error("Failed to create redirect.");
  }
}

export async function update_redirect(url: string, aliases: string[]) {
  try {
    console.log(
      chalk.blue(
        `Requested updating ${url} with aliases ${aliases.join(", ")}.`
      )
    );

    // Check if the URL already exists
    const existingURL = await prisma.links.findUnique({
      where: {
        link: url,
      },
    });

    if (!existingURL) {
      console.log(
        chalk.red(`Cannot find existing URL from ${url}, logs:\n`, existingURL)
      );
      throw new Error("Cannot find existing URL from ${url}.");
    }

    // Update the url with aliases
    const newLink = await prisma.links.update({
      where: {
        link: url,
      },
      data: {
        aliases: aliases,
      },
    });

    console.log(
      chalk.green(`Updated: ${url} with aliases ${aliases.join(", ")}.`)
    );
    return newLink;
  } catch (error) {
    console.error("Error updating redirect:", error);
    throw new Error("Failed to update redirect.");
  }
}

export async function delete_redirect(aliases: string[]) {
  try {
    console.log(
      chalk.blue(
        `Requested deleting all URLs with aliases: ${aliases.join(", ")}.`
      )
    );

    // Check if the URL already exists
    const existingLinks = await prisma.links.findMany({
      where: {
        OR: aliases.map((alias) => ({
          aliases: {
            has: alias,
          },
        })),
      },
    });

    // If any aliases or the URL already exist, handle the conflict
    if (!existingLinks) {
      console.log(
        chalk.red(
          `Cannot find existing URLs from ${aliases.join(", ")}, logs:\n`,
          existingLinks
        )
      );
      throw new Error(`Cannot find existing URL from ${aliases.join(", ")}.`);
    }

    let count = 0;
    // Update the url with aliases
    aliases.forEach(async (alias) => {
      const result = await prisma.links.deleteMany({
        where: {
          aliases: {
            has: alias,
          },
        },
      });

      count += result.count;
    });

    console.log(
      chalk.green(`Deleted ${count} URLs with aliases: ${aliases.join(", ")}.`)
    );
    return "Success";
  } catch (error) {
    console.error("Error deleting redirect:", error);
    throw new Error("Failed to delete redirect.");
  }
}

export async function getData(alias: string) {
  const link = await prisma.links.findFirst({
    where: {
      aliases: {
        has: alias,
      },
    },
  });
  if (!link) {
    return null;
  }

  return link;
}
