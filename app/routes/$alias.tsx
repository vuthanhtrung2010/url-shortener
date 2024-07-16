import { redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getURL } from "~/data";
import type { LoaderFunctionArgs } from "@remix-run/node";
import chalk from "chalk";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.alias, "Missing contactId param");
  console.log(chalk.blue(`Requesting redirect for alias: ${params.alias}`));
  const link = await getURL(params.alias);
  if (!link) {
    return redirect("/");
  }
  console.log(
    chalk.green(`Found ${link} with alias ${params.alias}! Redirecting user.`)
  );
  return redirect(link);
};

export default function page() {
  return null;
}
