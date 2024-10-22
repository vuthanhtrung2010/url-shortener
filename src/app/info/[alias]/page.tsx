import { redirect } from "next/navigation";
import chalk from "chalk";
import moment from "moment";
import { getData } from "@/data";

interface Props {
  params: Promise<{
    alias: string;
  }>;
}

export default async function InfoPage({ params }: Readonly<Props>) {
  const { alias } = await params;

  console.log(chalk.blue(`Requesting data for alias: ${alias}`));
  const link = await getData(alias);

  if (!link) {
    console.log(
      chalk.red(
        `Not found any data contains alias: ${alias}. Redirecting user to '/' route`,
      ),
    );
    redirect("/");
  }

  console.log(chalk.green(`Found ${link} with alias ${alias}!`));

  const href = `/${link.alias}`;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 text-white text-center rounded-lg shadow-lg">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Redirect Information</h1>
        </header>
        <p className="mb-2">
          <span className="font-semibold">Path</span>:
          <a className="text-blue-500 hover:text-blue-600" href={href}>
            {" "}
            /{link.alias}
          </a>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Redirect</span>:
          <a className="text-blue-500 hover:text-blue-600" href={link.link}>
            {" "}
            {link.link}
          </a>
        </p>
        <p className="mb-2">
          <span className="font-semibold">Created</span>:{" "}
          {moment(link.createdAt).format("Do MMMM YYYY, h:mma")}
        </p>
        <p>
          <span className="font-semibold">Hits</span>: {link.hits}
        </p>
      </div>
    </div>
  );
}
