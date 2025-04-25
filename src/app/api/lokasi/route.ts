import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nama_lokasi } = await req.json();

    const newLokasi = await prisma.lokasi.create({
      data: { nama_lokasi },
    });

    return NextResponse.json(newLokasi, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan lokasi" }, { status: 500 });
  }
}

export async function DELETE(req : NextRequest){
  try{
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    if(!id){
      return NextResponse.json({error : "ID Tidak Ditemukan"}, {status:400});
    }

    const deletedLokasi = await prisma.lokasi.delete({
      where:{
        lokasi_id : Number(id),
      }
    });

    return NextResponse.json(deletedLokasi, {status:200});
  } catch(error){
    console.error("DELETE error : ", error)
    return NextResponse.json({error : "Gagal Menghapus Lokasi"}, {status:500})
  }
}
