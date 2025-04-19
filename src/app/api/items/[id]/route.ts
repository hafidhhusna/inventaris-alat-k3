import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function PUT(req : NextRequest, {params}:{params : {id : string}}){
    const id = params.id;
    const body = await req.json();

    const {data, error} = await supabase
        .from("item")
        .update(body)
        .eq("id_item", id)
        .select()
        .single();
    
    if(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message : "Item Updated", data}, {status: 200});
}

export async function DELETE(req : NextRequest, {params}: {params : {id:string}}){
    const id = params.id;

    const {error} = await supabase
        .from("item")
        .delete()
        .eq("id_item", id);

    if(error){
        return NextResponse.json({error : error.message} , {status: 500});
    }

    return NextResponse.json({message : "Item Berhasil Dihapus"}, {status: 200});
}