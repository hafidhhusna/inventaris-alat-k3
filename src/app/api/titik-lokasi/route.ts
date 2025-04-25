import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Ambil parameter lokasi_id dari query string
    const { searchParams } = new URL(req.url);
    const lokasi_id = searchParams.get("lokasi_id");

    if (lokasi_id) {
      // Jika lokasi_id diberikan, ambil titik_lokasi berdasarkan lokasi_id
      const titikLokasi = await prisma.titik_lokasi.findMany({
        where: { lokasi_id: Number(lokasi_id) },
        select: {
          id_titik_lokasi: true,
          nama_titik_lokasi: true,
        },
      });

      return NextResponse.json({ tipe: "titik_lokasi", data: titikLokasi }, { status: 200 });
    } else {
      // Jika tidak ada lokasi_id, ambil daftar lokasi
      const lokasiList = await prisma.lokasi.findMany({
        select: {
          lokasi_id: true,
          nama_lokasi: true,
        },
      });

      return NextResponse.json({ tipe: "lokasi", data: lokasiList }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req : NextRequest){
  try{
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    if(!id){
      return NextResponse.json({error : "ID Tidak Ditemukan"}, {status:400});
    }

    const deletedLokasi = await prisma.titik_lokasi.delete({
      where:{
        id_titik_lokasi : Number(id),
      }
    });

    return NextResponse.json(deletedLokasi, {status:200});
  } catch(error){
    return NextResponse.json({error : "Gagal Menghapus Lokasi"}, {status:500})
  }
}
