import { NextResponse } from "next/server";
import { createRedirect, GenenerateRandomAlias } from "../../../data";
import { compareSync } from "bcrypt";
import { DATA } from "@/config";

export async function POST(request: Request) {
  const formData = await request.formData();

  const password = formData.get("password") as string;
  let alias = formData.get("alias") as string;
  const url = formData.get("url") as string;
  let baseURL = formData.get("baseURL") as string;

  if (!alias) {
    alias = await GenenerateRandomAlias() as unknown as string;
  }

  if (!baseURL) {
    baseURL = DATA.baseURL || "https://links.devtrung.tech";
  }

  if (!process.env.PASSWORD_HASH) {
    return NextResponse.json(
      {
        success: false,
        message: "No password provided in environment variables.",
      },
      { status: 401 },
    );
  }

  const checkPassword = compareSync(password, process.env.PASSWORD_HASH);
  if (!checkPassword) {
    return NextResponse.json(
      { success: false, message: "Invalid password." },
      { status: 401 },
    );
  }

  const mapped_alias: string[] = alias
    .split(" ")
    .map((a) => a.trim())
    .filter((a) => a);

  try {
    await createRedirect(url, mapped_alias);
    const newURL = new URL(alias, baseURL).href;

    return NextResponse.json({
      success: true,
      message: `Redirect created successfully.\n${newURL}`,
      url: `${newURL}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 },
    );
  }
}
