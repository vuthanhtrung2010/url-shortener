import { NextResponse } from "next/server";
import { updateRedirect } from "../../../data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const alias = formData.get("alias") as string;
  const url = formData.get("url") as string;

  if (!process.env.password) {
    return NextResponse.json(
      {
        success: false,
        message: "No password provided in environment variables.",
      },
      { status: 401 },
    );
  }

  if (password !== process.env.password) {
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  }

  const mapped_alias: string[] = alias
    .split(" ")
    .map((a) => a.trim())
    .filter((a) => a);

  try {
    await updateRedirect(url, mapped_alias);
    return NextResponse.json({
      success: true,
      message: "Redirect updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 },
    );
  }
}
