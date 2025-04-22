import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Readiness from "./ReadinessPage";

export default async function ReadinessPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <Readiness session={session} />;
}
