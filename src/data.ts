import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import * as Sentry from "@sentry/nextjs";

export const prisma = new PrismaClient();

export async function getURL(alias: string): Promise<string | null> {
  const result = await prisma.links.findUnique({
    where: {
      alias: alias
    }
  })

  if (!result) {
    console.log(chalk.red(`No record found for alias: ${alias}`));
    return null;
  }

  // Update the counter.
  await prisma.links.update({
    where: {
      alias: alias,
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
    let existingLinks = 0;

    aliases.forEach(async (alias: string) => {
      const data = await prisma.links.findUnique({
        where: {
          alias: alias
        }
      })

      if (data) existingLinks++;
    })

    // If any aliases exists, handle the conflict
    if (existingLinks > 0) {
      console.log(
        chalk.red(
          "Some aliases already exist:",
          existingLinks,
        )
      );
      throw new Error("Some aliases already exist.");
    }

    // Proceed with creating the new redirect if no aliases exist
    aliases.forEach(async (alias: string) => {
      try {
        await prisma.links.create({
          data: {
            link: url,
            alias: alias,
            hits: 0
          }
        })
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
    })
    console.log(
      chalk.green(`Created: ${url} with aliases ${aliases.join(", ")}.`)
    );
    return;
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

    // Check if the alias already exists
    let exisitingAliases = 0;

    aliases.forEach(async (alias: string) => {
      const data = await prisma.links.findUnique({
        where: {
          alias: alias
        }
      })

      if (data) exisitingAliases++;
    })

    if (!exisitingAliases) {
      console.log(
        chalk.red(`Cannot find existing aliases from ${aliases.join(", ")}`)
      );
      throw new Error("Cannot find existing aliases.");
    }

    aliases.forEach(async (alias: string) => {
      await prisma.links.update({
        where: {
          alias: alias
        },
        data: {
          link: url
        }
      })
    })

    console.log(
      chalk.green(`Updated: ${aliases.join(", ")} with URL ${url}.`)
    );
    return;
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

    // Check if the URLs already exist
    let existingLinks = 0;

    for (const alias of aliases) {
      const data = await prisma.links.findUnique({
        where: {
          alias: alias
        }
      });

      if (data) {
        existingLinks++;
      }
    }

    // If no aliases matched
    if (!existingLinks) {
      console.log(
        chalk.red(
          `Cannot find existing URLs from ${aliases.join(", ")}, logs:\n`,
          existingLinks
        )
      );
      console.log(existingLinks)
      throw new Error(`Cannot find existing URL from ${aliases.join(", ")}.`);
    }

    let count = 0;
    // Update the url with aliases
    for (const alias of aliases) {
      const result = await prisma.links.delete({
        where: {
          alias: alias
        }
      })

      if (result) count += 1;
    }

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
  const link = await prisma.links.findUnique({
    where: {
      alias: alias
    },
  });

  if (!link) {
    return null;
  }

  return link;
}
