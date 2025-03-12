import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Ambil parameter lokasi_id dari query string
    const { searchParams } = new URL(req.url);
    const lokasi_id = searchParams.get("lokasi_id");

    if (!lokasi_id) {
      return NextResponse.json(
        { error: "Parameter lokasi_id diperlukan" },
        { status: 400 }
      );
    }

    // Query ke database dengan Prisma
    const titikLokasi = await prisma.titik_lokasi.findMany({
      where: {
        lokasi_id: Number(lokasi_id),
      },
      select: {
        id_titik_lokasi: true,
        nama_titik_lokasi: true,
      },
    });

    return NextResponse.json(titikLokasi, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server", details: (error as Error).message },
      { status: 500 }
    );
  }
}
