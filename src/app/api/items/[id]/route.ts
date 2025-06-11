import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const {
    nama_lokasi,
    titik_lokasi,
    ...validData
  } = body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id_item : id },
      data: validData,
    });

    return NextResponse.json({ message: "Item Updated", data: updatedItem }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.item.delete({
      where: { id_item: id },
    });

    return NextResponse.json({ message: "Item Berhasil Dihapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
