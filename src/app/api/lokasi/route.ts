import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
