import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { lokasi_id, nama_titik_lokasi } = await req.json();

    const newTitikLokasi = await prisma.titik_lokasi.create({
      data: {
        lokasi_id: parseInt(lokasi_id),
        nama_titik_lokasi,
      },
    });

    return NextResponse.json(newTitikLokasi, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Gagal menyimpan data", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const lokasi = await prisma.lokasi.findMany({
      select: { lokasi_id: true, nama_lokasi: true },
    });

    return NextResponse.json(lokasi, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Gagal mengambil data", error: error },
      { status: 500 }
    );
  }
}
