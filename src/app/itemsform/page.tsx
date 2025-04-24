import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ItemsForm from "./ItemsFormPage";

export default async function InspectionForm() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <ItemsForm session={session} />;
}
