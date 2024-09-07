import { NextResponse } from "next/server";
import { createRedirect, GenerateRandomAlias } from "@/data";
import { compareSync } from "bcrypt";
import { DATA } from "@/config";

export async function POST(request: Request) {
  const formData = await request.formData();

  const password = formData.get("password") as string;
  let alias = formData.get("alias") as string;
  const url = formData.get("url") as string;
  let baseURL = formData.get("baseURL") as string;

  if (!alias) {
    alias = (await GenerateRandomAlias()) as unknown as string;
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

  const checkPassword = compareSync(
    password,
    Buffer.from(process.env.PASSWORD_HASH, "base64").toString("utf-8"),
  );
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
    const success = await createRedirect(url, mapped_alias);

    if (success != 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            success === 1
              ? "Alias already exists."
              : "Failed to create redirect.",
        },
        { status: 500 },
      );
    }

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
