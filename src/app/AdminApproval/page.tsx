import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminApproval from "./AdminApproval";

export default async function Tracker() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <AdminApproval session={session} />;
}
