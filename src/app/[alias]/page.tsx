import { redirect } from "next/navigation";
import { getURL } from "@/data";
import chalk from "chalk";

export const dynamic = "force-dynamic";

interface RedirectError extends Error {
  digest?: string;
}

interface PageProps {
  params: Promise<{
    alias: string;
  }>;
}

export default async function AliasPage({ params }: Readonly<PageProps>) {
  const { alias } = await params;

  console.log(`Requesting redirect for alias: ${alias}`);

  try {
    const link = await getURL(alias);

    if (!link) {
      console.log(`No link found for alias: ${alias}`);
      redirect("/");
    }

    console.log(
      chalk.green(`Found ${link} with alias ${alias}! Redirecting user.`),
    );
    redirect(link);
  } catch (error) {
    if ((error as RedirectError).digest?.startsWith("NEXT_REDIRECT")) {
      // This is an intentional redirect, so we throw it to let Next.js handle it
      throw error;
    }
    console.error("Error processing redirect:", error);
    redirect("/");
  }
}
