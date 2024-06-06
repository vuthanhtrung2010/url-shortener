// app/routes/api/create.tsx
import { json, ActionFunction } from "@remix-run/node";
import { delete_redirect } from "~/data";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  
  // Safe type casting
  const password = formData.get("password") as string;
  const alias = formData.get("alias") as string;

  if (password !== process.env.password) {
    return json({ success: false, message: "Invalid password" }, { status: 401 });
  }

  // Split the alias string by spaces and map it to an array
  const mapped_alias: string[] = alias.split(" ").map(a => a.trim()).filter(a => a);

  try {
    await delete_redirect(mapped_alias);
    return json({ success: true, message: "Redirect updated successfully" });
  } catch (error) {
    return json({ success: false, message: (error as Error).message }, { status: 500 });
  }
};

export default function DeleteRedirect() {
  return <div>POST to this route to delete redirect(s).</div>;
}
