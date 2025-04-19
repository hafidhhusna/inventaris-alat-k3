import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: {
        nama_lokasi : {select : {nama_lokasi: true}},
      },
      where : {is_deleted : false},
      orderBy: { id_item: "asc" },
    });

    console.log(items)

    // const result = items.map((item) => ({
    //   id_item : item.id_item,
    //   nama_item

    // }))

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
