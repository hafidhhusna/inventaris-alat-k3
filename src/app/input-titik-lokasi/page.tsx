import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TitikLokasiForm from "./InputTitikLokasiPage";

export default async function InputTitikLokasiPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <TitikLokasiForm session={session} />;
}
