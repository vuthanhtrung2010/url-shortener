import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, MetaFunction } from "@remix-run/react";
import chalk from "chalk";
import moment from "moment";
import invariant from "tiny-invariant";
import { getData } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Info for links" },
    { name: "description", content: "Welcome to my URL Shortener" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.alias, "Missing contactId param");
  if (!params.alias) {
    return redirect("/");
  }

  console.log(chalk.blue(`Requesting data for alias: ${params.alias}`));
  const link = await getData(params.alias);
  if (!link) {
    console.log(
      chalk.red(
        `Not found any data contains alias: ${params.alias}. Redirecting user to \`/\` route`
      )
    );
    return redirect("/");
  }
  console.log(chalk.green(`Found ${link} with alias ${params.alias}!`));
  return json(link);
};

export default function InfoPage() {
  const URL_data = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen flex flex-col bg-backgroundColor">
      <div className="p-8 m-auto bg-zinc-900 text-white">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Redirect Information</h1>
        </header>

        <p>
          <span className="font-semibold">Path</span>:{" "}
          <Link
            className="text-blue-500 hover:text-blue-600"
            to={URL_data.aliases[0]}
          >
            /{URL_data.aliases[0]}
          </Link>
        </p>
        <p>
          <span className="font-semibold">Redirect</span>:{" "}
          <Link
            className="text-blue-500 hover:text-blue-600"
            to={URL_data.link}
          >
            {URL_data.link}
          </Link>
        </p>
        <p>
          <span className="font-semibold">Created</span>:{" "}
          {moment(URL_data.createdAt).format("Do MMMM YYYY, h:mma")}
        </p>
        <p>
          <span className="font-semibold">Hits</span>: {URL_data.hits}
        </p>
      </div>
    </div>
  );
}
