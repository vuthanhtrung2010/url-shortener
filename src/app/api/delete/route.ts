import { NextResponse } from "next/server";
import { deleteRedirect } from "@/data";
import { compareSync } from "bcrypt";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const alias = formData.get("alias") as string;

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
    await deleteRedirect(mapped_alias);
    return NextResponse.json({
      success: true,
      message: "Redirect deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 },
    );
  }
}
