import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LokasiForm from "./InputLokasiPage";

export default async function Tracker() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <LokasiForm session={session} />;
}
