import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import InspectionDetais from "./InspectionDetailsPage";

export default async function InspectionDetailsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <InspectionDetais session={session} />;
}
