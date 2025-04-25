import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    const deleted = await prisma.titik_lokasi.delete({
      where: { id_titik_lokasi: id },
    });

    return NextResponse.json({ message: "Titik lokasi berhasil dihapus", data: deleted });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus titik lokasi", detail: (error as Error).message },
      { status: 500 }
    );
  }
}
