import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadForm from "./UploadPage";


export default async function uploadPage(){
    const session = await getAuthSession();

    if(!session){
        redirect("/login");
    }

    return <UploadForm session={session}/>
}