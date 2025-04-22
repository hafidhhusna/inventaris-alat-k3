import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsPage from "./SettingsPage";

export default async function Settings() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <SettingsPage session={session} />;
}
