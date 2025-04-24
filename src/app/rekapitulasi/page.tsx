import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import RekapitulasiPage from "./RekapitulasiPage";

export default async function Rekapitulasi() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <RekapitulasiPage session={session} />;
}
