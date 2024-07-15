import { json, ActionFunction } from "@remix-run/node";
import { create_redirect } from "~/data";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const password = formData.get("password") as string;
  const alias = formData.get("alias") as string;
  const url = formData.get("url") as string;

  if (password !== process.env.password) {
    return json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  const mapped_alias: string[] = alias
    .split(" ")
    .map((a) => a.trim())
    .filter((a) => a);

  try {
    await create_redirect(url, mapped_alias);
    return json({ success: true, message: "Redirect created successfully" });
  } catch (error) {
    return json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
};

export default function CreateRedirect() {
  return <div>POST to this route to create a redirect.</div>;
}
