import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TrackerPage from "./TrackerPage";

export default async function Tracker() {
  const session = await getAuthSession();
  console.log(session)

  if (!session) {
    redirect("/login");
  }

  return <TrackerPage session={session} />;
}
