import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Ambil parameter lokasi_id dari query string
    const { searchParams } = new URL(req.url);
    const lokasi_id = searchParams.get("lokasi_id");

    // if (lokasi_id) {
    //   // Jika lokasi_id diberikan, ambil titik_lokasi berdasarkan lokasi_id
    //   const titikLokasi = await prisma.titik_lokasi.findMany({
    //     where: { lokasi_id: Number(lokasi_id) },
    //     select: {
    //       id_titik_lokasi: true,
    //       nama_titik_lokasi: true,
    //     },
    //   });

    //   return NextResponse.json({ tipe: "titik_lokasi", data: titikLokasi }, { status: 200 });
    // } else {
      // Jika tidak ada lokasi_id, ambil daftar lokasi
      const lokasiList = await prisma.lokasi.findMany({
        select: {
          lokasi_id: true,
          nama_lokasi: true,
        },
      });

      return NextResponse.json({ tipe: "lokasi", data: lokasiList }, { status: 200 });
    // }
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server", details: (error as Error).message },
      { status: 500 }
    );
  }
}
