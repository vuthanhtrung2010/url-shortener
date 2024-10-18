import { headers } from "next/headers";
import DashboardClient from "./DashboardClient";

export default function DashboardServer() {
  const csrfToken = headers().get("X-CSRF-Token") ?? "missing";

  return <DashboardClient csrfToken={csrfToken} />;
}
