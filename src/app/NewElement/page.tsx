import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewElement from "./NewElementPage";

export default async function InputElement() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <NewElement session={session} />;
}
